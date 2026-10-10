interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}

export function SectionHeading({ eyebrow, title, description, align = "left", as = "h2" }: SectionHeadingProps) {
  const Heading = as;
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className={`mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-accent ${align === "center" ? "justify-center" : ""}`}>
          <span className="gold-rule" aria-hidden />
          {eyebrow}
        </p>
      )}
      <Heading className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </Heading>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
