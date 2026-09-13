import { useState, useRef, useEffect } from "react";
import { Upload, Download, ImageIcon, Loader2, ChevronDown, Check, Wand2, Layers, Zap, ArrowLeftRight, StopCircle } from "lucide-react";
import BeforeAfterSlider from "../BeforeAfterSlider";

const StepDot = ({ active, label }: { active: boolean; label: string }) => (
  <span className="flex items-center gap-1">
    <span
      className={`w-1.5 h-1.5 rounded-full transition-colors ${
        active ? "bg-primary" : "bg-muted-foreground/30"
      }`}
    />
    <span className={active ? "text-foreground/70" : ""}>{label}</span>
  </span>
);

const models = [
  { id: "general-real", label: "General Photo (Real-ESRGAN)", desc: "Best for real-world photographs" },
  { id: "general-fast", label: "General Photo (Fast Real-ESRGAN)", desc: "Faster, slightly lower fidelity" },
  { id: "remacri", label: "General Photo (Remacri)", desc: "Crisp natural details" },
  { id: "ultramix", label: "General Photo (Ultramix Balanced)", desc: "Balanced sharpness & smoothness" },
  { id: "ultrasharp", label: "General Photo (Ultrasharp)", desc: "Maximum sharpness for prints" },
  { id: "digital-art", label: "Digital Art", desc: "Optimized for illustrations & paintings" },
  { id: "manga", label: "2x_mangascale", desc: "Tuned for manga & line art" },
];

const scales = [2, 3, 4, 6, 8];

