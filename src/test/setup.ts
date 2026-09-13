import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// jsdom doesn't implement these observers, but framer-motion + several UI
// libraries touch them during render. Stub both so components mount cleanly.
class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

const g = globalThis as unknown as {
  IntersectionObserver?: unknown;
  ResizeObserver?: unknown;
};
g.IntersectionObserver = g.IntersectionObserver ?? NoopObserver;
g.ResizeObserver = g.ResizeObserver ?? NoopObserver;

// Silence expected 404 logs from the NotFound page during route tests.
const originalError = console.error;
console.error = (...args: unknown[]) => {
  const first = args[0];
  if (typeof first === "string" && first.startsWith("404 Error:")) return;
  originalError(...args);
};
