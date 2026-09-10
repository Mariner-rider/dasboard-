import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Settings as SettingsIcon,
  Bell,
  Sparkles,
  Grid2x2,
  AudioLines,
  CreditCard,
  Database,
  HardDrive,
  ShieldCheck,
  LockKeyhole,
  Users,
  LifeBuoy,
  UserCircle,
  Keyboard,
  X,
  ChevronDown,
  Check,
  Trash2,
  LogOut,
  KeyRound,
  ShieldQuestion,
  ExternalLink,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const sections: { id: string; label: string; icon: IconType }[] = [
  { id: "general", label: "General", icon: SettingsIcon },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "personalization", label: "Personalization", icon: Sparkles },
  { id: "apps", label: "Apps", icon: Grid2x2 },
  { id: "voice", label: "Voice", icon: AudioLines },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "data", label: "Data controls", icon: Database },
  { id: "storage", label: "Storage", icon: HardDrive },
  { id: "safety", label: "Safety", icon: ShieldCheck },
  { id: "security", label: "Security and login", icon: LockKeyhole },
  { id: "parental", label: "Parental controls", icon: Users },
  { id: "trusted", label: "Trusted contact", icon: LifeBuoy },
  { id: "account", label: "Account", icon: UserCircle },
  { id: "keyboard", label: "Keyboard", icon: Keyboard },
];

// Full-page account settings that live outside this dialog. Rendered as
// a separate group at the bottom of the sidebar — the dialog itself is
// otherwise untouched.
const linkedPages: { to: string; label: string; icon: IconType }[] = [
  { to: "/settings/team-members", label: "Team members", icon: Users },
  { to: "/settings/roles-access", label: "Roles & access", icon: ShieldQuestion },
  { to: "/settings/api-keys", label: "API keys", icon: KeyRound },
];

type SelectRowProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  swatch?: string;
};

