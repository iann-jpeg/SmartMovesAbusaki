import { Seo } from "@/components/Seo";
import { SectionHeading } from "@/components/SectionHeading";
import { ShieldCheck, Lightbulb, ClipboardCheck, BookOpen, Target, Users, TrendingUp } from "lucide-react";

const values = [
  { icon: ShieldCheck, name: "Integrity" },
  { icon: Lightbulb, name: "Innovation" },
  { icon: ClipboardCheck, name: "Accountability" },
  { icon: BookOpen, name: "Continuous learning" },
  { icon: Target, name: "Practical impact" },
  { icon: Users, name: "Collaboration" },
  { icon: TrendingUp, name: "Sustainable growth" },
];

const structure = [
  {
    name: "SmartMoves Abusaki Group Limited",
    role: "Parent-company brand",
    text: "The parent-company brand being developed to provide a long-term structure for business development, coordination and future expansion.",
  },
  {
    name: "SMART MOVES DEVELOPMENT AGENCY",
    role: "Existing operating business",
    text: "The existing operating business associated with the SmartMoves identity, providing the foundation for current business activities and service development.",
  },
  {
    name: "SmartMoves Books",
    role: "Publishing brand",
    text: "The publishing brand focused on educational publishing and the development of revision and learning resources.",
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Us | SmartMoves Abusaki Group Limited"
        description="Learn about SmartMoves Abusaki Group Limited — our vision, mission, values and group structure as a Kenyan business group."
        path="/about"
      />

      <section className="border-b border-border bg-secondary/60 py-16 sm:py-20">
        <div className="section-container">
          <SectionHeading
            as="h1"
            eyebrow="About Us"
            title="Who We Are"
            description="SmartMoves Abusaki Group Limited is a Kenyan parent-company brand being developed around technology, publishing, education and business development. We exist to turn practical ideas into dependable products and services."
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="section-container grid gap-6 md:grid-cols-2">
          <div className="card-surface border-t-4 border-t-accent p-8">
            <h2 className="font-heading text-xl font-bold text-primary">Our Vision</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              To build a sustainable group of businesses that transforms ideas into practical
              solutions and creates opportunities for people, organizations and communities.
            </p>
          </div>
          <div className="card-surface border-t-4 border-t-gold p-8">
            <h2 className="font-heading text-xl font-bold text-primary">Our Mission</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              To develop useful products and services, expand access to knowledge, apply
              technology to real-world challenges and pursue responsible business growth through
              innovation and collaboration.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/60 py-16 sm:py-20">
        <div className="section-container">
          <SectionHeading
            eyebrow="What Guides Us"
            title="Our Core Values"
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {values.map((v) => (
              <li key={v.name} className="card-surface flex items-center gap-3 px-5 py-4">
                <v.icon className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                <span className="text-sm font-semibold text-foreground">{v.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="section-container max-w-3xl">
          <SectionHeading
            eyebrow="How We Work"
            title="Our Business Philosophy"
          />
          <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              We believe lasting businesses are built by solving real problems for real people.
              Every venture we pursue starts with a genuine need — not a trend — and is developed
              with the discipline to become a dependable product or service.
            </p>
            <p>
              We hold ourselves to professional standards in everything we publish, build and
              deliver. We prefer steady, consistent execution over bold claims, and we grow by
              earning trust one engagement at a time.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/60 py-16 sm:py-20">
        <div className="section-container">
          <SectionHeading
            eyebrow="Our Structure"
            title="Our Group Structure"
            description="SmartMoves Abusaki Group Limited is being developed as a parent-company brand. The relationships below describe the current identity structure; formal ownership and subsidiary arrangements will be communicated as they are legally established."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {structure.map((s) => (
              <article key={s.name} className="card-surface p-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">{s.role}</p>
                <h3 className="mt-2 font-heading text-lg font-bold text-primary">{s.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
