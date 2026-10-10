import { Link } from "react-router-dom";
import { BookOpen, FileText, Monitor, School, Printer, ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SectionHeading } from "@/components/SectionHeading";

const categories = [
  { icon: BookOpen, name: "Revision Books", text: "Structured revision resources designed to help learners prepare with confidence." },
  { icon: FileText, name: "Learning & Assessment Materials", text: "Practice and assessment resources for students and educators." },
  { icon: Monitor, name: "Digital Publications", text: "Learning content in accessible digital formats." },
  { icon: Printer, name: "Print-Ready Resources", text: "Educational materials prepared for print distribution." },
  { icon: School, name: "Institutional Projects", text: "Custom publishing work for schools and educational institutions." },
];

export default function SmartMovesBooks() {
  return (
    <>
      <Seo
        title="SmartMoves Books | Educational Publishing & Learning Resources"
        description="SmartMoves Books is the publishing brand of SmartMoves Abusaki Group Limited, developing revision and learning resources for students, educators and institutions in Kenya."
        path="/smartmoves-books"
      />

      <section className="border-b border-border bg-primary py-16 text-primary-foreground sm:py-24">
        <div className="section-container max-w-3xl">
          <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-gold">
            <span className="gold-rule" aria-hidden />
            Publishing Brand
          </p>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl">
            SmartMoves Books
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80">
            SmartMoves Books is the publishing brand of SmartMoves Abusaki Group Limited. Its
            purpose is simple: to make structured learning and revision resources more accessible
            to learners, educators and institutions.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/contact?category=publishing"
              className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground transition-colors hover:bg-gold/90"
            >
              Enquire About Publications <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="section-container">
          <SectionHeading
            eyebrow="What We Publish"
            title="Learning Resource Categories"
            description="The areas SmartMoves Books is developing. Catalogue entries will be published here as titles become available."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <article key={c.name} className="card-surface p-6">
                <c.icon className="mb-4 h-6 w-6 text-accent" aria-hidden />
                <h3 className="font-heading text-base font-bold text-primary">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/60 py-16 sm:py-20">
        <div className="section-container grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
              Catalogue In Development
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Our first titles are in development. We do not list publications before they are
              ready — when the catalogue launches, this page will carry full details of each
              title and how to obtain it.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              In the meantime, if you are looking for a specific learning or revision resource,
              or you represent a school or institution with a publishing need, we would be glad
              to hear from you.
            </p>
          </div>
          <div className="card-surface border-t-4 border-t-gold p-8">
            <h3 className="font-heading text-lg font-bold text-primary">Schools & Institutions</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We welcome conversations with schools and educational institutions about learning
              materials, custom publishing projects and bulk resource needs.
            </p>
            <Link
              to="/contact?category=publishing"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Start a Publishing Conversation <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
