import { useSyncExternalStore } from "react";
import { isRecord, newId, readJson, removeKey, writeJson } from "@/lib/storage";

export type ChatMessage = { id: number; role: "user" | "ai"; content: string };
export type Conversation = {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: number;
};

type State = { conversations: Conversation[]; activeId: string | null };

const KEY = "conversations.v1";
const ACTIVE_KEY = "activeConversation.v1";

const isChatMessage = (v: unknown): v is ChatMessage =>
  isRecord(v) &&
  typeof v.id === "number" &&
  (v.role === "user" || v.role === "ai") &&
  typeof v.content === "string";

const isConversation = (v: unknown): v is Conversation =>
  isRecord(v) &&
  typeof v.id === "string" &&
  typeof v.title === "string" &&
  Array.isArray(v.messages) && v.messages.every(isChatMessage) &&
  typeof v.updatedAt === "number";

const isState = (v: unknown): v is Conversation[] => Array.isArray(v) && v.every(isConversation);

function load(): State {
  if (typeof window === "undefined") return { conversations: [], activeId: null };
  const conversations = readJson(KEY, isState, []);
  const rawActive = localStorage.getItem("rivinity." + ACTIVE_KEY);
  const activeId = rawActive && conversations.some((c) => c.id === rawActive) ? rawActive : null;
  return { conversations, activeId };
}

let state: State = load();
const listeners = new Set<() => void>();

function save() {
  writeJson(KEY, state.conversations);
  if (state.activeId) {
    try {
      localStorage.setItem("rivinity." + ACTIVE_KEY, state.activeId);
    } catch {
      /* noop */
    }
  } else {
    removeKey(ACTIVE_KEY);
  }
}

function setState(updater: (s: State) => State) {
  state = updater(state);
  save();
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const getSnapshot = () => state;

export function useConversations() {
  const s = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const active = s.conversations.find((c) => c.id === s.activeId) || null;

  return {
    conversations: s.conversations,
    activeId: s.activeId,
    active,
    selectConversation: (id: string | null) => setState((prev) => ({ ...prev, activeId: id })),
    createNew: () => setState((prev) => ({ ...prev, activeId: null })),
    deleteConversation: (id: string) =>
      setState((prev) => ({
        conversations: prev.conversations.filter((c) => c.id !== id),
        activeId: prev.activeId === id ? null : prev.activeId,
      })),
    renameConversation: (id: string, title: string) =>
      setState((prev) => ({
        ...prev,
        conversations: prev.conversations.map((c) => (c.id === id ? { ...c, title } : c)),
      })),
    appendMessage: (msg: ChatMessage) =>
      setState((prev) => {
        if (prev.activeId) {
          return {
            ...prev,
            conversations: prev.conversations.map((c) =>
              c.id === prev.activeId
                ? { ...c, messages: [...c.messages, msg], updatedAt: Date.now() }
                : c
            ),
          };
        }
        const conv: Conversation = {
          id: newId("c"),
          title: msg.role === "user" ? msg.content.slice(0, 48).trim() || "New chat" : "New chat",
          messages: [msg],
          updatedAt: Date.now(),
        };
        return { conversations: [conv, ...prev.conversations], activeId: conv.id };
      }),
  };
}
