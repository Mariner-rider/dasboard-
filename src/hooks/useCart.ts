import { useSyncExternalStore } from "react";
import { isRecord, readJson, writeJson } from "@/lib/storage";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  type: string;
  author: string;
  thumb?: string;
  qty: number;
};

const KEY = "cart.v1";

const isCartItem = (v: unknown): v is CartItem =>
  isRecord(v) &&
  typeof v.id === "string" &&
  typeof v.title === "string" &&
  typeof v.price === "number" && Number.isFinite(v.price) && v.price >= 0 &&
  typeof v.type === "string" &&
  typeof v.author === "string" &&
  typeof v.qty === "number" && Number.isInteger(v.qty) && v.qty >= 1 &&
  (v.thumb === undefined || typeof v.thumb === "string");

const isCart = (v: unknown): v is CartItem[] => Array.isArray(v) && v.every(isCartItem);

let items: CartItem[] = readJson(KEY, isCart, []);
const listeners = new Set<() => void>();

function commit() {
  writeJson(KEY, items);
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const getSnap = () => items;

export function useCart() {
  const s = useSyncExternalStore(subscribe, getSnap, getSnap);
  return {
    items: s,
    count: s.reduce((a, c) => a + c.qty, 0),
    subtotal: s.reduce((a, c) => a + c.price * c.qty, 0),
    add: (it: Omit<CartItem, "qty">) => {
      const existing = items.find((x) => x.id === it.id);
      items = existing
        ? items.map((x) => (x.id === it.id ? { ...x, qty: x.qty + 1 } : x))
        : [...items, { ...it, qty: 1 }];
      commit();
    },
    remove: (id: string) => {
      items = items.filter((x) => x.id !== id);
      commit();
    },
    setQty: (id: string, qty: number) => {
      items = items.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x));
      commit();
    },
    clear: () => {
      items = [];
      commit();
    },
  };
}
