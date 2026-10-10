import { Seo } from "@/components/Seo";
import { site } from "@/config/site";

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Use | SmartMoves Abusaki Group Limited"
        description="Terms governing the use of the SmartMoves Abusaki Group Limited website."
        path="/terms"
      />

      <section className="border-b border-border bg-secondary/60 py-14">
        <div className="section-container">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">Terms of Use</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: October 2026</p>
        </div>
      </section>

      <section className="py-14">
        <div className="section-container max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
          <div>
            <h2 className="mb-2 font-heading text-lg font-bold text-primary">1. Website Use</h2>
            <p>
              This website is provided by {site.name} for general information about our business
              activities. By using this site you agree to use it lawfully and not to misuse its
              content, forms or systems.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-heading text-lg font-bold text-primary">2. Intellectual Property</h2>
            <p>
              All content on this website — including text, design, illustrations and the
              SmartMoves identity — belongs to {site.name} unless stated otherwise. You may not
              reproduce it without our written permission.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-heading text-lg font-bold text-primary">3. Accuracy of Information</h2>
            <p>
              We take care to keep the information on this site accurate and current, but it is
              provided for general guidance and does not constitute professional, legal or
              financial advice. Service availability and details are confirmed directly with
              each client.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-heading text-lg font-bold text-primary">4. External Links</h2>
            <p>
              Where this site links to external websites, we are not responsible for their
              content or practices.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-heading text-lg font-bold text-primary">5. Limitation of Liability</h2>
            <p>
              To the extent permitted by law, we are not liable for any loss arising from use of
              this website or reliance on its content.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-heading text-lg font-bold text-primary">6. Contact</h2>
            <p>
              Questions about these terms can be sent to {site.contact.email} or {site.contact.phone}.
            </p>
          </div>
          <p className="rounded-md border border-border bg-secondary/60 p-4 text-xs">
            These terms are a general framework and do not replace formal legal review.
          </p>
        </div>
      </section>
    </>
  );
}
