import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "rivinity:installed-skills";

function read(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

export function useInstalledSkills() {
  const [installed, setInstalled] = useState<Set<string>>(() => read());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...installed]));
  }, [installed]);

  const add = useCallback((id: string) => {
    setInstalled((s) => {
      if (s.has(id)) return s;
      const n = new Set(s);
      n.add(id);
      return n;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setInstalled((s) => {
      if (!s.has(id)) return s;
      const n = new Set(s);
      n.delete(id);
      return n;
    });
  }, []);

  return { installed, add, remove, isInstalled: (id: string) => installed.has(id) };
}
