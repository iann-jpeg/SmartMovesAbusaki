import { site } from "@/config/site";

interface LogoProps {
  variant?: "light" | "dark";
  showTagline?: boolean;
  className?: string;
}

export function Logo({ variant = "light", showTagline = false, className = "" }: LogoProps) {
  const wordmarkColor = variant === "dark" ? "#FFFFFF" : "#0B2347";
  const subColor = variant === "dark" ? "#C9D4E5" : "#667085";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/smartmoves-logo.png"
        alt=""
        aria-hidden="true"
        className="h-12 w-12 shrink-0 rounded-md bg-white object-contain"
      />
      <span className="flex flex-col leading-tight">
        <span
          className="font-heading font-800 text-lg font-extrabold tracking-tight"
          style={{ color: wordmarkColor }}
        >
          SmartMoves
        </span>
        <span
          className="text-[0.6rem] font-semibold uppercase tracking-[0.14em]"
          style={{ color: subColor }}
        >
          {showTagline ? site.tagline : "Abusaki Group Limited"}
        </span>
      </span>
    </span>
  );
}
