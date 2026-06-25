export type RestoreItemType = 'content' | 'seo';

export interface RestoreFieldChange {
  field: string;
  currentValue: string;
  selectedValue: string;
}

export interface RestoreSnapshotField {
  field: string;
  value: string;
}

export interface RestoreVersionItem {
  id: string;
  versionId: string;
  type: RestoreItemType;
  contentKey: string;
  pageName: string;
  sectionName: string;
  versionStatus: string;
  createdBy: string;
  createdByRole: string;
  createdAt: string;
  lastPublishedAt?: string;
  summary: string;
  canRestore: boolean;
  changedFields: RestoreFieldChange[];
  currentSnapshot: RestoreSnapshotField[];
  selectedSnapshot: RestoreSnapshotField[];
}

export interface RestoreFilters {
  page?: number;
  limit?: number;
  type?: string;
  changedBy?: string;
  search?: string;
  from?: string;
  to?: string;
  versionId?: string;
}

export interface RestoreListResult {
  items: RestoreVersionItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface RestoreActionResult {
  success: true;
  key: string;
  restoredVersionId: string;
  restoredAt: string;
  pagePath: string;
}
