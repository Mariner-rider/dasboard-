import { useCallback, useEffect, useState } from "react";
import { MARKET_ITEMS, MarketItem } from "@/lib/marketplaceData";

type State = {
  items: MarketItem[];
  loading: boolean;
  error: string | null;
};

/**
 * Simulates an async fetch of marketplace items so we can show polished
 * loading / error / empty states in the UI. Purely client-side; swap the
 * body for a real fetch when the API is wired up.
 *
 * Dev only: append `?fail=1` to force the error state and exercise retry.
 */
export function useMarketplace(delayMs = 450) {
  const [state, setState] = useState<State>({ items: [], loading: true, error: null });

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));
    const forceFail =
      import.meta.env.DEV &&
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("fail") === "1";

    const t = window.setTimeout(() => {
      if (forceFail) {
        setState({ items: [], loading: false, error: "We couldn't load marketplace listings. Please try again." });
      } else {
        setState({ items: MARKET_ITEMS, loading: false, error: null });
      }
    }, delayMs);
    return () => window.clearTimeout(t);
  }, [delayMs]);

  useEffect(() => {
    return load();
  }, [load]);

  return { ...state, refetch: load };
}
