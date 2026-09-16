import { useState } from "react";
import {
  Plus,
  Copy,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  ShieldAlert,
  Trash2,
  X,
} from "lucide-react";
import SettingsPageLayout from "@/components/settings/SettingsPageLayout";

type ApiKey = {
  id: string;
  name: string;
  prefix: string;
  created: string;
  lastUsed: string;
  scope: string[];
  status: "active" | "revoked";
};

const initialKeys: ApiKey[] = [
  {
    id: "k1",
    name: "Production · Web app",
    prefix: "rvn_live_9f2c…a417",
    created: "Feb 12, 2026",
    lastUsed: "2 minutes ago",
    scope: ["chat.write", "agents.invoke"],
    status: "active",
  },
  {
    id: "k2",
    name: "CI / GitHub Actions",
    prefix: "rvn_live_7ab1…d902",
    created: "Jan 04, 2026",
    lastUsed: "4 hours ago",
    scope: ["chat.read", "studio.audio"],
    status: "active",
  },
  {
    id: "k3",
    name: "Staging worker",
    prefix: "rvn_test_4de8…c110",
    created: "Nov 28, 2025",
    lastUsed: "3 days ago",
    scope: ["chat.write"],
    status: "active",
  },
  {
    id: "k4",
    name: "Legacy notebook",
    prefix: "rvn_live_1c47…b8f0",
    created: "Aug 09, 2025",
    lastUsed: "Revoked",
    scope: ["chat.read"],
    status: "revoked",
  },
];

