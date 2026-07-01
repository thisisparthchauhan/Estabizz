import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requirePermission } from '@/lib/admin/requirePermission';
import {
  approveContentChange,
  canReviewQueueItem,
  rejectContentChange,
  reviewBlogChange,
  reviewRegulatoryChange,
  reviewPublicContentPageChange,
  type QueueAction,
  type QueueItemType,
} from '@/lib/content/approvalQueue';

const ACTIONS: QueueAction[] = ['approve', 'reject', 'request_changes'];
const ITEM_TYPES: QueueItemType[] = ['content', 'blog', 'regulatory_update', 'public_content_page'];

export async function POST(req: NextRequest) {
  try {
    const auth = await requirePermission(req, 'view_admin');
    if (!auth.ok) return auth.response;

    const body = await req.json();
    const itemType = body.itemType as QueueItemType;
    const action = body.action as QueueAction;
    const key = typeof body.key === 'string' ? body.key.trim() : '';
    const submittedBy = typeof body.submittedBy === 'string' ? body.submittedBy.trim() : '';
    const comment = typeof body.comment === 'string' ? body.comment.trim() : '';

    if (!ITEM_TYPES.includes(itemType) || !ACTIONS.includes(action) || !key) {
      return NextResponse.json({ error: 'Review action is incomplete.' }, { status: 400 });
    }

    if ((action === 'reject' || action === 'request_changes') && !comment) {
      return NextResponse.json({ error: 'Reviewer Comment is required.' }, { status: 400 });
    }

    if (!canReviewQueueItem(auth.admin, { type: itemType, key, submittedBy })) {
      return NextResponse.json({ error: 'You can view this item, but you cannot review it.' }, { status: 403 });
    }

    if (itemType === 'content') {
      if (action === 'approve') {
        await approveContentChange(key, auth.admin, comment);
      } else {
        await rejectContentChange(key, auth.admin, comment, action === 'request_changes');
      }
      revalidatePath('/', 'layout');
    } else {
      if (itemType === 'blog') {
        await reviewBlogChange(key, auth.admin, action, comment);
        revalidatePath('/blogs');
      } else if (itemType === 'regulatory_update') {
        await reviewRegulatoryChange(key, auth.admin, action, comment);
        revalidatePath('/resources/regulatory-updates');
        revalidatePath('/resources/regulatory-updates/[slug]', 'page');
      } else {
        await reviewPublicContentPageChange(key, auth.admin, action, comment);
        revalidatePath(key);
      }
    }

    return NextResponse.json({ success: true, action });
  } catch (err) {
    console.error('[approval-queue/action] Error:', err);
    const message = err instanceof Error ? err.message : 'Unable to complete review action.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
