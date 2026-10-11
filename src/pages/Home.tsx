import { Link } from "react-router-dom";
import {
  Cpu, BookOpen, GraduationCap, Sprout, Target, Lightbulb, BookOpenCheck, Users, ArrowRight, Handshake,
} from "lucide-react";
import { Seo } from "@/components/Seo";
import { SectionHeading } from "@/components/SectionHeading";
import { divisions, brands, heroImage, heroImageCredit, site } from "@/config/site";

const divisionIcons = [Cpu, BookOpen, GraduationCap, Sprout];

const principles = [
  { icon: Target, title: "Build With Purpose", text: "Start with real needs and practical solutions." },
  { icon: Lightbulb, title: "Innovate Responsibly", text: "Use technology thoughtfully and effectively." },
  { icon: BookOpenCheck, title: "Make Learning Accessible", text: "Create resources that support knowledge and growth." },
  { icon: Users, title: "Grow Through Collaboration", text: "Work with clients, educators, institutions and partners." },
];

const audiences = [
  "Small and growing businesses",
  "Schools and educational institutions",
  "Students and educators",
  "Entrepreneurs and innovators",
  "Organizations seeking digital solutions",
  "Potential collaborators and institutional partners",
];

const ecosystemCards = [
  { label: "Digital Solutions", shortLabel: "Technology", icon: Cpu, href: "/businesses#technology", tone: "from-[#0b5d3b] to-[#083b2a]" },
  { label: "SmartMoves Books", shortLabel: "Publishing", icon: BookOpen, href: "/smartmoves-books", tone: "from-[#c9a23f] to-[#9b7627]" },
  { label: "Workshops & Skills", shortLabel: "Education", icon: GraduationCap, href: "/workshops", tone: "from-[#1e5a8a] to-[#12395a]" },
  { label: "Future Ventures", shortLabel: "Growth", icon: Sprout, href: "/businesses#ventures", tone: "from-[#426b4c] to-[#23432e]" },
  { label: "Partner With Us", shortLabel: "Collaboration", icon: Handshake, href: "/contact?category=partnership", tone: "from-[#7c4b32] to-[#49291f]" },
];