const UpscaleView = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [model, setModel] = useState(models[5]);
  const [modelOpen, setModelOpen] = useState(false);
  const [scale, setScale] = useState(4);
  const [doubleUpscale, setDoubleUpscale] = useState(false);
  const [batch, setBatch] = useState(false);
  const [outputFolder, setOutputFolder] = useState("Defaults to image's path");
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "analyze" | "infer" | "refine" | "done">("idle");
  const [showCompare, setShowCompare] = useState(true);

  useEffect(() => {
    if (!processing) return;
    setProgress(0);
    setPhase("analyze");
    const start = performance.now();
    const total = 2400;
    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - start;
      const p = Math.min(100, (elapsed / total) * 100);
      setProgress(p);
      if (p < 30) setPhase("analyze");
      else if (p < 75) setPhase("infer");
      else setPhase("refine");
      if (elapsed < total) raf = requestAnimationFrame(tick);
      else {
        setPhase("done");
        setProcessing(false);
        setDone(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [processing]);

  const handleFile = (file?: File) => {
    if (!file) return;
    setImageName(file.name);
    setImageUrl(URL.createObjectURL(file));
    setDone(false);
    setPhase("idle");
    setProgress(0);
  };

  const handleUpscay = () => {
    if (!imageUrl) return;
    setDone(false);
    setProcessing(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
      {/* Steps panel */}
      <div className="glass rounded-2xl border border-glass shadow-float p-5 space-y-5 self-start">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-widest">Workflow</p>
          <button
            onClick={() => setBatch(!batch)}
            className={`flex items-center gap-1.5 text-[11px] font-medium px-2 py-1 rounded-full transition-colors ${
              batch ? "bg-primary/15 text-primary" : "bg-muted/50 text-muted-foreground/60 hover:bg-muted"
            }`}
          >
            <Layers className="w-3 h-3" /> Batch
          </button>
        </div>

        {/* Step 1 */}
        <div>
          <p className="text-[11px] font-semibold text-foreground/80 mb-1.5">Step 1</p>
          <input
            type="file"
            accept="image/*"
            ref={fileInput}
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <button
            onClick={() => fileInput.current?.click()}
            className="w-full px-4 py-2.5 rounded-xl bg-accent/60 hover:bg-accent text-foreground/80 text-[12px] font-medium transition-colors flex items-center gap-2"
          >
            <Upload className="w-3.5 h-3.5" /> Select Image
          </button>
          {imageName && (
            <p className="text-[10px] text-muted-foreground/60 mt-1.5 truncate">{imageName}</p>
          )}
        </div>

        {/* Step 2 */}
        <div>
          <p className="text-[11px] font-semibold text-foreground/80 mb-1.5">Step 2</p>
          <p className="text-[11px] text-muted-foreground/60 mb-1.5">Select Model</p>
          <div className="relative">
            <button
              onClick={() => setModelOpen(!modelOpen)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-accent/60 hover:bg-accent text-left text-[12px] text-foreground/80 transition-colors flex items-center justify-between"
            >
              <span className="truncate">{model.label}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground/60 transition-transform ${modelOpen ? "rotate-180" : ""}`} />
            </button>
            {modelOpen && (
              <div className="absolute top-full mt-1.5 left-0 right-0 z-50 glass-strong rounded-xl border border-glass shadow-float overflow-hidden animate-float-in max-h-[280px] overflow-y-auto">
                {models.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { setModel(m); setModelOpen(false); }}
                    className={`w-full text-left px-3.5 py-2.5 transition-colors ${
                      m.id === model.id ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    }`}
                  >
                    <p className="text-[12px] font-medium">{m.label}</p>
                    <p className="text-[10px] text-muted-foreground/60">{m.desc}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          <label className="flex items-center gap-2 mt-3 cursor-pointer">
            <button
              onClick={() => setDoubleUpscale(!doubleUpscale)}
              className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${
                doubleUpscale ? "bg-primary border-primary" : "border-border bg-transparent"
              }`}
            >
              {doubleUpscale && <Check className="w-3 h-3 text-primary-foreground" />}
            </button>
            <span className="text-[11px] text-muted-foreground/70">Double Upscayl</span>
          </label>

          <div className="mt-3">
            <p className="text-[11px] text-muted-foreground/60 mb-1.5">Image Scale ({scale}x)</p>
            <div className="flex items-center gap-1.5">
              {scales.map((s) => (
                <button
                  key={s}
                  onClick={() => setScale(s)}
                  className={`flex-1 h-8 rounded-lg text-[11px] font-medium transition-all ${
                    s === scale
                      ? "gradient-accent text-primary-foreground shadow-glow-accent"
                      : "bg-accent/50 text-muted-foreground/70 hover:bg-accent"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div>
          <p className="text-[11px] font-semibold text-foreground/80 mb-1.5">Step 3</p>
          <p className="text-[11px] text-muted-foreground/60 mb-1.5">{outputFolder}</p>
          <button
            onClick={() => setOutputFolder("~/Pictures/Rivinity")}
            className="w-full px-4 py-2.5 rounded-xl bg-accent/60 hover:bg-accent text-foreground/80 text-[12px] font-medium transition-colors"
          >
            Set Output Folder
          </button>
        </div>

        {/* Step 4 */}
        <div>
          <p className="text-[11px] font-semibold text-foreground/80 mb-1.5">Step 4</p>
          <button
            onClick={handleUpscay}
            disabled={!imageUrl || processing}
            className="w-full px-4 py-2.5 rounded-xl gradient-accent text-primary-foreground text-[13px] font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {processing ? (
              <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Upscaling…</>
            ) : (
              <><Wand2 className="w-3.5 h-3.5" /> Upscale</>
            )}
          </button>
        </div>
      </div>

      {/* Preview area */}
      <div className="glass rounded-2xl border border-glass shadow-float min-h-[460px] flex items-center justify-center relative overflow-hidden">
        {!imageUrl && (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]); }}
            className="text-center px-8 py-12 max-w-[420px]"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl gradient-accent flex items-center justify-center shadow-glow-accent">
              <ImageIcon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-[15px] font-semibold text-foreground/90">Select an Image to Enhance</h3>
            <p className="text-[12px] text-muted-foreground/60 mt-1.5">
              Select or drag and drop a PNG, JPG, JPEG or WEBP image.
            </p>
            <button
              onClick={() => fileInput.current?.click()}
              className="mt-5 px-4 py-2 rounded-full bg-accent/70 hover:bg-accent text-[12px] font-medium text-foreground/80 transition-colors"
            >
              Rivinity Enhance v1.0
            </button>
          </div>
        )}

        {imageUrl && (
          <div className="w-full h-full p-5">
            {/* Blurred backdrop */}
            <div
              className="absolute inset-0 opacity-30 blur-2xl"
              style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
            />
            <div className="relative w-full h-full flex items-center justify-center">
              <img src={imageUrl} alt="preview" className="max-h-[420px] max-w-full rounded-xl shadow-float object-contain" />

              {/* Comparison surface (also used as static preview when idle) */}
              {done && showCompare ? (
                <BeforeAfterSlider
                  before={imageUrl}
                  after={imageUrl}
                  className="max-h-[420px] aspect-[4/3] shadow-float"
                />
              ) : (
                <img
                  src={imageUrl}
                  alt="preview"
                  className={`max-h-[420px] max-w-full rounded-xl shadow-float object-contain transition-all duration-500 ${
                    processing ? "opacity-70" : ""
                  }`}
                />
              )}

              {/* Processing overlay — calm, telemetry-style */}
              {processing && (
                <div className="absolute inset-x-0 bottom-5 flex justify-center pointer-events-none">
                  <div className="pointer-events-auto glass-strong rounded-2xl border border-glass shadow-float px-5 py-4 w-[min(420px,90%)] animate-float-in">
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 animate-ping" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                        </span>
                        <p className="text-[12px] font-semibold text-foreground/90 tracking-tight">
                          {phase === "analyze" && "Analyzing image structure"}
                          {phase === "infer" && `Running ${model.label}`}
                          {phase === "refine" && "Refining edges & detail"}
                          {phase === "done" && "Complete"}
                        </p>
                      </div>
                      <span className="text-[10.5px] font-mono text-muted-foreground/70 tabular-nums">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <div className="h-1 w-full rounded-full bg-accent/50 overflow-hidden">
                      <div
                        className="h-full gradient-accent transition-[width] duration-150 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground/70">
                        <StepDot active={phase === "analyze" || progress > 0} label="Analyze" />
                        <StepDot active={phase === "infer" || progress > 30} label="Infer" />
                        <StepDot active={phase === "refine" || progress > 75} label="Refine" />
                      </div>
                      <button
                        onClick={() => { setProcessing(false); setProgress(0); setPhase("idle"); }}
                        className="flex items-center gap-1 text-[10.5px] font-medium text-muted-foreground/70 hover:text-foreground transition-colors"
                      >
                        <StopCircle className="w-3 h-3" /> Stop
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {done && !processing && (
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-glass text-[11px] font-medium text-foreground/80">
                    <Zap className="w-3 h-3 text-primary" /> {scale}x · {model.label.split("(")[0].trim()}
                  </div>
                  <button
                    onClick={() => setShowCompare((v) => !v)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-glass text-[11px] font-medium text-foreground/80 hover:bg-accent/50 transition-colors"
                  >
                    <ArrowLeftRight className="w-3 h-3" /> {showCompare ? "Result only" : "Compare"}
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full gradient-accent text-primary-foreground text-[11px] font-semibold shadow-glow-accent hover:opacity-90 transition-opacity">
                    <Download className="w-3 h-3" /> Download
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpscaleView;
