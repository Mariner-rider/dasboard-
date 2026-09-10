import { Layers, Plus, Minus, Check } from "lucide-react";
import { SKILLS } from "@/lib/skillsCatalog";
import { useInstalledSkills } from "@/components/skills/SkillsHook";
import ChatMarkdown from "./ChatMarkdown";
import { useToast } from "@/hooks/use-toast";

interface Props {
  skillId: string;
}

/**
 * In-chat skill execution result. Renders the SKILL.md preview and exposes
 * the two primary actions — Add to AI / Remove from AI — inline, matching
 * the design language used on the Skills library page.
 */
const SkillResultCard = ({ skillId }: Props) => {
  const skill = SKILLS.find((s) => s.id === skillId);
  const { add, remove, isInstalled } = useInstalledSkills();
  const { toast } = useToast();

  if (!skill) {
    return (
      <div className="text-[12.5px] text-muted-foreground">Skill not found.</div>
    );
  }

  const inst = isInstalled(skill.id);

  return (
    <div className="rounded-2xl glass border border-glass p-4 space-y-3 max-w-full">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg gradient-accent flex items-center justify-center shrink-0">
          <Layers className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70">
              {skill.category}
            </span>
            {inst && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 h-4 rounded-full bg-primary/15 text-primary border border-primary/25">
                <Check className="w-2.5 h-2.5" /> Installed
              </span>
            )}
          </div>
          <h4 className="text-[13.5px] font-semibold tracking-tight leading-snug truncate">
            {skill.name}
          </h4>
        </div>
      </div>

      <p className="text-[12.5px] text-muted-foreground/80 leading-snug">{skill.summary}</p>

      <details className="group rounded-xl bg-accent/40 border border-glass">
        <summary className="cursor-pointer list-none px-3 py-2 text-[11px] font-medium text-foreground/70 flex items-center justify-between">
          <span>Preview SKILL.md</span>
          <span className="text-muted-foreground/60 group-open:rotate-180 transition-transform">▾</span>
        </summary>
        <div className="px-3 pb-3 pt-1 max-h-[220px] overflow-y-auto">
          <ChatMarkdown content={skill.body} />
        </div>
      </details>

      <div className="flex items-center gap-2 pt-1">
        {inst ? (
          <button
            onClick={() => {
              remove(skill.id);
              toast({ title: `${skill.name} removed`, description: "It won't be used in new conversations." });
            }}
            className="h-8 px-3.5 rounded-full glass border border-glass text-[12px] font-medium hover:bg-accent/60 transition-colors inline-flex items-center gap-1.5"
          >
            <Minus className="w-3 h-3" /> Remove from AI
          </button>
        ) : (
          <button
            onClick={() => {
              add(skill.id);
              toast({ title: `${skill.name} added to your AI`, description: "The skill is now available in every conversation." });
            }}
            className="h-8 px-3.5 rounded-full bg-foreground text-background text-[12px] font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
          >
            <Plus className="w-3 h-3" /> Add to AI
          </button>
        )}
        <span className="text-[10.5px] text-muted-foreground/60 ml-auto">
          {skill.usage.toLocaleString()} installs
        </span>
      </div>
    </div>
  );
};

export default SkillResultCard;