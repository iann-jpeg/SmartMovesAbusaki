import { useSearchParams } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SectionHeading } from "@/components/SectionHeading";
import { EnquiryForm } from "@/components/EnquiryForm";
import { site, enquiryCategories } from "@/config/site";

export default function Contact() {
  const [params] = useSearchParams();
  const categoryParam = params.get("category") ?? "general";
  const defaultCategory = enquiryCategories.some((c) => c.value === categoryParam)
    ? categoryParam
    : "general";

  return (
    <>
      <Seo
        title="Contact Us | SmartMoves Abusaki Group Limited"
        description="Contact SmartMoves Abusaki Group Limited for digital solutions, publishing, training, partnership and general enquiries. Based in Nairobi, Kenya."
        path="/contact"
      />

      <section className="border-b border-border bg-secondary/60 py-16 sm:py-20">
        <div className="section-container">
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Start a Conversation"
            description="Whether it's a digital solution, a publishing enquiry, a training session or a business opportunity — we would like to hear from you."
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="section-container grid gap-12 lg:grid-cols-5">
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h2 className="font-heading text-xl font-bold text-primary">Contact Details</h2>
              <ul className="mt-5 space-y-4">
                <li>
                  <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 text-sm text-foreground hover:text-accent">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10">
                      <Mail className="h-4 w-4 text-accent" aria-hidden />
                    </span>
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${site.contact.phoneHref}`} className="flex items-center gap-3 text-sm text-foreground hover:text-accent">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10">
                      <Phone className="h-4 w-4 text-accent" aria-hidden />
                    </span>
                    {site.contact.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10">
                    <MapPin className="h-4 w-4 text-accent" aria-hidden />
                  </span>
                  {site.contact.address}
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-primary">What Can We Help With?</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>• General enquiries</li>
                <li>• Digital solutions and websites</li>
                <li>• Publishing and SmartMoves Books</li>
                <li>• Workshops and training</li>
                <li>• Partnerships and business development</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <EnquiryForm
              defaultCategory={defaultCategory}
              heading="Send Us an Enquiry"
              intro="Fields marked * are required. We only use your details to respond to your enquiry."
            />
          </div>
        </div>
      </section>
    </>
  );
}
