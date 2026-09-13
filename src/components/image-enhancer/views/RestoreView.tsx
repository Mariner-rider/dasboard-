import { useState, useRef } from "react";
import { Upload, Sparkles, Wand2, ImageIcon, Loader2, Download } from "lucide-react";

const presets = [
  { id: "face", label: "Face Restore", desc: "Bring blurry faces back to life" },
  { id: "denoise", label: "Denoise", desc: "Remove grain & compression artifacts" },
  { id: "deblur", label: "Deblur", desc: "Sharpen out-of-focus images" },
  { id: "colorize", label: "Colorize", desc: "Add color to black & white photos" },
];

const RestoreView = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [active, setActive] = useState(presets[0].id);
  const [strength, setStrength] = useState(70);
  const [processing, setProcessing] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
      <div className="glass rounded-2xl border border-glass shadow-float p-5 space-y-4 self-start">
        <div>
          <p className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-widest mb-2">Restore Mode</p>
          <div className="space-y-1.5">
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl transition-colors ${
                  active === p.id ? "bg-accent text-foreground" : "hover:bg-accent/50 text-muted-foreground"
                }`}
              >
                <p className="text-[12px] font-medium">{p.label}</p>
                <p className="text-[10px] text-muted-foreground/60">{p.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] text-muted-foreground/60 mb-1.5">Strength ({strength}%)</p>
          <input
            type="range"
            min={0}
            max={100}
            value={strength}
            onChange={(e) => setStrength(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <input type="file" accept="image/*" ref={fileInput} className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) setImageUrl(URL.createObjectURL(f)); }} />

        <button
          onClick={() => fileInput.current?.click()}
          className="w-full px-4 py-2.5 rounded-xl bg-accent/60 hover:bg-accent text-foreground/80 text-[12px] font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Upload className="w-3.5 h-3.5" /> Upload Image
        </button>

        <button
          onClick={() => { if (!imageUrl) return; setProcessing(true); setTimeout(() => setProcessing(false), 1500); }}
          disabled={!imageUrl || processing}
          className="w-full px-4 py-2.5 rounded-xl gradient-accent text-primary-foreground text-[13px] font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-40"
        >
          {processing ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Restoring…</> : <><Wand2 className="w-3.5 h-3.5" /> Restore</>}
        </button>
      </div>

      <div className="glass rounded-2xl border border-glass shadow-float min-h-[460px] flex items-center justify-center p-5 relative overflow-hidden">
        {!imageUrl ? (
          <div className="text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl gradient-accent flex items-center justify-center shadow-glow-accent">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-[15px] font-semibold text-foreground/90">Restore Your Photo</h3>
            <p className="text-[12px] text-muted-foreground/60 mt-1.5 max-w-[320px]">
              Upload a damaged, blurry, or faded image and let Rivinity bring it back to life.
            </p>
          </div>
        ) : (
          <>
            <div className="absolute inset-0 opacity-20 blur-2xl" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "cover" }} />
            <img src={imageUrl} alt="restore" className="relative max-h-[420px] max-w-full rounded-xl shadow-float object-contain" />
            {!processing && (
              <button className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full gradient-accent text-primary-foreground text-[11px] font-semibold shadow-glow-accent">
                <Download className="w-3 h-3" /> Download
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RestoreView;
