import React, { useState, useEffect } from "react";
import { Moon, Sparkles } from "lucide-react";
import { USER } from "@/lib/profile";

interface ChatEmptyStateProps {
  /** Optional override to preview/test the night effect at any time */
  forceNight?: boolean;
}

/** Determines greeting and whether it is night time */
function getGreetingInfo(hour: number): { greeting: string; isNight: boolean } {
  if (hour >= 5 && hour < 12) return { greeting: "Good Morning", isNight: false };
  if (hour >= 12 && hour < 17) return { greeting: "Good Afternoon", isNight: false };
  if (hour >= 17 && hour < 21) return { greeting: "Good Evening", isNight: false };
  return { greeting: "Good Night", isNight: true };
}

// Background celestial stars for the night effect
const STARS = [
  { top: "12%", left: "18%", size: 2, delay: "0s", duration: "3s" },
  { top: "16%", left: "78%", size: 2.5, delay: "0.8s", duration: "2.4s" },
  { top: "26%", left: "12%", size: 1.5, delay: "1.5s", duration: "3.2s" },
  { top: "22%", left: "32%", size: 2, delay: "0.3s", duration: "2.8s" },
  { top: "32%", left: "86%", size: 3, delay: "1.1s", duration: "3.5s" },
  { top: "44%", left: "16%", size: 2, delay: "2.0s", duration: "2.6s" },
  { top: "50%", left: "82%", size: 1.5, delay: "0.5s", duration: "3.1s" },
  { top: "66%", left: "20%", size: 2.5, delay: "1.7s", duration: "2.9s" },
  { top: "70%", left: "76%", size: 2, delay: "0.2s", duration: "3.4s" },
  { top: "80%", left: "32%", size: 1.5, delay: "1.4s", duration: "2.7s" },
  { top: "78%", left: "68%", size: 2, delay: "2.2s", duration: "3.0s" },
  { top: "24%", left: "68%", size: 2, delay: "1.9s", duration: "2.5s" },
];

/** Greeting with background watermark and working Night Effect */
export function ChatEmptyState({ forceNight = false }: ChatEmptyStateProps) {
  const firstName = USER.name.split(" ")[0];

  // Dynamic time calculation (avoids SSR hydration mismatch and keeps time updated)
  const [greetingInfo, setGreetingInfo] = useState(() => {
    if (forceNight) return { greeting: "Good Night", isNight: true };
    if (typeof window === "undefined") return { greeting: "Good Morning", isNight: false };
    return getGreetingInfo(new Date().getHours());
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window !== "undefined") return window.innerWidth >= 1024;
    return true;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (forceNight) {
      setGreetingInfo({ greeting: "Good Night", isNight: true });
      return;
    }

    // Update greeting on mount and refresh every 60s
    const update = () => {
      setGreetingInfo(getGreetingInfo(new Date().getHours()));
    };
    update();
    const interval = setInterval(update, 60000);

    // Detect dark mode / night theme on documentElement
    const checkDark = () => {
      setIsDarkMode(
        document.documentElement.classList.contains("dark") ||
        document.body.classList.contains("dark")
      );
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [forceNight]);

  // Night effect triggers when it's night time (9PM-5AM), when forceNight is set, or in dark mode
  const isNight = greetingInfo.isNight || forceNight;
  const showNightAtmosphere = isNight || isDarkMode;

  return (
    <div className="relative flex flex-col items-center justify-center text-center select-none w-full mx-auto">
      {/* Dynamic Keyframe Animations for the Night Effect */}
      <style>{`
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.85); }
          50% { opacity: 0.95; transform: scale(1.3); filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.9)); }
        }
        @keyframes moonGlow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.5)); transform: scale(1); }
          50% { filter: drop-shadow(0 0 18px rgba(251, 191, 36, 0.85)); transform: scale(1.04); }
        }
      `}</style>

      {/* Night Sky Twinkling Stars Effect */}
      {showNightAtmosphere && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 transition-opacity duration-1000 opacity-90 dark:opacity-100">
          {STARS.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-amber-100 dark:bg-white"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animation: `starTwinkle ${star.duration} ease-in-out infinite`,
                animationDelay: star.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Background Mandala Watermark - Exactly centered from left and right */}
      <div
        className="absolute pointer-events-none select-none z-0 flex items-center justify-center overflow-visible"
        style={{
          top: isDesktop ? "calc(50% + 3cm)" : "50%",
          left: "50%",
          transform: "translate3d(-50%, -50%, 0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
          contain: "layout paint",
        }}
      >
        {/* Soft Ambient Moonlit Halo behind Mandala during Night / Dark mode */}
        {showNightAtmosphere && (
          <div
            className="absolute rounded-full pointer-events-none transition-all duration-300"
            style={{
              width: isDesktop ? "520px" : "320px",
              height: isDesktop ? "520px" : "320px",
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(255, 85, 0, 0.03) 40%, transparent 70%)",
              transform: "translateZ(0)",
            }}
          />
        )}

        <img
          src="/watermark.png"
          alt=""
          draggable={false}
          decoding="async"
          loading="eager"
          className={`w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] md:w-[660px] md:h-[660px] lg:w-[780px] lg:h-[780px] max-w-[90vw] sm:max-w-none object-contain pointer-events-none select-none transition-all duration-300 ${
            showNightAtmosphere
              ? "opacity-[0.045] dark:opacity-[0.055]"
              : "opacity-[0.035] dark:opacity-[0.03]"
          }`}
          style={{
            transform: "translateZ(0)",
            WebkitTransform: "translateZ(0)",
          }}
        />
      </div>

      {/* Foreground Content - Kept at exact 3cm offset on desktop/laptop, centered cleanly on mobile */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-3xl mx-auto px-4 transition-transform duration-300"
        style={isDesktop ? { transform: "translateY(3cm)" } : undefined}
      >
        {/* Tagline - Responsive font & tracking to avoid awkward line wraps on narrow phones */}
        <p className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.16em] sm:tracking-[0.24em] text-gray-400 dark:text-zinc-500 uppercase mb-2.5 sm:mb-3.5 text-center w-full flex items-center justify-center gap-1.5 sm:gap-2">
          <span>THINK • RESEARCH • BUILD</span>
          {isNight && (
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 dark:text-amber-300 animate-pulse inline-block shrink-0" />
          )}
        </p>

        {/* Greeting - Fluid responsive typography: text-3xl on mobile, text-5xl on tablet/small laptop, text-6xl on desktop */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight mb-2 sm:mb-2.5 text-center w-full flex flex-wrap items-center justify-center">
          <span>{greetingInfo.greeting}</span>{" "}
          <span className="text-[#FF5500] ml-2">{firstName}</span>
          {/* Luminous Crescent Moon beside Good Night */}
          {isNight && (
            <span className="inline-flex items-center ml-2 sm:ml-3 align-middle shrink-0">
              <Moon 
                className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 text-amber-300 dark:text-amber-200 fill-amber-300/25 -mt-1 sm:-mt-2"
                style={{ animation: "moonGlow 3.5s ease-in-out infinite" }}
                strokeWidth={2}
              />
            </span>
          )}
        </h1>

        {/* Subtitle - Fluid responsive font */}
        <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-zinc-400 font-normal tracking-normal text-center w-full">
          How can I help you today?
        </p>
      </div>
    </div>
  );
}

export default ChatEmptyState;