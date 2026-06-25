export type ChangeHistoryType = 'content' | 'seo' | 'blog';

export type ChangeHistoryStatus =
  | 'published'
  | 'draft'
  | 'pending_approval'
  | 'pending_review'
  | 'approved'
  | 'rejected'
  | 'requested_changes'
  | 'deleted'
  | 'archived';

export interface HistoryFieldChange {
  field: string;
  oldValue: string;
  newValue: string;
}

export interface HistorySnapshotField {
  field: string;
  value: string;
}

export interface ChangeHistoryItem {
  id: string;
  type: ChangeHistoryType;
  contentKey: string;
  pageName: string;
  sectionName: string;
  action: string;
  status: ChangeHistoryStatus;
  changedBy: string;
  changedByRole: string;
  changedAt: string;
  publishedAt?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewerComment?: string;
  summary: string;
  changedFields: HistoryFieldChange[];
  publishedSnapshot: HistorySnapshotField[];
  draftSnapshot: HistorySnapshotField[];
}

export interface ChangeHistoryFilters {
  page?: number;
  limit?: number;
  status?: string;
  type?: string;
  changedBy?: string;
  search?: string;
  from?: string;
  to?: string;
}

export interface ChangeHistoryResult {
  items: ChangeHistoryItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
