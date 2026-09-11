/**
 * Integration test for candidate privacy deletion against the real database
 * and storage.
 *
 * Creates a DISPOSABLE synthetic candidate with representative rows and one
 * real storage object, deletes it through the production code path, and then
 * verifies the outcome. Refuses to run outside a clearly-named staging bucket,
 * and only ever touches the candidate it created.
 */
import { config as loadEnv } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "@prisma/client";

import { createS3CompatibleDocumentStorage, getDocumentStorageConfig } from "../lib/jobs/documentStorage";
import { deleteCandidateData } from "../lib/jobs/candidateDeletion/service";
import { PrismaCandidateDeletionRepository } from "../lib/jobs/candidateDeletion/prismaRepository";

loadEnv({ path: ".env.local", quiet: true });

const SYNTHETIC_EMAIL = "phase61.deletion.subject@estabizz-test.invalid";
/** The Postgres+storage path is what this test exercises; the website side
 *  has its own integration coverage. */
const noopWebsiteEraser = {
  async verifyPassword() { return true; },
  async eraseWebsiteAccount() { return { userDeleted: false, blogsAnonymised: 0 }; },
};

let pass = 0;
let fail = 0;

function check(name: string, ok: boolean, extra = "") {
  if (ok) { pass += 1; console.log(`  ✓  ${name}`); }
  else { fail += 1; console.log(`  ✗  ${name}  ${extra}`); }
}

