import { MonitorSmartphone, Briefcase, Rocket, Wrench, Users, Building2 } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SectionHeading } from "@/components/SectionHeading";
import { EnquiryForm } from "@/components/EnquiryForm";

const themes = [
  { icon: MonitorSmartphone, name: "Digital Literacy", text: "Foundational skills for using digital tools confidently and safely." },
  { icon: Briefcase, name: "Business Technology", text: "Practical technology for running and growing a business." },
  { icon: Rocket, name: "Entrepreneurship", text: "Turning ideas into structured, sustainable ventures." },
  { icon: Wrench, name: "Productivity & Digital Tools", text: "Everyday tools and workflows that save time and improve output." },
];

const audiences = [
  { icon: Users, text: "Students and young professionals building practical skills." },
  { icon: Briefcase, text: "Entrepreneurs and small business owners." },
  { icon: Building2, text: "Schools, institutions and community groups." },
];

const formats = [
  "Short practical workshops (half-day or full-day)",
  "Multi-session training series",
  "Custom sessions for schools, institutions and groups",
];

export default function Workshops() {
  return (
    <>
      <Seo
        title="Workshops & Training | SmartMoves Abusaki Group Limited"
        description="Practical workshops and short training sessions from SmartMoves Abusaki Group Limited — digital literacy, business technology, entrepreneurship and productivity."
        path="/workshops"
      />

      <section className="border-b border-border bg-secondary/60 py-16 sm:py-20">
        <div className="section-container">
          <SectionHeading
            as="h1"
            eyebrow="Education & Capacity Building"
            title="Workshops & Practical Training"
            description="We support knowledge-sharing through workshops, short training sessions and practical learning experiences designed around real-world needs."
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="section-container">
          <SectionHeading eyebrow="Themes" title="Training Themes" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {themes.map((t) => (
              <article key={t.name} className="card-surface p-6">
                <t.icon className="mb-4 h-6 w-6 text-accent" aria-hidden />
                <h3 className="font-heading text-base font-bold text-primary">{t.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/60 py-16 sm:py-20">
        <div className="section-container grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight">Who It's For</h2>
            <ul className="mt-6 space-y-4">
              {audiences.map((a, i) => (
                <li key={i} className="flex items-start gap-3">
                  <a.icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <span className="text-sm leading-relaxed text-muted-foreground">{a.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight">Formats</h2>
            <ul className="mt-6 space-y-3">
              {formats.map((f) => (
                <li key={f} className="flex items-center gap-3 rounded-md border border-border bg-card px-5 py-3.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  <span className="text-sm font-medium text-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="section-container max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-extrabold tracking-tight">Upcoming Sessions</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            We are developing practical learning opportunities. Contact us to discuss a workshop
            or request information about upcoming sessions.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/60 py-16 sm:py-20">
        <div className="section-container max-w-3xl">
          <SectionHeading
            eyebrow="Enquire"
            title="Request a Workshop or Training Session"
            description="Tell us about your group, institution or learning need and we will respond with options."
          />
          <div className="mt-8">
            <EnquiryForm defaultCategory="training" />
          </div>
        </div>
      </section>
    </>
  );
}
