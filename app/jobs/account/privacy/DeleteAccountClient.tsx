"use client";

import { useState } from "react";

type Stage = "idle" | "confirming" | "deleting" | "deleted";

export default function DeleteAccountClient() {
  const [stage, setStage] = useState<Stage>("idle");
  const [password, setPassword] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setError("");
    setStage("deleting");

    try {
      const response = await fetch("/api/jobs/account/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, confirm: "DELETE" }),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload.ok) {
        // Never claim success on a partial failure, and never surface server
        // internals -- the message is whatever the API deemed safe to show.
        throw new Error(payload.error || "We could not delete your account. Please try again.");
      }

      setPassword("");
      setStage("deleted");
      // Full reload so no client-side state from the deleted account survives.
      setTimeout(() => window.location.assign("/"), 4000);
    } catch (deleteError) {
      setStage("confirming");
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "We could not delete your account. Please try again.",
      );
    }
  }

  if (stage === "deleted") {
    return (
      <main className="min-h-screen bg-[#f8fbff] px-4 py-10 text-[#0a1628] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-lg border border-emerald-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,80,140,0.06)] sm:p-8">
          <h1 className="text-2xl font-black text-[#120b45] sm:text-3xl">Your account has been deleted</h1>
          <p className="mt-4 text-[15px] leading-7 text-[#475569]">
            Your resume, extracted profile details and contact information have been permanently
            removed. You have been signed out and will be taken to the homepage shortly.
          </p>
          <a
            href="/"
            className="mt-6 inline-flex rounded-lg bg-[#1677f2] px-5 py-3 text-sm font-black text-white transition hover:bg-[#0866d9]"
          >
            Return to Estabizz
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fbff] px-4 py-10 text-[#0a1628] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-3 inline-flex rounded-full bg-[#eaf2ff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#1677f2]">
          Privacy
        </div>
        <h1 className="text-[30px] font-black leading-tight tracking-tight text-[#120b45] sm:text-[38px]">
          Your data and your account
        </h1>

        <section className="mt-6 rounded-lg border border-blue-100 bg-white p-5 shadow-[0_8px_30px_rgba(0,80,140,0.06)] sm:p-6">
          <h2 className="text-lg font-black text-[#120b45]">Delete my account</h2>
          <p className="mt-2 text-sm leading-6 text-[#64748b]">
            This is permanent. We cannot restore your account or your resume once it is deleted.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-red-100 bg-red-50/60 p-4">
              <h3 className="text-sm font-black text-[#991b1b]">Permanently deleted</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-[#7f1d1d]">
                <li>Your uploaded resume files</li>
                <li>Details we extracted from your resume</li>
                <li>Your email address and phone number</li>
                <li>Your skills, education and work history</li>
                <li>Your sign-in for the Estabizz website</li>
              </ul>
            </div>

            <div className="rounded-lg border border-blue-100 bg-[#f8fbff] p-4">
              <h3 className="text-sm font-black text-[#1e3a8a]">Kept, with your identity removed</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-[#475569]">
                <li>A record that you applied to a role, for our legal and business obligations</li>
                <li>Security logs showing that changes happened, without your personal details</li>
                <li>A record that you gave or withdrew consent</li>
              </ul>
              <p className="mt-3 text-xs leading-5 text-[#64748b]">
                Anything published under your name, such as a submitted article, stays online with
                the author details removed. Backups may hold a copy for a short period before they
                expire.
              </p>
            </div>
          </div>

          {stage === "idle" ? (
            <button
              type="button"
              onClick={() => setStage("confirming")}
              className="mt-6 w-full rounded-lg border border-red-200 bg-white px-5 py-3 text-sm font-black text-[#b91c1c] transition hover:bg-red-50 sm:w-auto"
            >
              Delete my account
            </button>
          ) : (
            <div className="mt-6 rounded-lg border border-red-200 bg-white p-4 sm:p-5">
              <h3 className="text-sm font-black text-[#991b1b]">Confirm permanent deletion</h3>
              <p className="mt-2 text-sm leading-6 text-[#475569]">
                Enter your password to confirm. This cannot be undone.
              </p>

              <label className="mt-4 block text-xs font-black uppercase tracking-[0.12em] text-[#64748b]">
                Password
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={stage === "deleting"}
                  className="mt-2 w-full rounded-lg border border-blue-100 px-4 py-3 text-sm font-normal normal-case tracking-normal text-[#0f172a] outline-none focus:border-[#1677f2] disabled:opacity-60"
                />
              </label>

              <label className="mt-4 flex items-start gap-3 text-sm leading-6 text-[#475569]">
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(event) => setAcknowledged(event.target.checked)}
                  disabled={stage === "deleting"}
                  className="mt-1 h-4 w-4 shrink-0"
                />
                <span>
                  I understand my resume and profile will be permanently deleted and cannot be
                  recovered.
                </span>
              </label>

              {error && (
                <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700" role="alert">
                  {error}
                </p>
              )}

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={stage === "deleting" || !password || !acknowledged}
                  className="rounded-lg bg-[#b91c1c] px-5 py-3 text-sm font-black text-white transition hover:bg-[#991b1b] disabled:cursor-not-allowed disabled:bg-[#e4a5a5]"
                >
                  {stage === "deleting" ? "Deleting…" : "Permanently delete my account"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStage("idle");
                    setPassword("");
                    setAcknowledged(false);
                    setError("");
                  }}
                  disabled={stage === "deleting"}
                  className="rounded-lg border border-blue-100 bg-white px-5 py-3 text-sm font-black text-[#334155] transition hover:border-[#1677f2]/40 hover:text-[#1677f2] disabled:opacity-60"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
