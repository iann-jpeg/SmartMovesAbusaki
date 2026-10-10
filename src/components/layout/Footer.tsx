import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { site, navigation, divisions } from "@/config/site";
import { Logo } from "@/components/Logo";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { label: "LinkedIn", url: site.social.linkedin },
    { label: "Facebook", url: site.social.facebook },
    { label: "Instagram", url: site.social.instagram },
  ].filter((s) => s.url);

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo variant="dark" />
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            {site.tagline}
          </p>
          <p className="text-sm leading-relaxed text-primary-foreground/75">
            A Kenyan business group developing practical solutions through technology,
            publishing, education and business development.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-primary-foreground">
            Company
          </h2>
          <ul className="space-y-2.5 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="text-primary-foreground/75 transition-colors hover:text-primary-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Business divisions">
          <h2 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-primary-foreground">
            Our Businesses
          </h2>
          <ul className="space-y-2.5 text-sm">
            {divisions.map((d) => (
              <li key={d.id}>
                <Link
                  to={d.id === "publishing" ? "/smartmoves-books" : d.id === "education" ? "/workshops" : `/businesses#${d.id}`}
                  className="text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                >
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-primary-foreground">
            Contact
          </h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-center gap-2 text-primary-foreground/75 transition-colors hover:text-primary-foreground"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.contact.phoneHref}`}
                className="inline-flex items-center gap-2 text-primary-foreground/75 transition-colors hover:text-primary-foreground"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                {site.contact.phone}
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-primary-foreground/75">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              {site.contact.address}
            </li>
          </ul>
          {socials.length > 0 && (
            <ul className="mt-4 flex gap-4 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground/75 hover:text-primary-foreground"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="section-container flex flex-col items-center justify-between gap-3 py-5 text-xs text-primary-foreground/60 sm:flex-row">
          <p>© {year} {site.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-primary-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary-foreground">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
