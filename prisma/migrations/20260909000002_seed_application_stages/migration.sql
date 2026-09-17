INSERT INTO "application_stages" ("id", "name", "slug", "sort_order", "is_terminal", "is_positive_terminal", "is_active", "colour_hex", "created_at")
VALUES
  (gen_random_uuid(), 'Applied',     'applied',     1, false, false, true, '#3b82f6', now()),
  (gen_random_uuid(), 'Screening',   'screening',   2, false, false, true, '#8b5cf6', now()),
  (gen_random_uuid(), 'Shortlisted', 'shortlisted', 3, false, false, true, '#06b6d4', now()),
  (gen_random_uuid(), 'Interview',   'interview',   4, false, false, true, '#f59e0b', now()),
  (gen_random_uuid(), 'Offer',       'offer',       5, false, false, true, '#10b981', now()),
  (gen_random_uuid(), 'Hired',       'hired',       6, true,  true,  true, '#059669', now()),
  (gen_random_uuid(), 'Rejected',    'rejected',    7, true,  false, true, '#ef4444', now()),
  (gen_random_uuid(), 'Withdrawn',   'withdrawn',   8, true,  false, true, '#94a3b8', now())
ON CONFLICT (slug) DO NOTHING;
