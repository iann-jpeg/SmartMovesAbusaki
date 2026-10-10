import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SectionHeading } from "@/components/SectionHeading";
import { divisions } from "@/config/site";

export default function Businesses() {
  return (
    <>
      <Seo
        title="Our Businesses | SmartMoves Abusaki Group Limited"
        description="Explore the business divisions of SmartMoves Abusaki Group Limited: technology and digital solutions, publishing and learning resources, education and capacity building, and business development."
        path="/businesses"
      />

      <section className="border-b border-border bg-secondary/60 py-16 sm:py-20">
        <div className="section-container">
          <SectionHeading
            as="h1"
            eyebrow="Our Businesses"
            title="Business Divisions"
            description="Four connected areas of activity. Each division is developed carefully and marketed honestly — services listed here are ones we are prepared to deliver or are actively developing."
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="section-container space-y-10">
          {divisions.map((d, i) => (
            <article
              key={d.id}
              id={d.id}
              className={`card-surface scroll-mt-24 p-6 sm:p-10 ${i % 2 === 1 ? "lg:ml-12" : "lg:mr-12"}`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-heading text-2xl font-bold text-primary">{d.name}</h2>
                {d.showStatus && (
                  <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
                    {d.status}
                  </span>
                )}
              </div>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{d.description}</p>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">
                    Services & Activities
                  </h3>
                  <ul className="space-y-2.5">
                    {d.services.map((s) => (
                      <li key={s} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col justify-between gap-6">
                  <div>
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">
                      Who It's For
                    </h3>
                    <p className="text-sm text-muted-foreground">{d.audience}</p>
                  </div>
                  <div>
                    <Link
                      to={d.cta.href}
                      className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                    >
                      {d.cta.label} <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/60 py-16 text-center sm:py-20">
        <div className="section-container">
          <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
            Not Sure Which Division Fits Your Need?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Tell us what you are working on and we will point you in the right direction.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
