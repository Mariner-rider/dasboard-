import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Upload, FileAudio, Copy, Download, Globe, ChevronDown, Trash2, CheckCircle } from "lucide-react";

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "ja", label: "Japanese", flag: "🇯🇵" },
  { code: "hi", label: "Hindi", flag: "🇮🇳" },
  { code: "ar", label: "Arabic", flag: "🇸🇦" },
  { code: "id", label: "Indonesian", flag: "🇮🇩" },
];

const sampleTranscript = [
  { speaker: "Speaker 1", text: "Welcome to the customer in a friendly and calm tone.", time: "0:00", color: "text-primary" },
  { speaker: "Speaker 1", text: "Sound professional, warm, and reassuring, like a helpful support agent who is happy to assist.", time: "0:04", color: "text-primary" },
  { speaker: "Speaker 2", text: "Speak clearly with a natural pace, not too fast and not too slow.", time: "0:09", color: "text-secondary" },
  { speaker: "Speaker 1", text: "Thank you for reaching out. I'm here to help you with any questions or concerns you might have today.", time: "0:14", color: "text-primary" },
];



const SpeechToTextView = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasTranscript, setHasTranscript] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [diarize, setDiarize] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<string | null>("meeting_recording.wav");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeMode, setActiveMode] = useState<"record" | "upload">("upload");
  const [liveWaveform, setLiveWaveform] = useState<number[]>(Array(48).fill(8));
  const recordingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const stopRecordingTimer = () => {
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (audioContextRef.current) {
      void audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyserRef.current = null;
  };

  const stopRecording = (showTranscript = true) => {
    stopRecordingTimer();
    setIsRecording(false);
    setRecordingTime(0);
    setLiveWaveform(Array(48).fill(8));
    if (showTranscript) {
      setHasTranscript(true);
    }
  };

  useEffect(() => {
    return () => stopRecordingTimer();
  }, []);

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const AudioContextClass =
        window.AudioContext ||
        (window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }).webkitAudioContext;

      if (!AudioContextClass) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      const audioContext = new AudioContextClass();
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      mediaStreamRef.current = stream;
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      setRecordingTime(0);
      setLiveWaveform(Array(48).fill(8));
      setIsRecording(true);
      setHasTranscript(false);

      const frequencyData = new Uint8Array(analyser.frequencyBinCount);

      const updateWaveform = () => {
        if (!analyserRef.current) return;

        analyserRef.current.getByteFrequencyData(frequencyData);

        const barCount = 48;
        const bars: number[] = [];

        for (let i = 0; i < barCount; i++) {
          const startIndex = Math.floor(
            (i / barCount) * frequencyData.length
          );
          const endIndex = Math.max(
            startIndex + 1,
            Math.floor(((i + 1) / barCount) * frequencyData.length)
          );

          let sum = 0;
          for (let j = startIndex; j < endIndex; j++) {
            sum += frequencyData[j];
          }

          const average = sum / (endIndex - startIndex);
          bars.push(Math.max(8, (average / 255) * 94));
        }

        setLiveWaveform(bars);
        animationFrameRef.current = requestAnimationFrame(updateWaveform);
      };

      animationFrameRef.current = requestAnimationFrame(updateWaveform);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((time) => {
          if (time >= 10) {
            stopRecording();
            return 0;
          }
          return time + 1;
        });
      }, 1000);
    } catch {
      setIsRecording(false);
      setRecordingTime(0);
      setLiveWaveform(Array(48).fill(8));
    }
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="w-full max-w-[900px] mx-auto space-y-5 sm:space-y-6 md:space-y-7 px-3 sm:px-4 md:px-0">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold tracking-[-0.025em] text-foreground/90">Speech to Text</h2>
        <p className="text-[14px] leading-5 text-muted-foreground/60 mt-1.5">Transcribe audio with speaker diarization and event tagging</p>
      </div>

      {/* Mode switcher */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveMode("record")}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
            activeMode === "record"
              ? "bg-background/80 border border-border/40 shadow-sm text-foreground"
              : "text-muted-foreground/50 hover:text-foreground/80 hover:bg-background/50"
          }`}
        >
          <Mic className="w-4 h-4" />
          Record
        </button>
        <button
          onClick={() => {
            if (isRecording) {
              stopRecording(true);
            } else {
              setHasTranscript(true);
            }
            setActiveMode("upload");
          }}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
            activeMode === "upload"
              ? "bg-background/80 border border-border/40 shadow-sm text-foreground"
              : "text-muted-foreground/50 hover:text-foreground/80 hover:bg-background/50"
          }`}
        >
          <Upload className="w-4 h-4" />
          Upload File
        </button>
      </div>

      {/* Input area */}
      <div className="glass rounded-[22px] border border-glass shadow-float p-5 md:p-7">
        {activeMode === "record" ? (
          <div className="min-h-[320px] flex flex-col items-center justify-center py-10 md:py-12">
            {/* Interactive recording visual */}
            <div className="relative flex items-center justify-center">
              {isRecording && (
                <>
                  <span className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-destructive/20 animate-ping" />
                  <span className="absolute w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-destructive/10 animate-pulse" />
                  <span className="absolute w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-destructive/5 animate-pulse" />
                </>
              )}

              <button
                onClick={toggleRecording}
                aria-label={isRecording ? "Stop recording" : "Start recording"}
                className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center transition-all duration-300 border ${
                  isRecording
                    ? "bg-destructive/10 border-destructive/30 shadow-[0_0_50px_rgba(239,68,68,0.22)] scale-105"
                    : "glass border-glass hover:shadow-glow-accent hover:scale-[1.03]"
                }`}
              >
                <span className={`absolute inset-2 rounded-full ${isRecording ? "border border-destructive/10" : ""}`} />
                {isRecording ? (
                  <MicOff className="relative w-8 h-8 text-destructive" />
                ) : (
                  <Mic className="relative w-8 h-8 text-primary" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 mt-5">
              {isRecording && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 border border-destructive/10 px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-destructive">Live</span>
                </span>
              )}
              <p className={`text-[13px] font-medium ${isRecording ? "text-foreground/80" : "text-foreground/70"}`}>
                {isRecording ? "Recording..." : "Click to start recording"}
              </p>
            </div>

            {isRecording ? (
              <>
                <div className="w-full max-w-[560px] mt-5">
                  <div className="flex items-center justify-center h-28 w-full px-4 sm:px-6 rounded-2xl bg-muted/50 border border-border/20 overflow-hidden">
                    <div className="flex items-center justify-center gap-[3px] w-full h-full">
                      {liveWaveform.map((height, i) => (
                        <span
                          key={i}
                          className="w-[4px] sm:w-[5px] rounded-full bg-border transition-[height] duration-75"
                          style={{ height: `${Math.max(8, height)}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-2 rounded-full bg-background/60 border border-border/30 px-3 py-1">
                  <span className="text-[12px] text-foreground/65 font-mono tabular-nums">
                    {formatTime(recordingTime)}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground/40 mt-2">Click the mic to stop</span>
              </>
            ) : (
              <span className="text-[11px] text-muted-foreground/40 mt-2">Ready when you are</span>
            )}
          </div>
        ) : (
          <div>
            {uploadedFile ? (
              <div className="flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-accent/40 border border-border/30 shadow-sm transition-colors hover:bg-accent/50">
                <FileAudio className="w-8 h-8 text-primary" />
                <div className="flex-1">
                  <p className="text-[13px] font-medium text-foreground">{uploadedFile}</p>
                  <p className="text-[11px] text-muted-foreground/50">2.4 MB · WAV · 1:32</p>
                </div>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="min-h-[260px] flex flex-col items-center justify-center border-2 border-dashed border-border/40 rounded-2xl px-6 py-12 text-center cursor-pointer hover:border-primary/30 hover:bg-accent/30 transition-all duration-200"
              >
                <Upload className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-[13px] text-foreground/70 font-medium">Drop audio file or click to upload</p>
                <p className="text-[11px] text-muted-foreground/40 mt-1">Supports MP3, WAV, M4A, FLAC · Max 100MB</p>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="audio/*" className="hidden" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setUploadedFile(file.name);
            }} />
          </div>
        )}

        {/* Options row */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 md:gap-4 mt-6 pt-6 border-t border-border/30">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-accent/50 hover:bg-accent transition-colors text-[13px]"
            >
              <Globe className="w-3.5 h-3.5 text-muted-foreground/60" />
              <span className="text-foreground/70 font-medium">{selectedLanguage.flag} {selectedLanguage.label}</span>
              <ChevronDown className={`w-3 h-3 text-muted-foreground/50 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {langDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 z-50 glass-strong rounded-xl border border-glass shadow-float overflow-hidden animate-float-in min-w-[180px]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] transition-colors ${
                      lang.code === selectedLanguage.code
                        ? "bg-accent text-foreground font-medium"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    }`}
                  >
                    <span>{lang.flag}</span> {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Diarization toggle */}
          <button
            onClick={() => setDiarize(!diarize)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors ${
              diarize ? "bg-secondary/10 text-secondary" : "bg-muted/50 text-muted-foreground/50"
            }`}
          >
            <div className={`w-7 h-4 rounded-full transition-colors relative ${diarize ? "bg-secondary" : "bg-muted-foreground/20"}`}>
              <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${diarize ? "left-3.5" : "left-0.5"}`} />
            </div>
            Speaker Detection
          </button>

          {/* Transcribe button */}
          <button
            onClick={() => {
              if (isRecording) {
                stopRecording(false);
              }
              setHasTranscript(true);
            }}
            className="w-full sm:w-auto sm:ml-auto px-6 py-2.5 rounded-xl gradient-accent text-primary-foreground text-[13px] font-semibold shadow-sm hover:opacity-90 hover:shadow-md transition-all duration-200"
          >
            Transcribe
          </button>
        </div>
      </div>

      {/* Transcript output */}
      {hasTranscript && (
        <div className="glass rounded-2xl border border-glass shadow-float overflow-hidden animate-float-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 md:px-7 py-5 border-b border-border/30">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <h3 className="text-[14px] font-semibold text-foreground/80">Transcript</h3>
            </div>
            <div className="flex items-center gap-1 self-end sm:self-auto">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] text-muted-foreground/50 hover:text-foreground hover:bg-accent/50 transition-all">
                <Copy className="w-3 h-3" /> Copy
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] text-muted-foreground/50 hover:text-foreground hover:bg-accent/50 transition-all">
                <Download className="w-3 h-3" /> Export
              </button>
            </div>
          </div>
          <div className="px-5 md:px-7 py-6 space-y-6">
            {sampleTranscript.map((seg, i) => (
              <div key={i} className="flex gap-4 md:gap-7">
                <div className="shrink-0 pt-0.5">
                  <span className={`text-[11px] font-semibold ${seg.color}`}>{seg.speaker}</span>
                  <p className="text-[10px] text-muted-foreground/40 font-mono mt-0.5">{seg.time}</p>
                </div>
                <p className="text-[13px] sm:text-[14px] md:text-[15px] text-foreground/75 leading-6 sm:leading-7 min-w-0">{seg.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeechToTextView;
