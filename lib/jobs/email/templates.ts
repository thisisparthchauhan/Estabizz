import type { JobsEmailTemplate } from "./types";

export function renderJobsEmailSmokeTestTemplate(): JobsEmailTemplate {
  return {
    subject: "Transactional email smoke test",
    html: [
      "<p>This is a staging-only Estabizz Jobs transactional email smoke test.</p>",
      "<p>No candidate workflow was triggered.</p>",
    ].join(""),
    text: [
      "This is a staging-only Estabizz Jobs transactional email smoke test.",
      "No candidate workflow was triggered.",
    ].join("\n"),
  };
}
