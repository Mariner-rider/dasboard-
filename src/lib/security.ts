// Defense-in-depth URL allowlist for any user-influenced link rendered
// in the UI (AI output, markdown content, marketplace descriptions).
// Blocks javascript:, data:, vbscript: and other unsafe schemes.
const ALLOWED_PROTOCOLS = new Set(["http:", "https:", "mailto:"]);

export function safeUrl(href: string | undefined): string | undefined {
  if (!href) return undefined;
  try {
    const url = new URL(href, window.location.origin);
    return ALLOWED_PROTOCOLS.has(url.protocol) ? href : undefined;
  } catch {
    return undefined;
  }
}
