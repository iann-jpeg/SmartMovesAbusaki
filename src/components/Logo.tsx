import { site } from "@/config/site";

interface LogoProps {
  variant?: "light" | "dark";
  showTagline?: boolean;
  className?: string;
}

/**
 * Placeholder SVG logo concept based on the approved direction:
 * interlocking navy "S" and forest-green "M", upward bars, restrained gold arc.
 * Replace with the final logo file when it is supplied.
 */
export function Logo({ variant = "light", showTagline = false, className = "" }: LogoProps) {
  const wordmarkColor = variant === "dark" ? "#FFFFFF" : "#0B2347";
  const subColor = variant === "dark" ? "#C9D4E5" : "#667085";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 64 64"
        role="img"
        aria-label="SmartMoves logo"
        className="shrink-0"
      >
        <rect width="64" height="64" rx="12" fill="#0B2347" />
        <path
          d="M20 44c2 3 6 5 10 5 6 0 10-3 10-8 0-9-17-7-17-14 0-3 3-5 7-5 3 0 6 1 8 3"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M34 46V26l7 12 7-12v20"
          fill="none"
          stroke="#0B5D3B"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 20a24 24 0 0 1 40 0"
          fill="none"
          stroke="#C9A23F"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
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
