import { useState } from "react";
import {
  PanelLeft,
  Code2,
  GitCompare,
  Eye,
  Terminal as TerminalIcon,
  RefreshCw,
  X,
  FileCode,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Search,
  Lock,
  Send,
  Paperclip,
  Mic,
  Sparkles,
  CheckCircle2,
  Loader2,
  Play,
  Plus,
} from "lucide-react";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
}

interface Props {
  projectName: string;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onExit: () => void;
}

type FileNode = {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  language?: string;
};

const fileTree: FileNode[] = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "components",
        type: "folder",
        children: [
          { name: "TodoItem.tsx", type: "file", language: "tsx" },
          { name: "TodoList.tsx", type: "file", language: "tsx" },
          { name: "AddTodo.tsx", type: "file", language: "tsx" },
        ],
      },
      { name: "App.tsx", type: "file", language: "tsx" },
      { name: "main.tsx", type: "file", language: "tsx" },
      { name: "index.css", type: "file", language: "css" },
    ],
  },
  {
    name: "public",
    type: "folder",
    children: [{ name: "favicon.svg", type: "file", language: "svg" }],
  },
  { name: "package.json", type: "file", language: "json" },
  { name: "vite.config.ts", type: "file", language: "ts" },
  { name: "tsconfig.json", type: "file", language: "json" },
  { name: "README.md", type: "file", language: "md" },
];

const sampleCode = `import { useState } from "react";
import { TodoList } from "./components/TodoList";
import { AddTodo } from "./components/AddTodo";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false },
    ]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <main className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-6">Todo App</h1>
      <AddTodo onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} />
    </main>
  );
}`;

const terminalLines = [
  { type: "cmd", text: "npm create vite@latest todo-app -- --template react-ts" },
  { type: "out", text: "✔ Scaffolding project in ~/project/todo-app..." },
  { type: "cmd", text: "cd todo-app && npm install" },
  { type: "out", text: "added 247 packages in 4s" },
  { type: "cmd", text: "npm run dev" },
  { type: "out", text: "VITE v5.4.0  ready in 312 ms" },
  { type: "out", text: "➜  Local:   http://localhost:5173/" },
];

const buildSteps = [
  { label: "Scaffold project structure", status: "done" as const },
  { label: "Install dependencies", status: "done" as const },
  { label: "Generate components", status: "done" as const },
  { label: "Wire up state management", status: "running" as const },
  { label: "Apply styling & polish", status: "pending" as const },
];