export default function ApiKeysSettings() {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyScope, setNewKeyScope] = useState("chat.write");
  const [generatedRawKey, setGeneratedRawKey] = useState<string | null>(null);

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      /* clipboard write failed */
    }
  };

  const revokeKey = (id: string) => {
    setKeys((prev) =>
      prev.map((k) =>
        k.id === id ? { ...k, status: "revoked", lastUsed: "Revoked" } : k
      )
    );
  };

  const deleteKey = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
  };

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const rawSecret = `rvn_live_${crypto.randomUUID().replace(/-/g, "")}`;
    const prefix = `${rawSecret.slice(0, 12)}…${rawSecret.slice(-4)}`;

    const newKeyItem: ApiKey = {
      id: `k_${Date.now()}`,
      name: newKeyName.trim(),
      prefix,
      created: "Just now",
      lastUsed: "Never",
      scope: [newKeyScope],
      status: "active",
    };

    setKeys((prev) => [newKeyItem, ...prev]);
    setGeneratedRawKey(rawSecret);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewKeyName("");
    setNewKeyScope("chat.write");
    setGeneratedRawKey(null);
  };

  const activeCount = keys.filter((k) => k.status === "active").length;

  return (
    <SettingsPageLayout
      title="API Keys"
      description="Manage programmatic access keys for server-to-server calls to Rivinity. Keys grant granular workspace permissions."
    >
      <div className="mx-auto w-full max-w-6xl space-y-4 sm:space-y-6">
        <div className="overflow-hidden rounded-xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
          <div className="flex flex-col gap-4 border-b border-border/60 p-4 sm:p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary shrink-0">
                <KeyRound className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-foreground truncate">
                  Secret Keys
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {activeCount} active · {keys.length} total
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 sm:py-1.5 text-xs font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <Plus className="h-3.5 w-3.5 shrink-0" />
              Create new key
            </button>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full table-fixed text-left text-xs border-collapse">
              <colgroup>
                <col className="w-[28%]" />
                <col className="w-[28%]" />
                <col className="w-[18%]" />
                <col className="w-[12%]" />
                <col className="w-[14%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-border/40 bg-muted/20 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3.5">Name</th>
                  <th className="px-5 py-3.5">Token Prefix</th>
                  <th className="px-5 py-3.5">Scopes</th>
                  <th className="px-5 py-3.5">Last Active</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {keys.map((k) => {
                  const isRevealed = Boolean(revealedIds[k.id]);
                  const isCopied = copiedId === k.id;
                  const isActive = k.status === "active";

                  return (
                    <tr
                      key={k.id}
                      className="group transition-colors hover:bg-muted/30"
                    >
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                              isActive ? "bg-emerald-500" : "bg-muted-foreground/40"
                            }`}
                          />
                          <span className="font-medium text-foreground text-[13px] truncate">
                            {k.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1 rounded-md border border-border/50 bg-muted/40 px-2 py-1">
                          <code className="font-mono text-[11.5px] text-foreground/90">
                            {isRevealed
                              ? k.prefix
                              : `••••••••••••${k.prefix.slice(-4)}`}
                          </code>
                          <div className="ml-1 flex items-center border-l border-border/50 pl-1">
                            <button
                              type="button"
                              onClick={() => toggleReveal(k.id)}
                              className="rounded p-1 text-muted-foreground hover:text-foreground transition-colors"
                              title={isRevealed ? "Mask" : "Reveal"}
                            >
                              {isRevealed ? (
                                <EyeOff className="h-3 w-3" />
                              ) : (
                                <Eye className="h-3 w-3" />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(k.id, k.prefix)}
                              className="rounded p-1 text-muted-foreground hover:text-foreground transition-colors"
                              title="Copy prefix"
                            >
                              {isCopied ? (
                                <Check className="h-3 w-3 text-emerald-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {k.scope.map((s) => (
                            <span
                              key={s}
                              className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10.5px] text-secondary-foreground"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap text-muted-foreground">
                        {k.lastUsed}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap text-right">
                        <div className="inline-flex items-center justify-end gap-1">
                          {isActive ? (
                            <button
                              type="button"
                              onClick={() => revokeKey(k.id)}
                              className="rounded px-2.5 py-1 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
                            >
                              Revoke
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => deleteKey(k.id)}
                              className="rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                              title="Delete key"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-border/40 md:hidden">
            {keys.map((k) => {
              const isRevealed = Boolean(revealedIds[k.id]);
              const isCopied = copiedId === k.id;
              const isActive = k.status === "active";

              return (
                <div key={k.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${
                          isActive ? "bg-emerald-500" : "bg-muted-foreground/40"
                        }`}
                      />
                      <span className="font-medium text-foreground text-sm truncate">
                        {k.name}
                      </span>
                    </div>

                    <span
                      className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-wider ${
                        isActive
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "border-border/60 bg-muted text-muted-foreground"
                      }`}
                    >
                      {isActive ? "Active" : "Revoked"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 rounded-lg border border-border/60 bg-muted/30 p-2">
                    <code className="font-mono text-xs text-foreground/90 truncate">
                      {isRevealed
                        ? k.prefix
                        : `••••••••••••${k.prefix.slice(-4)}`}
                    </code>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleReveal(k.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-border/50 bg-background/50 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={isRevealed ? "Hide prefix" : "Reveal prefix"}
                      >
                        {isRevealed ? (
                          <EyeOff className="h-3.5 w-3.5" />
                        ) : (
                          <Eye className="h-3.5 w-3.5" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(k.id, k.prefix)}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-border/50 bg-background/50 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Copy prefix"
                      >
                        {isCopied ? (
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {k.scope.map((s) => (
                      <span
                        key={s}
                        className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-secondary-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-muted-foreground">
                      Used {k.lastUsed}
                    </span>

                    {isActive ? (
                      <button
                        type="button"
                        onClick={() => revokeKey(k.id)}
                        className="rounded px-2.5 py-1 font-medium text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        Revoke
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => deleteKey(k.id)}
                        className="flex items-center gap-1 rounded px-2 py-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-border/40 bg-muted/10 p-3 sm:px-5 text-center sm:text-left text-[11px] text-muted-foreground">
            Full token payloads are only visible immediately upon key generation.
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl border border-border bg-card shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-border px-4 sm:px-5 py-4">
                <h4 className="text-sm font-semibold text-foreground">
                  {generatedRawKey ? "Save Secret Key" : "Generate API Key"}
                </h4>
                <button
                  onClick={closeModal}
                  className="rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {!generatedRawKey ? (
                <form onSubmit={handleCreateKey} className="p-4 sm:p-5 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">
                      Key Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Production Microservice"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 sm:py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">
                      Scope Access
                    </label>
                    <select
                      value={newKeyScope}
                      onChange={(e) => setNewKeyScope(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 sm:py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    >
                      <option value="chat.write">chat.write</option>
                      <option value="chat.read">chat.read</option>
                      <option value="agents.invoke">agents.invoke</option>
                      <option value="studio.audio">studio.audio</option>
                      <option value="admin.full">admin.full</option>
                    </select>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="w-full sm:w-auto rounded-lg border border-border px-3.5 py-2 sm:py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:w-auto rounded-lg bg-primary px-3.5 py-2 sm:py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Generate Key
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-4 sm:p-5 space-y-4">
                  <div className="flex items-start gap-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-500">
                    <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                    <p>
                      Copy this secret immediately. You will not be able to see it again.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-muted-foreground">
                      Secret Key
                    </label>
                    <div className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 p-1.5">
                      <input
                        readOnly
                        value={generatedRawKey}
                        className="w-full bg-transparent px-2 font-mono text-xs text-foreground focus:outline-none select-all min-w-0"
                      />
                      <button
                        type="button"
                        onClick={() => copyToClipboard("modal", generatedRawKey)}
                        className="inline-flex shrink-0 items-center gap-1 rounded bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
                      >
                        {copiedId === "modal" ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-500" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="w-full sm:w-auto rounded-lg bg-primary px-3.5 py-2 sm:py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </SettingsPageLayout>
  );
}