const SelectRow = ({ label, value, options, onChange, swatch }: SelectRowProps) => (
  <div className="flex items-center justify-between py-4 border-b border-glass/60">
    <span className="text-[14px] text-foreground">{label}</span>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 text-[13.5px] text-foreground/85 hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-accent/60">
          {swatch && <span className="w-2.5 h-2.5 rounded-full" style={{ background: swatch }} />}
          {value}
          <ChevronDown className="w-3.5 h-3.5 text-foreground/50" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {options.map((opt) => (
          <DropdownMenuItem key={opt} onClick={() => onChange(opt)} className="text-[13px]">
            <span className="flex-1">{opt}</span>
            {opt === value && <Check className="w-3.5 h-3.5 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

type ToggleRowProps = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
};

const ToggleRow = ({ label, description, checked, onChange }: ToggleRowProps) => (
  <div className="flex items-start justify-between gap-6 py-4 border-b border-glass/60">
    <div className="min-w-0">
      <p className="text-[14px] text-foreground">{label}</p>
      {description && (
        <p className="text-[12.5px] text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
      )}
    </div>
    <Switch checked={checked} onCheckedChange={onChange} />
  </div>
);

const SettingsDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) => {
  const [section, setSection] = useState("general");

  // General
  const [appearance, setAppearance] = useState("System");
  const [contrast, setContrast] = useState("System");
  const [accent, setAccent] = useState("Default");
  const [language, setLanguage] = useState("Auto-detect");
  const [higherIntel, setHigherIntel] = useState(true);
  const [dictation, setDictation] = useState(true);

  // Notifications
  const [pushNotif, setPushNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(false);
  const [soundNotif, setSoundNotif] = useState(true);
  const [tasksNotif, setTasksNotif] = useState(true);

  // Personalization
  const [memory, setMemory] = useState(true);
  const [followUp, setFollowUp] = useState(true);
  const [creativity, setCreativity] = useState([60]);

  // Voice
  const [voiceModel, setVoiceModel] = useState("Aurora");
  const [autoSend, setAutoSend] = useState(false);

  // Data
  const [improve, setImprove] = useState(true);
  const [chatHistory, setChatHistory] = useState(true);

  // Security
  const [twoFA, setTwoFA] = useState(false);

  const accentSwatch: Record<string, string> = {
    Default: "hsl(var(--muted-foreground))",
    Indigo: "#6366f1",
    Rose: "#f43f5e",
    Emerald: "#10b981",
    Amber: "#f59e0b",
  };

  const renderSection = () => {
    switch (section) {
      case "general":
        return (
          <div>
            <SelectRow label="Appearance" value={appearance} options={["System", "Light", "Dark"]} onChange={setAppearance} />
            <SelectRow label="Contrast" value={contrast} options={["System", "Normal", "High"]} onChange={setContrast} />
            <SelectRow
              label="Accent color"
              value={accent}
              options={Object.keys(accentSwatch)}
              onChange={setAccent}
              swatch={accentSwatch[accent]}
            />
            <SelectRow label="Language" value={language} options={["Auto-detect", "English", "Hindi", "Spanish", "French", "German"]} onChange={setLanguage} />
            <ToggleRow
              label="Higher intelligence"
              description="Rivinity can automatically use a higher intelligence setting when you ask a complex question."
              checked={higherIntel}
              onChange={setHigherIntel}
            />
            <ToggleRow
              label="Enable Dictation"
              description="Use dictation in the chat composer."
              checked={dictation}
              onChange={setDictation}
            />
          </div>
        );
      case "notifications":
        return (
          <div>
            <ToggleRow label="Push notifications" description="Get notified on this device." checked={pushNotif} onChange={setPushNotif} />
            <ToggleRow label="Email digest" description="Weekly summary delivered to your inbox." checked={emailNotif} onChange={setEmailNotif} />
            <ToggleRow label="Sound alerts" checked={soundNotif} onChange={setSoundNotif} />
            <ToggleRow label="Task completion" description="Ping me when long-running tasks finish." checked={tasksNotif} onChange={setTasksNotif} />
          </div>
        );
      case "personalization":
        return (
          <div>
            <ToggleRow label="Memory" description="Let Rivinity remember details across chats." checked={memory} onChange={setMemory} />
            <ToggleRow label="Follow-up suggestions" checked={followUp} onChange={setFollowUp} />
            <div className="py-5 border-b border-glass/60">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[14px] text-foreground">Creativity</p>
                <span className="text-[12.5px] text-muted-foreground">{creativity[0]}%</span>
              </div>
              <Slider value={creativity} onValueChange={setCreativity} max={100} step={1} />
            </div>
          </div>
        );
      case "apps":
        return (
          <div className="py-2">
            {["Google Drive", "Notion", "Slack", "GitHub", "Linear"].map((app) => (
              <div key={app} className="flex items-center justify-between py-3.5 border-b border-glass/60">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg glass-subtle flex items-center justify-center text-[12px] font-semibold">
                    {app[0]}
                  </div>
                  <span className="text-[14px] text-foreground">{app}</span>
                </div>
                <button className="text-[12.5px] px-3 py-1.5 rounded-md hover:bg-accent text-foreground/80 transition-colors">
                  Connect
                </button>
              </div>
            ))}
          </div>
        );
      case "voice":
        return (
          <div>
            <SelectRow label="Voice model" value={voiceModel} options={["Aurora", "Nova", "Ember", "Sage"]} onChange={setVoiceModel} />
            <ToggleRow label="Auto-send after pause" description="Send automatically when you stop speaking." checked={autoSend} onChange={setAutoSend} />
          </div>
        );
      case "billing":
        return (
          <div className="space-y-4 pt-2">
            <div className="glass-subtle rounded-xl p-5 border border-glass">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[12.5px] uppercase tracking-wider text-muted-foreground">Current plan</p>
                  <p className="text-[18px] font-semibold text-foreground mt-1">Pro · $20/month</p>
                </div>
                <button className="px-3.5 py-1.5 rounded-md cta-pill text-[13px]">Manage</button>
              </div>
            </div>
            <div className="glass-subtle rounded-xl p-5 border border-glass">
              <p className="text-[14px] text-foreground">Payment method</p>
              <p className="text-[12.5px] text-muted-foreground mt-1">Visa ending in 4242 · expires 09/27</p>
            </div>
          </div>
        );
      case "data":
        return (
          <div>
            <ToggleRow label="Improve the model" description="Allow Rivinity to use your conversations to improve the model." checked={improve} onChange={setImprove} />
            <ToggleRow label="Chat history" description="Store chats so you can revisit and search them." checked={chatHistory} onChange={setChatHistory} />
            <div className="flex items-center justify-between py-4 border-b border-glass/60">
              <span className="text-[14px] text-foreground">Export data</span>
              <button className="text-[12.5px] px-3 py-1.5 rounded-md hover:bg-accent transition-colors text-foreground/80">Request export</button>
            </div>
            <div className="flex items-center justify-between py-4">
              <span className="text-[14px] text-destructive">Delete all chats</span>
              <button className="flex items-center gap-1.5 text-[12.5px] px-3 py-1.5 rounded-md hover:bg-destructive/10 transition-colors text-destructive">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        );
      case "storage":
        return (
          <div className="space-y-4 pt-2">
            <div className="glass-subtle rounded-xl p-5 border border-glass">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[14px] text-foreground">Workspace storage</p>
                <p className="text-[12.5px] text-muted-foreground">3.2 GB of 50 GB</p>
              </div>
              <div className="h-2 bg-accent/60 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "6.4%" }} />
              </div>
            </div>
          </div>
        );
      case "safety":
      case "security":
        return (
          <div>
            <ToggleRow label="Two-factor authentication" description="Add an extra layer of security with 2FA." checked={twoFA} onChange={setTwoFA} />
            <div className="py-4 border-b border-glass/60">
              <p className="text-[14px] text-foreground mb-2">Change password</p>
              <Input type="password" placeholder="New password" className="max-w-sm" />
            </div>
            <div className="flex items-center justify-between py-4">
              <span className="text-[14px] text-foreground">Active sessions</span>
              <button className="text-[12.5px] px-3 py-1.5 rounded-md hover:bg-accent transition-colors text-foreground/80">View</button>
            </div>
          </div>
        );
      case "parental":
        return (
          <div>
            <ToggleRow label="Restrict mature content" checked={true} onChange={() => {}} />
            <ToggleRow label="Require PIN for purchases" checked={false} onChange={() => {}} />
          </div>
        );
      case "trusted":
        return (
          <div className="space-y-4 pt-2">
            <p className="text-[13px] text-muted-foreground">A trusted contact can help you regain access to your account.</p>
            <Input placeholder="Trusted contact email" className="max-w-md" />
            <button className="cta-pill px-4 py-2 text-[13px]">Add contact</button>
          </div>
        );
      case "account":
        return (
          <div>
            <div className="flex items-center gap-4 py-4 border-b border-glass/60">
              <div className="w-14 h-14 rounded-full gradient-accent flex items-center justify-center text-primary-foreground font-semibold">TT</div>
              <div>
                <p className="text-[15px] font-medium text-foreground">Tushar Trivedi</p>
                <p className="text-[12.5px] text-muted-foreground">tushar@rivinity.ai</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-glass/60">
              <span className="text-[14px] text-foreground">Username</span>
              <span className="text-[13px] text-muted-foreground">@tushar</span>
            </div>
            <div className="flex items-center justify-between py-4">
              <span className="text-[14px] text-foreground">Sign out</span>
              <button className="flex items-center gap-1.5 text-[12.5px] px-3 py-1.5 rounded-md hover:bg-accent text-foreground/80 transition-colors">
                <LogOut className="w-3.5 h-3.5" /> Sign out
              </button>
            </div>
          </div>
        );
      case "keyboard":
        return (
          <div className="pt-2">
            {[
              ["New chat", "⌘ N"],
              ["Search chats", "⌘ K"],
              ["Toggle sidebar", "⌘ B"],
              ["Send message", "↵"],
              ["Newline", "⇧ ↵"],
            ].map(([action, keys]) => (
              <div key={action} className="flex items-center justify-between py-3.5 border-b border-glass/60">
                <span className="text-[14px] text-foreground">{action}</span>
                <kbd className="text-[12px] px-2 py-1 rounded-md glass-subtle border border-glass text-foreground/80">{keys}</kbd>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const activeLabel = sections.find((s) => s.id === section)?.label ?? "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[920px] p-0 overflow-hidden border-glass">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">Manage your Rivinity preferences.</DialogDescription>
        <div className="flex h-[640px]">
          {/* Sidebar */}
          <div className="w-[240px] shrink-0 border-r border-glass glass-subtle flex flex-col">
            <div className="flex-1 overflow-y-auto px-2 pt-3 pb-3 space-y-0.5">
              {sections.map((s) => {
                const Icon = s.icon;
                const active = section === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSection(s.id)}
                    className={`w-full h-9 px-2.5 rounded-lg flex items-center gap-3 text-[13.5px] transition-colors duration-150 ${
                      active
                        ? "bg-accent text-foreground font-medium"
                        : "text-foreground/80 hover:bg-accent/60"
                    }`}
                  >
                    <Icon className="w-[18px] h-[18px] shrink-0 text-foreground/70" strokeWidth={1.75} />
                    <span className="truncate text-left">{s.label}</span>
                  </button>
                );
              })}
              <div className="mt-3 pt-3 border-t border-glass/60">
                <p className="px-2.5 pb-1.5 text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                  Workspace
                </p>
                {linkedPages.map((p) => {
                  const Icon = p.icon;
                  return (
                    <Link
                      key={p.to}
                      to={p.to}
                      onClick={() => onOpenChange(false)}
                      className="w-full h-9 px-2.5 rounded-lg flex items-center gap-3 text-[13.5px] text-foreground/80 hover:bg-accent/60 transition-colors"
                    >
                      <Icon className="w-[18px] h-[18px] shrink-0 text-foreground/70" strokeWidth={1.75} />
                      <span className="truncate text-left flex-1">{p.label}</span>
                      <ExternalLink className="w-3 h-3 text-foreground/40" strokeWidth={1.75} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-8 pt-7 pb-10">
              <h2 className="text-[22px] font-semibold text-foreground tracking-tight mb-4">{activeLabel}</h2>
              {renderSection()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