/** Original abstract visual: connected nodes representing linked business opportunities. */
function HeroVisual() {
  return (
    <svg viewBox="0 0 480 400" className="h-auto w-full" role="img" aria-label="Abstract illustration of connected business opportunities">
      <defs>
        <linearGradient id="barGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#0B5D3B" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0B5D3B" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* upward progress bars */}
      <rect x="60" y="280" width="42" height="80" rx="6" fill="url(#barGrad)" />
      <rect x="120" y="240" width="42" height="120" rx="6" fill="url(#barGrad)" />
      <rect x="180" y="190" width="42" height="170" rx="6" fill="url(#barGrad)" />
      {/* connection lines */}
      <g stroke="#0B2347" strokeOpacity="0.25" strokeWidth="1.5">
        <line x1="120" y1="120" x2="230" y2="80" />
        <line x1="230" y1="80" x2="340" y2="130" />
        <line x1="340" y1="130" x2="410" y2="70" />
        <line x1="230" y1="80" x2="290" y2="210" />
        <line x1="120" y1="120" x2="290" y2="210" />
        <line x1="340" y1="130" x2="290" y2="210" />
        <line x1="290" y1="210" x2="200" y2="180" />
        <line x1="120" y1="120" x2="200" y2="180" />
      </g>
      {/* nodes */}
      <circle cx="120" cy="120" r="14" fill="#0B2347" />
      <circle cx="230" cy="80" r="18" fill="#0B5D3B" />
      <circle cx="340" cy="130" r="14" fill="#0B2347" />
      <circle cx="410" cy="70" r="10" fill="#C9A23F" />
      <circle cx="290" cy="210" r="12" fill="#0B5D3B" />
      <circle cx="200" cy="180" r="9" fill="#C9A23F" />
      {/* gold arc accent */}
      <path d="M80 340 A 190 190 0 0 1 430 300" fill="none" stroke="#C9A23F" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 10" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <Seo path="/" />

      {/* Hero */}
      <section
        className="relative overflow-hidden border-b border-border bg-[#0B2347] bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(11,35,71,0.96) 0%, rgba(11,35,71,0.88) 46%, rgba(11,35,71,0.58) 100%), url(${heroImage})` }}
      >
        <div className="section-container relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-gold">
              <span className="gold-rule" aria-hidden />
              Building Businesses. Creating Opportunities.
            </p>
            <h1 className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Building Ideas Into Businesses That Move People Forward.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              {site.name} is a Kenyan business group focused on developing practical solutions
              through technology, publishing, education and business development. We turn ideas
              into useful products and services that help people, organizations and communities
              move forward.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/businesses"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                Explore Our Businesses <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-md border border-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-primary"
              >
                Start a Conversation
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <HeroVisual />
          </div>
        </div>
        <a
          href={heroImageCredit.href}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-3 right-4 text-[10px] text-white/60 underline-offset-2 hover:text-white hover:underline"
        >
          {heroImageCredit.label}
        </a>
      </section>

      {/* SmartMoves ecosystem */}
      <section className="overflow-hidden bg-[#082c3d] py-16 text-white sm:py-20">
        <div className="section-container">
          <SectionHeading
            eyebrow="The SmartMoves Ecosystem"
            title="One group. Many ways to move forward."
            description="Explore the connected ideas, businesses and partnerships that shape our work."
            align="center"
            light
          />
          <div className="relative mx-auto mt-12 max-w-4xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,63,0.16),transparent_55%)]" aria-hidden />
            <div className="relative grid grid-cols-2 justify-items-center gap-x-3 gap-y-[-1rem] sm:grid-cols-6 sm:gap-x-[-1rem]">
              {ecosystemCards.map((card, index) => {
                const Icon = card.icon;
                const position = index < 3 ? "sm:col-span-2" : "sm:col-span-2 sm:col-start-2";
                return (
                  <Link
                    key={card.label}
                    to={card.href}
                    className={`group relative flex aspect-[0.96] w-full max-w-[190px] items-center justify-center overflow-hidden bg-gradient-to-br ${card.tone} p-6 text-center transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/30 focus-visible:-translate-y-2 ${position} ${index === 3 ? "sm:col-start-2" : ""} ${index === 4 ? "sm:col-start-4" : ""}`}
                    style={{ clipPath: "polygon(25% 4%, 75% 4%, 100% 25%, 100% 75%, 75% 96%, 25% 96%, 0 75%, 0 25%)" }}
                  >
                    <span className="absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,rgba(255,255,255,0.16))] opacity-70" aria-hidden />
                    <span className="relative flex flex-col items-center gap-3">
                      <Icon className="h-8 w-8 text-white/90 transition-transform group-hover:scale-110" aria-hidden />
                      <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/65">{card.shortLabel}</span>
                      <span className="font-heading text-sm font-extrabold text-white sm:text-base">{card.label}</span>
                      <span className="rounded-sm border border-white/60 px-2 py-1 text-[0.55rem] font-bold uppercase tracking-wider text-white">Explore</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Company introduction */}
      <section className="py-16 sm:py-20">
        <div className="section-container">
          <SectionHeading
            eyebrow="Who We Are"
            title="One Vision. Multiple Opportunities."
            description="SmartMoves Abusaki Group Limited is being developed as a structure for coordinating existing business activity and pursuing new opportunities across complementary sectors."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Practical innovation",
              "Responsible business growth",
              "Accessible learning",
              "Digital transformation",
              "Sustainable value creation",
              "Long-term opportunity development",
            ].map((item) => (
              <li key={item} className="card-surface flex items-center gap-3 px-5 py-4">
                <span className="h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden />
                <span className="text-sm font-medium text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Business divisions */}
      <section id="divisions" className="border-y border-border bg-secondary/60 py-16 sm:py-20">
        <div className="section-container">
          <SectionHeading
            eyebrow="What We Do"
            title="Our Business Divisions"
            description="Four connected areas of activity, each focused on practical value and long-term growth."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {divisions.map((d, i) => {
              const Icon = divisionIcons[i];
              return (
                <article key={d.id} className="card-surface flex flex-col p-6 sm:p-8">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-primary/5">
                    <Icon className="h-5 w-5 text-accent" aria-hidden />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-primary">{d.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
                  <Link
                    to={d.cta.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                  >
                    {d.cta.label} <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured brands */}
      <section className="py-16 sm:py-20">
        <div className="section-container">
          <SectionHeading
            eyebrow="Our Identity"
            title="Our Brands & Business Activities"
            description="The businesses and brands that carry the SmartMoves identity today."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {brands.map((b) => (
              <article key={b.name} className="card-surface border-t-4 border-t-gold p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">{b.label}</p>
                <h3 className="mt-2 font-heading text-xl font-bold text-primary">{b.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.description}</p>
                {b.url && (
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                  >
                    Visit website <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Our approach */}
      <section className="border-y border-border bg-primary py-16 text-primary-foreground sm:py-20">
        <div className="section-container">
          <div className="max-w-2xl">
            <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-gold">
              <span className="gold-rule" aria-hidden />
              Our Approach
            </p>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl">
              Principles That Guide Every Venture
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <div key={p.title} className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-6">
                <p.icon className="mb-4 h-6 w-6 text-gold" aria-hidden />
                <h3 className="font-heading text-base font-bold text-primary-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="py-16 sm:py-20">
        <div className="section-container grid items-start gap-10 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Who We Serve"
            title="Who We Work With"
            description="We build for the people and organizations we seek to serve — across business, education and community."
          />
          <ul className="grid gap-3">
            {audiences.map((a) => (
              <li key={a} className="flex items-center gap-3 rounded-md border border-border bg-card px-5 py-3.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                <span className="text-sm font-medium text-foreground">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Collaboration CTA */}
      <section className="border-t border-border bg-secondary/60 py-16 sm:py-20">
        <div className="section-container text-center">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
            Have an Idea Worth Moving Forward?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Whether you need a digital solution, educational resources, a practical training
            session or a conversation about a business opportunity, we would like to hear from you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Discuss Your Project
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-md border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
