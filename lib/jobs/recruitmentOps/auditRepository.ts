import "server-only";

import { getJobsPrismaClient } from "@/lib/jobs/prisma";
import type { AuditActorType, Prisma } from "@prisma/client";

export interface JobsAuditEventInput {
  entityType: string;
  entityId: string;
  action: string;
  actorType: AuditActorType;
  actorRefId?: string;
  changedFields?: string[];
  metadata?: Record<string, unknown>;
}

/**
 * Records a Jobs audit event.
 *
 * CONTRACT: this function never throws and never rejects. Callers `await` it so
 * the write is attempted and completed before the HTTP response is returned —
 * a fire-and-forget `void` call is not durable on serverless, where the runtime
 * may freeze or tear down the instance as soon as the response is sent.
 *
 * A failed audit write is logged server-side and swallowed, so it can never turn
 * a successful primary operation into an error for the user. Several call sites
 * (notably the public apply route) have no surrounding try/catch and depend on
 * this guarantee. Only the entity/action identifiers are logged — never the
 * metadata payload, and never anything returned to the client.
 */
export async function recordJobsAuditEvent(input: JobsAuditEventInput): Promise<void> {
  try {
    const prisma = getJobsPrismaClient();
    await prisma.auditEvent.create({
      data: {
        entity_type: input.entityType,
        entity_id: input.entityId,
        action: input.action,
        actor_type: input.actorType,
        actor_ref_id: input.actorRefId ?? null,
        changed_fields: input.changedFields ?? [],
        context: input.metadata ? (input.metadata as Prisma.InputJsonValue) : undefined,
      },
    });
  } catch (err) {
    // Audit failures must never break the primary operation, and must never
    // surface to the client. Log identifiers only, then swallow.
    console.error(
      `[auditRepository] Failed to record audit event ${input.action} for ${input.entityType}:${input.entityId} —`,
      err instanceof Error ? err.message : String(err),
    );
  }
}