async function main() {
  const storageConfig = getDocumentStorageConfig();

  if (storageConfig.environment === "production") throw new Error("Refused: APP_ENV is production.");
  if (!/(^|[-_])staging($|[-_])/i.test(storageConfig.bucket)) {
    throw new Error(`Refused: bucket "${storageConfig.bucket}" is not clearly staging.`);
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL as string }),
  });
  const storage = createS3CompatibleDocumentStorage(storageConfig);

  // ---- build a disposable synthetic candidate ----------------------------
  const identity = await prisma.identityReference.create({
    data: {
      external_id: Date.now().toString(16).padStart(24, "0").slice(0, 24),
      external_collection: "users",
      identity_type: "candidate_user",
      display_name_cache: "Phase61 DeletionSubject",
      email_cache: SYNTHETIC_EMAIL,
    },
    select: { id: true },
  });

  const candidateData: Prisma.CandidateUncheckedCreateInput = {
    identity_ref_id: identity.id,
    candidate_code: `P61-${Date.now().toString(36).toUpperCase().slice(-8)}`,
    first_name: "Phase61",
    last_name: "DeletionSubject",
    current_city: "Synthetic City",
    current_title: "Synthetic Title",
    current_employer: "Synthetic Employer Ltd",
    years_of_experience: 5,
    created_by_ref_id: identity.id,
    portal_registered: true,
    status: "active",
    source: "portal_registration",
  };
  const candidate = await prisma.candidate.create({ data: candidateData, select: { id: true } });

  await prisma.candidateContact.createMany({
    data: [
      { candidate_id: candidate.id, contact_type: "email", value: SYNTHETIC_EMAIL, is_primary: true },
      { candidate_id: candidate.id, contact_type: "phone_mobile", value: "0000000001" },
    ],
  });
  await prisma.candidateConsent.create({
    data: {
      candidate_id: candidate.id, consent_type: "data_processing", event: "granted",
      ip_address: "203.0.113.10", user_agent: "SyntheticAgent/1.0",
    },
  });

  // One REAL object in the staging bucket, so storage deletion is exercised.
  const body = Buffer.from("%PDF-1.4\n% synthetic deletion subject\n%%EOF\n", "utf8");
  const target = await storage.createPresignedUpload({
    candidateId: candidate.id,
    uploadId: `p61-${Date.now()}`,
    uploadKind: "resume",
    originalFilename: "synthetic_deletion_subject.pdf",
    contentType: "application/pdf",
    contentLengthBytes: body.byteLength,
    requestedByRefId: identity.id,
  });
  const put = await fetch(target.uploadUrl, {
    method: "PUT", headers: target.requiredHeaders, body: new Uint8Array(body),
  });
  if (!put.ok) throw new Error(`fixture upload failed: HTTP ${put.status}`);

  const run = await prisma.aIProcessingRun.create({
    data: {
      run_type: "resume_parse", entity_type: "resume_version", entity_id: candidate.id,
      model_provider: "none", model_name: "synthetic", model_version: "v1",
      status: "completed", triggered_by_ref_id: identity.id,
    },
    select: { id: true },
  });
  const resume = await prisma.resumeVersion.create({
    data: {
      candidate_id: candidate.id, version_number: 1, is_current: true,
      file_storage_key: target.objectKey, file_name_original: "synthetic_deletion_subject.pdf",
      file_type: "application/pdf", file_size_bytes: body.byteLength,
      uploaded_by_ref_id: identity.id, parse_status: "completed", ai_processing_run_id: run.id,
    },
    select: { id: true },
  });
  await prisma.aIProcessingRun.update({ where: { id: run.id }, data: { entity_id: resume.id } });
  await prisma.candidate.update({ where: { id: candidate.id }, data: { current_resume_version_id: resume.id } });
  await prisma.aIExtraction.create({
    data: {
      ai_processing_run_id: run.id, resume_version_id: resume.id, candidate_id: candidate.id,
      field_path: "identity.candidateName",
      extracted_value: { currentValue: "PHASE61 DELETIONSUBJECT", reviewStatus: "ai_proposed" },
    },
  });
  await prisma.candidateActivity.create({
    data: {
      candidate_id: candidate.id, activity_type: "resume_uploaded",
      description: "Synthetic activity.", actor_ref_id: identity.id,
    },
  });
  await prisma.auditEvent.create({
    data: {
      entity_type: "candidate", entity_id: candidate.id, action: "ai_profile_proposal_created",
      actor_type: "system", changed_fields: ["identity.candidateName"],
      new_values: { currentValue: "PHASE61 DELETIONSUBJECT" },
    },
  });

  console.log(`\nsynthetic subject created: candidate ${candidate.id.slice(0, 8)}\n`);

  // ---- delete through the production code path ---------------------------
  const result = await deleteCandidateData(
    {
      candidateId: candidate.id, actorCandidateId: candidate.id,
      actorRefId: identity.id, reason: "candidate_request",
      websiteUserId: "", websiteEmail: SYNTHETIC_EMAIL,
    },
    { repository: new PrismaCandidateDeletionRepository(prisma), storage, websiteAccount: noopWebsiteEraser },
  );
  console.log("deletion result:", JSON.stringify(result), "\n");

  // ---- verify -------------------------------------------------------------
  console.log("Storage:");
  check("the resume object is gone from the bucket", (await storage.getObjectMetadata(target.objectKey)) === null);
  check("one object was deleted, none failed", result.storageObjectsDeleted === 1 && result.storageObjectsFailed === 0);

  console.log("\nHard-deleted personal data:");
  check("resume versions removed", (await prisma.resumeVersion.count({ where: { candidate_id: candidate.id } })) === 0);
  check("AI extractions removed", (await prisma.aIExtraction.count({ where: { candidate_id: candidate.id } })) === 0);
  check("AI processing runs removed", (await prisma.aIProcessingRun.count({ where: { id: run.id } })) === 0);
  check("contacts removed", (await prisma.candidateContact.count({ where: { candidate_id: candidate.id } })) === 0);
  check("activities removed", (await prisma.candidateActivity.count({ where: { candidate_id: candidate.id } })) === 0);

  console.log("\nAnonymised but retained:");
  const after = await prisma.candidate.findUnique({
    where: { id: candidate.id },
    select: {
      first_name: true, last_name: true, current_city: true, current_title: true,
      current_employer: true, years_of_experience: true, identity_ref_id: true,
      current_resume_version_id: true, deleted_at: true, portal_registered: true,
    },
  });
  check("candidate row still exists", after !== null);
  check("name replaced with a tombstone", after?.first_name === "Deleted" && after?.last_name === "Deleted", JSON.stringify(after?.first_name));
  check("location, title, employer and experience cleared",
    after?.current_city === null && after?.current_title === null &&
    after?.current_employer === null && after?.years_of_experience === null);
  check("website identity unlinked", after?.identity_ref_id === null);
  check("current resume pointer cleared", after?.current_resume_version_id === null);
  check("deleted_at stamped", after?.deleted_at !== null);
  check("portal access revoked", after?.portal_registered === false);

  const consent = await prisma.candidateConsent.findFirst({
    where: { candidate_id: candidate.id }, select: { ip_address: true, user_agent: true, event: true },
  });
  check("consent record retained as proof of lawful basis", consent !== null && consent.event === "granted");
  check("consent IP and user agent minimised", consent?.ip_address === null && consent?.user_agent === null);

  console.log("\nAudit retained, PII minimised:");
  const audits = await prisma.auditEvent.findMany({
    where: { entity_id: candidate.id }, select: { action: true, new_values: true, changed_fields: true },
  });
  check("audit rows retained", audits.length > 0);
  check("no audit row still carries the candidate's name",
    !JSON.stringify(audits).toUpperCase().includes("DELETIONSUBJECT"));
  check("audit values replaced with a tombstone",
    audits.some((a) => JSON.stringify(a.new_values) === JSON.stringify({ redacted: "candidate_deleted" })));

  console.log("\nIdempotency:");
  const second = await deleteCandidateData(
    { candidateId: candidate.id, actorCandidateId: candidate.id, actorRefId: identity.id, reason: "candidate_request", websiteUserId: "", websiteEmail: SYNTHETIC_EMAIL },
    { repository: new PrismaCandidateDeletionRepository(prisma), storage, websiteAccount: noopWebsiteEraser },
  );
  check("a repeat deletion is a safe no-op", second.status === "already_deleted");
  check("the candidate row survived the repeat", (await prisma.candidate.count({ where: { id: candidate.id } })) === 1);

  console.log("\nCleanup of the test subject:");
  await prisma.auditEvent.deleteMany({ where: { entity_id: candidate.id } });
  await prisma.candidateConsent.deleteMany({ where: { candidate_id: candidate.id } });
  await prisma.candidate.delete({ where: { id: candidate.id } });
  await prisma.identityReference.delete({ where: { id: identity.id } });
  check("synthetic subject fully removed", (await prisma.candidate.count({ where: { id: candidate.id } })) === 0);

  console.log(`\n${pass + fail} checks: ${pass} passed, ${fail} failed`);
  await prisma.$disconnect();
  if (fail > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