const FileTreeNode = ({
  node,
  depth = 0,
  selected,
  onSelect,
}: {
  node: FileNode;
  depth?: number;
  selected: string;
  onSelect: (n: string) => void;
}) => {
  const [open, setOpen] = useState(true);
  if (node.type === "folder") {
    return (
      <div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center gap-1 px-2 py-1 rounded-md hover:bg-accent/40 text-[12px] text-foreground/70"
          style={{ paddingLeft: 8 + depth * 12 }}
        >
          {open ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          {open ? (
            <FolderOpen className="w-3.5 h-3.5 text-primary/70" />
          ) : (
            <Folder className="w-3.5 h-3.5 text-primary/70" />
          )}
          <span>{node.name}</span>
        </button>
        {open &&
          node.children?.map((c) => (
            <FileTreeNode
              key={c.name}
              node={c}
              depth={depth + 1}
              selected={selected}
              onSelect={onSelect}
            />
          ))}
      </div>
    );
  }
  return (
    <button
      onClick={() => onSelect(node.name)}
      className={`w-full flex items-center gap-1.5 px-2 py-1 rounded-md text-[12px] transition-colors ${
        selected === node.name
          ? "bg-primary/10 text-foreground"
          : "text-foreground/60 hover:bg-accent/40"
      }`}
      style={{ paddingLeft: 8 + depth * 12 + 14 }}
    >
      <FileCode className="w-3.5 h-3.5 text-muted-foreground/60" />
      <span>{node.name}</span>
    </button>
  );
};

const BuilderWorkbench = ({ projectName, messages, onSendMessage, onExit }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tab, setTab] = useState<"code" | "diff" | "preview">("code");
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [leftTab, setLeftTab] = useState<"files" | "search" | "locks">("files");
  const [selectedFile, setSelectedFile] = useState("App.tsx");
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="flex-1 flex min-h-0 min-w-0 animate-float-in">
      {/* Left: chat thread */}
      <div
        className="shrink-0 transition-all duration-300 ease-in-out overflow-hidden border-r border-border/40"
        style={{ width: sidebarOpen ? 380 : 0 }}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border/40 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
<<<<<<< HEAD
              <div className="w-6 h-6 rounded-md bg-[#FF7A18] flex items-center justify-center shrink-0">
=======
              <div className="w-6 h-6 rounded-md bg-[#ff8b28] flex items-center justify-center shrink-0">
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
                <Sparkles className="w-3 h-3 text-primary-foreground" />
              </div>
              <p className="text-[13px] font-semibold text-foreground/85 truncate">{projectName}</p>
            </div>
            <button
              onClick={onExit}
              className="p-1.5 rounded-md text-muted-foreground/60 hover:bg-accent/50 hover:text-foreground"
              title="Back to main chat"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((m) => (
              <div key={m.id} className="space-y-2">
                {m.role === "user" ? (
                  <div className="px-3 py-2 rounded-xl rounded-bl-sm bg-muted/60 text-[13px] text-foreground/80 leading-relaxed">
                    {m.content}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-[13px] text-foreground/75 leading-relaxed">{m.content}</p>

                    {/* Build steps card */}
                    <div className="glass rounded-xl border border-glass overflow-hidden">
                      <div className="px-3 py-2 flex items-center justify-between border-b border-border/30 bg-muted/20">
                        <p className="text-[11px] font-semibold text-foreground/75">{projectName}</p>
                        <ChevronDown className="w-3 h-3 text-muted-foreground/60" />
                      </div>
                      <div className="p-3 space-y-1.5">
                        {buildSteps.map((s) => (
                          <div key={s.label} className="flex items-center gap-2 text-[11.5px]">
                            {s.status === "done" && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                            )}
                            {s.status === "running" && (
                              <Loader2 className="w-3.5 h-3.5 text-primary animate-spin shrink-0" />
                            )}
                            {s.status === "pending" && (
                              <div className="w-3.5 h-3.5 rounded-full border border-muted-foreground/30 shrink-0" />
                            )}
                            <span
                              className={
                                s.status === "pending"
                                  ? "text-muted-foreground/50"
                                  : "text-foreground/75"
                              }
                            >
                              {s.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="px-3 py-2 border-t border-border/30 bg-muted/10">
                        <p className="text-[10px] text-muted-foreground/50 mb-1">Run command</p>
                        <code className="block text-[11px] font-mono text-foreground/80 bg-background/60 px-2 py-1.5 rounded-md truncate">
                          npm create vite@latest todo-app
                        </code>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Composer */}
          <div className="p-3 border-t border-border/40">
            <div className="glass rounded-2xl border border-glass shadow-float">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={2}
                placeholder="How can Rivinity help you today?"
                className="w-full bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none px-3.5 pt-3 pb-1 resize-none"
              />
              <div className="flex items-center justify-between px-2 pb-2">
                <div className="flex items-center gap-0.5 text-muted-foreground/40">
                  <button className="w-7 h-7 rounded-lg hover:bg-muted/40 hover:text-foreground/70 flex items-center justify-center">
                    <Paperclip className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-7 h-7 rounded-lg hover:bg-muted/40 hover:text-foreground/70 flex items-center justify-center">
                    <Mic className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-7 h-7 rounded-lg hover:bg-muted/40 hover:text-foreground/70 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button
                  onClick={send}
<<<<<<< HEAD
                  className="w-8 h-8 rounded-full bg-[#FF7A18] flex items-center justify-center hover:opacity-90"
=======
                  className="w-8 h-8 rounded-full bg-[#ff8b28] flex items-center justify-center hover:opacity-90"
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
                >
                  <Send className="w-3.5 h-3.5 text-primary-foreground" />
                </button>
              </div>
            </div>
            <p className="text-[10px] text-center text-muted-foreground/40 mt-2">
              Rivinity may not always be accurate. Always verify crucial details.
            </p>
          </div>
        </div>
      </div>

      {/* Right: Workbench */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 p-3">
        <div className="flex-1 glass-strong rounded-2xl border border-glass shadow-float overflow-hidden flex flex-col">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-border/40 bg-muted/10">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSidebarOpen((v) => !v)}
                className="p-1.5 rounded-md text-muted-foreground/60 hover:bg-accent/50 hover:text-foreground"
              >
                <PanelLeft className="w-3.5 h-3.5" />
              </button>
              <div className="w-px h-4 bg-border/60 mx-1" />
              {[
                { key: "code" as const, icon: Code2, label: "Code" },
                { key: "diff" as const, icon: GitCompare, label: "Diff" },
                { key: "preview" as const, icon: Eye, label: "Preview" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium transition-colors ${
                    tab === t.key
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground/60 hover:text-foreground/80 hover:bg-accent/30"
                  }`}
                >
                  <t.icon className="w-3.5 h-3.5" />
                  {t.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground/60">
              <button
                onClick={() => setTerminalOpen((v) => !v)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11.5px] hover:bg-accent/50 hover:text-foreground"
              >
                <TerminalIcon className="w-3.5 h-3.5" />
                Toggle Terminal
              </button>
              <button className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11.5px] hover:bg-accent/50 hover:text-foreground">
                <RefreshCw className="w-3.5 h-3.5" /> Sync
              </button>
              <button
                onClick={onExit}
                className="p-1.5 rounded-md hover:bg-accent/50 hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 flex min-h-0">
            {/* File tree */}
            <div className="w-[200px] shrink-0 border-r border-border/40 flex flex-col bg-muted/5">
              <div className="flex items-center gap-3 px-3 py-2 border-b border-border/40 text-[11.5px] font-medium">
                {[
                  { key: "files" as const, icon: FileCode, label: "Files" },
                  { key: "search" as const, icon: Search, label: "Search" },
                  { key: "locks" as const, icon: Lock, label: "Locks" },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setLeftTab(t.key)}
                    className={`transition-colors ${
                      leftTab === t.key ? "text-foreground" : "text-muted-foreground/50 hover:text-foreground/70"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto py-2">
                {leftTab === "files" &&
                  fileTree.map((n) => (
                    <FileTreeNode
                      key={n.name}
                      node={n}
                      selected={selectedFile}
                      onSelect={setSelectedFile}
                    />
                  ))}
                {leftTab === "search" && (
                  <div className="px-3">
                    <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-background/60 border border-border/40">
                      <Search className="w-3 h-3 text-muted-foreground/60" />
                      <input
                        placeholder="Search files..."
                        className="bg-transparent text-[11.5px] focus:outline-none flex-1"
                      />
                    </div>
                  </div>
                )}
                {leftTab === "locks" && (
                  <p className="text-[11px] text-muted-foreground/50 px-3">No locked files</p>
                )}
              </div>
            </div>

            {/* Main panel */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Tab bar */}
              <div className="flex items-center border-b border-border/40 bg-muted/5">
                <div className="flex items-center gap-1.5 px-3 py-1.5 text-[11.5px] font-medium border-r border-border/40 bg-background text-foreground">
                  <FileCode className="w-3 h-3 text-muted-foreground/60" />
                  {selectedFile}
                  <X className="w-3 h-3 ml-2 opacity-40 hover:opacity-100 cursor-pointer" />
                </div>
                <button className="px-2 py-1.5 text-muted-foreground/40 hover:text-foreground/70">
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Editor / Diff / Preview */}
              <div className="flex-1 min-h-0 overflow-auto bg-background/60">
                {tab === "code" && (
                  <div className="flex text-[12px] font-mono leading-relaxed">
                    <div className="select-none text-right text-muted-foreground/30 px-3 py-3 border-r border-border/30">
                      {sampleCode.split("\n").map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                    <pre className="px-4 py-3 text-foreground/85 whitespace-pre">{sampleCode}</pre>
                  </div>
                )}
                {tab === "diff" && (
                  <div className="p-4 text-[12px] font-mono space-y-1">
                    <div className="px-3 py-1 bg-red-500/10 text-red-500 rounded">- const todos = [];</div>
                    <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded">
                      + const [todos, setTodos] = useState&lt;Todo[]&gt;([]);
                    </div>
                    <div className="px-3 py-1 text-muted-foreground/60">  return (</div>
                    <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded">
                      +   &lt;AddTodo onAdd={"{addTodo}"} /&gt;
                    </div>
                    <div className="px-3 py-1 text-muted-foreground/60">  );</div>
                  </div>
                )}
                {tab === "preview" && (
                  <div className="h-full flex items-center justify-center p-6">
                    <div className="w-full max-w-md glass rounded-xl border border-glass p-6">
                      <h2 className="text-xl font-bold mb-4 text-foreground/85">Todo App</h2>
                      <div className="flex gap-2 mb-4">
                        <input
                          placeholder="Add a task..."
                          className="flex-1 px-3 py-2 rounded-lg bg-background border border-border/50 text-sm focus:outline-none focus:border-primary/50"
                        />
<<<<<<< HEAD
                        <button className="px-3 py-2 rounded-lg bg-[#FF7A18] text-primary-foreground text-sm font-medium">
=======
                        <button className="px-3 py-2 rounded-lg bg-[#ff8b28] text-primary-foreground text-sm font-medium">
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
                          Add
                        </button>
                      </div>
                      <div className="space-y-2">
                        {["Design landing page", "Wire up auth", "Ship MVP"].map((t, i) => (
                          <label
                            key={t}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/40 text-[13px] text-foreground/80"
                          >
                            <input type="checkbox" defaultChecked={i === 0} />
                            <span className={i === 0 ? "line-through text-muted-foreground/60" : ""}>
                              {t}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Terminal */}
              {terminalOpen && (
                <div className="border-t border-border/40 bg-background/80 flex flex-col" style={{ height: 180 }}>
                  <div className="flex items-center justify-between px-3 py-1.5 border-b border-border/30 bg-muted/20">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-background text-[11px] font-medium">
                        <TerminalIcon className="w-3 h-3" /> Rivinity Terminal
                      </div>
                      <button className="text-muted-foreground/50 hover:text-foreground p-0.5">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-1 text-muted-foreground/60 hover:text-foreground rounded">
                        <Play className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setTerminalOpen(false)}
                        className="p-1 text-muted-foreground/60 hover:text-foreground rounded"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto px-3 py-2 font-mono text-[11.5px] leading-relaxed">
                    {terminalLines.map((l, i) => (
                      <div key={i} className={l.type === "cmd" ? "text-primary" : "text-foreground/70"}>
                        {l.type === "cmd" ? <span className="text-muted-foreground/50">~/project &gt; </span> : null}
                        {l.text}
                      </div>
                    ))}
                    <div className="flex items-center gap-1 text-foreground/70">
                      <span className="text-muted-foreground/50">~/project &gt; </span>
                      <span className="w-1.5 h-3 bg-primary/70 animate-pulse" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderWorkbench;
