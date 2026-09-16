import { USER } from "@/lib/profile";

function greetingForNow(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Good Morning";
  if (h >= 12 && h < 17) return "Good Afternoon";
  if (h >= 17 && h < 22) return "Good Evening";
  return "Good Night";
}

/** Greeting with background watermark */
export function ChatEmptyState() {
  const firstName = USER.name.split(" ")[0];

  return (
    <div className="relative flex flex-col items-center justify-center text-center select-none w-full mx-auto">
      {/* Background Mandala Watermark - Exactly centered from left and right */}
      <div
        className="absolute pointer-events-none select-none z-0"
        style={{
          top: "calc(50% + 3cm)",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src="/watermark.png"
          alt=""
          className="w-[660px] h-[660px] sm:w-[780px] sm:h-[780px] max-w-none object-contain opacity-[0.035] dark:opacity-[0.03]"
        />
      </div>

      {/* Foreground Content - Kept at current vertical position, perfectly centered left & right */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-3xl mx-auto px-4"
        style={{ transform: "translateY(3cm)" }}
      >
        {/* Tagline - Increased to text-sm sm:text-base */}
        <p className="text-sm sm:text-base font-semibold tracking-[0.24em] text-gray-400 dark:text-zinc-500 uppercase mb-3.5 text-center w-full">
          THINK • RESEARCH • BUILD
        </p>

        {/* Greeting - Increased to text-5xl sm:text-6xl */}
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight mb-2.5 text-center w-full">
          {greetingForNow()}{" "}
          <span className="text-[#FF5500]">{firstName}</span>
        </h1>

        {/* Subtitle - Increased to text-lg sm:text-xl */}
        <p className="text-lg sm:text-xl text-gray-500 dark:text-zinc-400 font-normal tracking-normal text-center w-full">
          How can I help you today?
        </p>
      </div>
    </div>
  );
}

export default ChatEmptyState;