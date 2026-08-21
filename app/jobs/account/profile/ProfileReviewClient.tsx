"use client";

import { useMemo, useState, useTransition } from "react";

import type {
  CandidateProfileReviewFieldView,
  CandidateProfileReviewSectionId,
  CandidateProfileReviewSectionView,
  CandidateProfileReviewState,
} from "@/lib/jobs/profileReview/viewTypes";

interface ProfileReviewClientProps {
  initialState: CandidateProfileReviewState;
}

type ReviewAction =
  | { action: "accept"; proposalId: string }
  | { action: "edit"; proposalId: string; editedValue: string; confirmAfterEdit?: boolean }
  | { action: "reject"; proposalId: string; reason?: string }
  | { action: "confirm_section"; sectionId: CandidateProfileReviewSectionId }
  | { action: "confirm_profile" }
  | { action: "save_progress" };

export default function ProfileReviewClient({ initialState }: ProfileReviewClientProps) {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "requesting" | "uploading" | "verifying" | "success">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editingProposalId, setEditingProposalId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const reviewRemaining = Math.max(0, state.progress.totalCount - state.progress.reviewedCount);

  const statusTone = useMemo(() => {
    if (state.status === "confirmed") return "border-emerald-200 bg-emerald-50 text-emerald-700";
    if (state.status === "recovery") return "border-amber-200 bg-amber-50 text-amber-700";
    return "border-blue-100 bg-[#eef6ff] text-[#1677f2]";
  }, [state.status]);

  function runAction(action: ReviewAction, successMessage: string) {
    setError("");
    setSuccess("");
    startTransition(async () => {
      try {
        const response = await fetch("/api/jobs/profile-review", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(action),
        });
        const payload = await response.json();

        if (!response.ok || !payload.ok) {
          throw new Error(payload.error || "We could not save your update.");
        }

        setState(payload.state);
        setEditingProposalId(null);
        setEditValue("");
        setSuccess(successMessage);
      } catch (actionError) {
        setError(actionError instanceof Error ? actionError.message : "We could not save your update.");
      }
    });
  }

  function startEditing(field: CandidateProfileReviewFieldView) {
    setEditingProposalId(field.proposalId);
    setEditValue(field.editableValue === "Not provided" ? "" : field.editableValue);
    setError("");
    setSuccess("");
  }

  return (
    <main className="min-h-screen bg-[#f8fbff] px-4 py-10 text-[#0a1628] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full bg-[#eaf2ff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#1677f2]">
              Estabizz Jobs
            </div>
            <h1 className="text-[34px] font-black leading-tight tracking-tight text-[#120b45] md:text-[46px]">
              {state.heading}
            </h1>
            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#64748b] md:text-[17px]">
              {state.message}
            </p>
          </div>

          <div className={`rounded-lg border px-4 py-3 text-sm font-bold ${statusTone}`}>
            {state.status === "confirmed" ? "Confirmed" : reviewRemaining > 0 ? `${reviewRemaining} items need review` : "Ready"}
          </div>
        </div>

        <section className="mb-8 rounded-lg border border-blue-100 bg-white p-5 shadow-[0_8px_30px_rgba(0,80,140,0.06)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-black text-[#120b45]">Review progress</h2>
              <p className="mt-1 text-sm text-[#64748b]">
                {state.progress.reviewedCount} of {state.progress.totalCount} suggestions reviewed
              </p>
            </div>
            <div className="w-full md:max-w-sm">
              <div className="h-3 overflow-hidden rounded-full bg-[#e5eef8]">
                <div
                  className="h-full rounded-full bg-[#1677f2] transition-all"
                  style={{ width: `${state.progress.percentage}%` }}
                />
              </div>
              <p className="mt-2 text-right text-xs font-black uppercase tracking-[0.16em] text-[#1677f2]">
                {state.progress.percentage}% complete
              </p>
            </div>
          </div>
        </section>

        <ResumeUploadPanel
          state={state}
          uploadStatus={uploadStatus}
          uploadProgress={uploadProgress}
          onError={setError}
          onUpload={async (file) => {
            setError("");
            setSuccess("");
            setUploadProgress(0);
            try {
              setUploadStatus("requesting");
              const uploadIntent = await requestResumeUploadIntent(file);
              setUploadStatus("uploading");
              await uploadToPrivateStorage(file, uploadIntent, setUploadProgress);
              setUploadStatus("verifying");
              const confirmed = await confirmResumeUpload(uploadIntent.uploadRef);

              setState((current) => ({
                ...current,
                status: "processing",
                heading: "Resume uploaded",
                message: "Your resume is stored privately. Profile preparation will start in a later approved step.",
                showUploadCta: false,
                showRetryCta: false,
                resume: {
                  hasResume: true,
                  fileName: confirmed.fileName,
                  fileType: confirmed.fileType,
                  fileSizeBytes: confirmed.fileSizeBytes,
                  uploadedAt: confirmed.uploadedAt,
                  statusLabel: "Resume uploaded",
                },
              }));
              setUploadStatus("success");
              setSuccess("Resume uploaded successfully.");
            } catch (uploadError) {
              setUploadStatus("idle");
              setUploadProgress(0);
              setError(uploadError instanceof Error ? uploadError.message : "We could not upload your resume.");
            }
          }}
        />

        {(state.status === "no_resume" || state.status === "processing" || state.status === "recovery") && (
          <ProfileStatePanel state={state} onSave={() => runAction({ action: "save_progress" }, "Progress saved.")} />
        )}

        {(error || success) && (
          <div
            className={`mb-6 rounded-lg border px-4 py-3 text-sm font-bold ${
              error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
            role="status"
          >
            {error || success}
          </div>
        )}

        {state.sections.length > 0 && (
          <div className="grid gap-5">
            {state.sections.map((section) => (
              <ProfileSection
                key={section.id}
                section={section}
                isPending={isPending}
                editingProposalId={editingProposalId}
                editValue={editValue}
                onEditValueChange={setEditValue}
                onStartEditing={startEditing}
                onCancelEditing={() => {
                  setEditingProposalId(null);
                  setEditValue("");
                }}
                onAccept={(field) => runAction({ action: "accept", proposalId: field.proposalId }, "Suggestion accepted.")}
                onSaveEdit={(field) =>
                  runAction(
                    {
                      action: "edit",
                      proposalId: field.proposalId,
                      editedValue: editValue,
                      confirmAfterEdit: true,
                    },
                    "Edited detail saved and confirmed.",
                  )
                }
                onReject={(field) => runAction({ action: "reject", proposalId: field.proposalId }, "Suggestion rejected.")}
                onConfirmSection={(sectionId) =>
                  runAction({ action: "confirm_section", sectionId }, "Section confirmed.")
                }
              />
            ))}
          </div>
        )}

        {state.status === "confirmed" && <ConfirmedProfileSummary state={state} />}

        <div className="mt-8 flex flex-col gap-3 rounded-lg border border-blue-100 bg-white p-5 shadow-[0_8px_30px_rgba(0,80,140,0.06)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-black text-[#120b45]">Ready to finish?</h2>
            <p className="mt-1 text-sm text-[#64748b]">
              Confirm your profile when the suggestions look right. You can still edit later.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => runAction({ action: "save_progress" }, "Progress saved.")}
              disabled={isPending}
              className="rounded-lg border border-blue-100 bg-white px-5 py-3 text-sm font-black text-[#334155] transition hover:border-[#1677f2]/40 hover:text-[#1677f2] disabled:opacity-60"
            >
              Save Progress
            </button>
            <button
              type="button"
              onClick={() => runAction({ action: "confirm_profile" }, "Profile confirmed.")}
              disabled={isPending || !state.canConfirmProfile}
              className="rounded-lg bg-[#1677f2] px-5 py-3 text-sm font-black text-white transition hover:bg-[#0866d9] disabled:cursor-not-allowed disabled:bg-[#9dbff4]"
            >
              Confirm Profile
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

interface ResumeUploadIntentPayload {
  uploadRef: string;
  uploadUrl: string;
  requiredHeaders: Record<string, string>;
  maxUploadBytes: number;
}

interface ResumeConfirmPayload {
  ok: true;
  fileName: string;
  fileType: string;
  fileSizeBytes: number;
  uploadedAt: string;
}

function ResumeUploadPanel({
  state,
  uploadStatus,
  uploadProgress,
  onError,
  onUpload,
}: {
  state: CandidateProfileReviewState;
  uploadStatus: "idle" | "requesting" | "uploading" | "verifying" | "success";
  uploadProgress: number;
  onError: (message: string) => void;
  onUpload: (file: File) => Promise<void>;
}) {
  const disabled = uploadStatus !== "idle" && uploadStatus !== "success";
  const statusLabel =
    uploadStatus === "requesting"
      ? "Preparing private upload..."
      : uploadStatus === "uploading"
        ? "Uploading..."
        : uploadStatus === "verifying"
          ? "Verifying resume..."
          : uploadStatus === "success"
            ? "Resume uploaded"
            : state.resume.statusLabel;

  async function handleFile(file: File | null) {
    if (!file) return;

    const allowedTypes = new Set(state.resumeUploadPolicy.allowedMimeTypes);
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";

    if (!allowedTypes.has(file.type) || !state.resumeUploadPolicy.allowedExtensions.includes(extension)) {
      onError("Please choose a PDF or DOCX resume.");
      return;
    }

    if (file.size <= 0) {
      onError("Please choose a non-empty resume file.");
      return;
    }

    if (file.size > state.resumeUploadPolicy.maxUploadBytes) {
      onError(`Resume must be ${formatBytes(state.resumeUploadPolicy.maxUploadBytes)} or smaller.`);
      return;
    }

    await onUpload(file);
  }

  return (
    <section
      id="upload-resume"
      className="mb-8 rounded-lg border border-blue-100 bg-white p-5 shadow-[0_8px_30px_rgba(0,80,140,0.06)]"
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr] lg:items-start">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#1677f2]">Resume</p>
          <h2 className="mt-3 text-2xl font-black text-[#120b45]">
            {state.resume.hasResume ? "Replace or upload a new resume" : "Upload your resume"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#64748b]">
            Upload a PDF or DOCX resume. Your file is stored privately and is not given a public URL.
          </p>
          <p className="mt-2 text-xs font-bold text-[#64748b]">
            Maximum size: {formatBytes(state.resumeUploadPolicy.maxUploadBytes)}
          </p>
        </div>

        <div className="rounded-lg border border-[#dce9f8] bg-[#f8fbff] p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1677f2]">{statusLabel}</p>
          {state.resume.hasResume ? (
            <div className="mt-3 text-sm text-[#475569]">
              <p className="font-black text-[#0f172a]">{state.resume.fileName || "Resume file"}</p>
              <p className="mt-1">
                {[state.resume.fileType, state.resume.fileSizeBytes ? formatBytes(state.resume.fileSizeBytes) : null]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              {state.resume.uploadedAt && <p className="mt-1">Uploaded {formatDate(state.resume.uploadedAt)}</p>}
            </div>
          ) : (
            <p className="mt-3 text-sm text-[#64748b]">No resume uploaded yet.</p>
          )}

          {uploadStatus === "uploading" && (
            <div className="mt-4">
              <div className="h-2 overflow-hidden rounded-full bg-[#e5eef8]">
                <div
                  className="h-full rounded-full bg-[#1677f2] transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="mt-2 text-right text-xs font-black text-[#1677f2]">{uploadProgress}%</p>
            </div>
          )}

          <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-blue-200 bg-white px-4 py-6 text-center transition hover:border-[#1677f2]/50">
            <span className="text-sm font-black text-[#0f172a]">
              {disabled ? "Upload in progress" : "Choose PDF or DOCX"}
            </span>
            <span className="mt-1 text-xs text-[#64748b]">Drag and drop is supported by your browser file picker.</span>
            <input
              type="file"
              className="sr-only"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              disabled={disabled}
              onChange={(event) => {
                handleFile(event.currentTarget.files?.[0] ?? null).catch((uploadError) => {
                  onError(uploadError instanceof Error ? uploadError.message : "We could not upload your resume.");
                });
                event.currentTarget.value = "";
              }}
            />
          </label>
        </div>
      </div>
    </section>
  );
}

async function requestResumeUploadIntent(file: File): Promise<ResumeUploadIntentPayload> {
  const response = await fetch("/api/jobs/resume/upload-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type,
      contentLengthBytes: file.size,
    }),
  });
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.error || "We could not prepare your resume upload.");
  }

  return payload.uploadIntent;
}

function uploadToPrivateStorage(
  file: File,
  uploadIntent: ResumeUploadIntentPayload,
  onProgress: (progress: number) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("PUT", uploadIntent.uploadUrl);

    for (const [header, value] of Object.entries(uploadIntent.requiredHeaders)) {
      request.setRequestHeader(header, value);
    }

    request.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.min(100, Math.round((event.loaded / event.total) * 100)));
      }
    };
    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        onProgress(100);
        resolve();
      } else {
        reject(new Error("Private resume upload failed. Please try again."));
      }
    };
    request.onerror = () => reject(new Error("Private resume upload failed. Please try again."));
    request.send(file);
  });
}

async function confirmResumeUpload(uploadRef: string): Promise<ResumeConfirmPayload> {
  const response = await fetch("/api/jobs/resume/confirm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uploadRef }),
  });
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.error || "We could not verify your resume upload.");
  }

  return payload;
}

function formatBytes(value: number): string {
  if (value >= 1024 * 1024) {
    return `${(value / (1024 * 1024)).toFixed(value % (1024 * 1024) === 0 ? 0 : 1)} MB`;
  }

  if (value >= 1024) {
    return `${Math.round(value / 1024)} KB`;
  }

  return `${value} bytes`;
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function ProfileStatePanel({
  state,
  onSave,
}: {
  state: CandidateProfileReviewState;
  onSave: () => void;
}) {
  return (
    <section className="mb-8 rounded-lg border border-blue-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,80,140,0.06)]">
      <div className="grid gap-5 md:grid-cols-[1.4fr_0.6fr] md:items-center">
        <div>
          <h2 className="text-2xl font-black text-[#120b45]">{state.heading}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748b]">{state.message}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          {state.showUploadCta && (
            <a
              href="/jobs/account/profile#upload-resume"
              className="rounded-lg bg-[#1677f2] px-5 py-3 text-center text-sm font-black text-white transition hover:bg-[#0866d9]"
            >
              Upload Resume
            </a>
          )}
          {state.showManualProfileCta && (
            <button
              type="button"
              onClick={onSave}
              className="rounded-lg border border-blue-100 bg-white px-5 py-3 text-sm font-black text-[#334155] transition hover:border-[#1677f2]/40 hover:text-[#1677f2]"
            >
              Complete Manually
            </button>
          )}
          {state.showRetryCta && (
            <button
              type="button"
              onClick={onSave}
              className="rounded-lg border border-blue-100 bg-white px-5 py-3 text-sm font-black text-[#334155] transition hover:border-[#1677f2]/40 hover:text-[#1677f2]"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function ProfileSection({
  section,
  isPending,
  editingProposalId,
  editValue,
  onEditValueChange,
  onStartEditing,
  onCancelEditing,
  onAccept,
  onSaveEdit,
  onReject,
  onConfirmSection,
}: {
  section: CandidateProfileReviewSectionView;
  isPending: boolean;
  editingProposalId: string | null;
  editValue: string;
  onEditValueChange: (_value: string) => void;
  onStartEditing: (_field: CandidateProfileReviewFieldView) => void;
  onCancelEditing: () => void;
  onAccept: (_field: CandidateProfileReviewFieldView) => void;
  onSaveEdit: (_field: CandidateProfileReviewFieldView) => void;
  onReject: (_field: CandidateProfileReviewFieldView) => void;
  onConfirmSection: (_sectionId: CandidateProfileReviewSectionId) => void;
}) {
  const needsReview = section.fields.some((field) => field.needsReview);

  return (
    <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-[0_8px_30px_rgba(0,80,140,0.06)]">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-black text-[#120b45]">{section.title}</h2>
          <p className="mt-1 text-sm leading-6 text-[#64748b]">{section.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-[#f5fbff] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#1677f2]">
            {section.reviewedCount}/{section.totalCount}
          </span>
          {needsReview && (
            <button
              type="button"
              onClick={() => onConfirmSection(section.id)}
              disabled={isPending}
              className="rounded-lg bg-[#0a1628] px-4 py-2 text-xs font-black text-white transition hover:bg-[#1677f2] disabled:opacity-60"
            >
              Confirm Section
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-3">
        {section.fields.map((field) => {
          const isEditing = editingProposalId === field.proposalId;

          return (
            <article
              key={field.proposalId}
              className="rounded-lg border border-[#e2ecf7] bg-[#fbfdff] p-4"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-black text-[#0f172a]">{field.label}</h3>
                    <StatusBadge field={field} />
                    {field.pleaseCheck && (
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-black text-amber-700">
                        Please check this
                      </span>
                    )}
                  </div>
                  {isEditing ? (
                    <label className="mt-3 block">
                      <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#64748b]">
                        Correct detail
                      </span>
                      <textarea
                        value={editValue}
                        onChange={(event) => onEditValueChange(event.target.value)}
                        className="min-h-[96px] w-full rounded-lg border border-blue-100 bg-white px-3 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#1677f2] focus:ring-2 focus:ring-[#1677f2]/15"
                      />
                    </label>
                  ) : (
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[#334155]">
                      {field.displayValue}
                    </p>
                  )}
                  {field.canApplyToProfile && (
                    <p className="mt-2 text-xs text-[#64748b]">
                      Confirming this updates your profile details only. It does not change login credentials.
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 lg:justify-end">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => onSaveEdit(field)}
                        disabled={isPending}
                        className="rounded-lg bg-[#1677f2] px-4 py-2 text-xs font-black text-white transition hover:bg-[#0866d9] disabled:opacity-60"
                      >
                        Save & Confirm
                      </button>
                      <button
                        type="button"
                        onClick={onCancelEditing}
                        disabled={isPending}
                        className="rounded-lg border border-blue-100 bg-white px-4 py-2 text-xs font-black text-[#334155] transition hover:border-[#1677f2]/40 hover:text-[#1677f2] disabled:opacity-60"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {field.needsReview && (
                        <button
                          type="button"
                          onClick={() => onAccept(field)}
                          disabled={isPending}
                          className="rounded-lg bg-[#1677f2] px-4 py-2 text-xs font-black text-white transition hover:bg-[#0866d9] disabled:opacity-60"
                        >
                          Accept
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onStartEditing(field)}
                        disabled={isPending}
                        className="rounded-lg border border-blue-100 bg-white px-4 py-2 text-xs font-black text-[#334155] transition hover:border-[#1677f2]/40 hover:text-[#1677f2] disabled:opacity-60"
                      >
                        Edit
                      </button>
                      {field.needsReview && (
                        <button
                          type="button"
                          onClick={() => onReject(field)}
                          disabled={isPending}
                          className="rounded-lg border border-red-100 bg-white px-4 py-2 text-xs font-black text-red-600 transition hover:border-red-200 hover:bg-red-50 disabled:opacity-60"
                        >
                          Reject
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function StatusBadge({ field }: { field: CandidateProfileReviewFieldView }) {
  const styles =
    field.statusLabel === "Confirmed"
      ? "bg-emerald-50 text-emerald-700"
      : field.statusLabel === "Edited"
        ? "bg-[#eef6ff] text-[#1677f2]"
        : field.statusLabel === "Rejected"
          ? "bg-red-50 text-red-700"
          : "bg-amber-50 text-amber-700";

  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] ${styles}`}>
      {field.statusLabel}
    </span>
  );
}

function ConfirmedProfileSummary({ state }: { state: CandidateProfileReviewState }) {
  const entries = [
    ["Full name", state.confirmedProfile.fullName],
    ["Email", state.confirmedProfile.email],
    ["Mobile", state.confirmedProfile.mobile],
    ["Location", state.confirmedProfile.location],
    ["Current designation", state.confirmedProfile.currentDesignation],
    ["Current employer", state.confirmedProfile.currentEmployer],
    ["Total experience", state.confirmedProfile.totalExperience],
  ].filter(([, value]) => Boolean(value));

  if (entries.length === 0) return null;

  return (
    <section className="mt-8 rounded-lg border border-blue-100 bg-white p-5 shadow-[0_8px_30px_rgba(0,80,140,0.06)]">
      <h2 className="text-xl font-black text-[#120b45]">Confirmed profile</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {entries.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-[#e2ecf7] bg-[#fbfdff] p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#1677f2]">{label}</p>
            <p className="mt-2 text-sm font-bold text-[#0f172a]">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
