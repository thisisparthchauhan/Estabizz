// NOTE: server-only module — imports the Mongoose DB layer. Never import this
// from a "use client" component; read it in a Server Component and pass the
// resolved plain object down as props.
import { connectDB } from '@/lib/db';
import ContentBlock from '@/lib/models/ContentBlock';
import ContentVersion from '@/lib/models/ContentVersion';
import { getDefaultFields } from '@/lib/content/defaults';
import type { ContentFields } from '@/lib/content/types';

// ─────────────────────────────────────────────────────────────────────────────
// getContent — the function the PUBLIC site uses to read editable content.
//
// Behaviour (safety-first):
//   • Returns the live PUBLISHED block fields, merged OVER the hardcoded
//     defaults so any missing field falls back gracefully.
//   • If the block doesn't exist, isn't published, or the DB is unreachable,
//     it returns the hardcoded defaults. The site therefore NEVER breaks and
//     always renders something sensible.
//
// Server-only: imports the DB layer. Call from Server Components / route
// handlers, then pass the resolved plain object down to client components.
// ─────────────────────────────────────────────────────────────────────────────

export async function getContent(key: string): Promise<ContentFields> {
  const defaults = getDefaultFields(key);

  try {
    await connectDB();
    const block = await ContentBlock.findOne({ key, status: 'published' })
      .lean<{ fields?: ContentFields }>()
      .exec();

    if (!block?.fields) {
      const latestPublished = await ContentVersion.findOne({ blockKey: key, status: 'published' })
        .sort({ createdAt: -1 })
        .lean<{ snapshot?: ContentFields }>()
        .exec();

      if (latestPublished?.snapshot) return { ...defaults, ...latestPublished.snapshot };
      return { ...defaults };
    }

    // Live fields win, but defaults fill any gaps.
    return { ...defaults, ...block.fields };
  } catch (err) {
    console.error(`[getContent] falling back to defaults for "${key}":`, err);
    return { ...defaults };
  }
}

/** Typed helper: read a single string field with a guaranteed string result. */
export async function getContentField(
  key: string,
  field: string,
  fallback = ''
): Promise<string> {
  const fields = await getContent(key);
  const value = fields[field];
  return typeof value === 'string' ? value : fallback;
}
