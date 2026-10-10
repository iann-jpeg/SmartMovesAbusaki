import { Seo } from "@/components/Seo";
import { site } from "@/config/site";

export default function PrivacyPolicy() {
  return (
    <>
      <Seo
        title="Privacy Policy | SmartMoves Abusaki Group Limited"
        description="How SmartMoves Abusaki Group Limited collects, uses and protects personal information submitted through this website."
        path="/privacy-policy"
      />

      <section className="border-b border-border bg-secondary/60 py-14">
        <div className="section-container">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">Privacy Policy</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: October 2026</p>
        </div>
      </section>

      <section className="py-14">
        <div className="section-container max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
          <div>
            <h2 className="mb-2 font-heading text-lg font-bold text-primary">1. Who We Are</h2>
            <p>
              This website is operated by {site.name} ("we", "us"), a business group based in
              Nairobi, Kenya. You can reach us at {site.contact.email} or {site.contact.phone}.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-heading text-lg font-bold text-primary">2. What We Collect</h2>
            <p>
              When you submit an enquiry through our contact or workshop forms, we collect the
              information you provide: your name, email address, phone number and organization
              (if given), the enquiry category, subject and your message. We do not collect
              information beyond what the forms ask for, and we do not use non-essential
              tracking cookies on this website.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-heading text-lg font-bold text-primary">3. Why We Collect It</h2>
            <p>
              We use the information solely to respond to your enquiry, arrange requested
              services or training, and maintain a record of our correspondence with you.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-heading text-lg font-bold text-primary">4. Who Processes Your Information</h2>
            <p>
              Your enquiry is stored securely using our website service providers, who process
              data on our behalf under appropriate safeguards. We do not sell your information
              or share it with third parties for their own marketing.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-heading text-lg font-bold text-primary">5. Retention</h2>
            <p>
              We keep enquiry records only for as long as needed to handle your request and any
              follow-up, after which they are deleted or anonymized.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-heading text-lg font-bold text-primary">6. Security</h2>
            <p>
              We apply appropriate technical and organizational measures to protect your
              information, including encrypted connections (HTTPS) and access controls on our
              systems.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-heading text-lg font-bold text-primary">7. Your Rights</h2>
            <p>
              Under the Kenya Data Protection Act, 2019, you have the right to access, correct
              or request deletion of your personal data, and to object to or restrict its
              processing. To exercise any of these rights, contact us at {site.contact.email}.
              You may also lodge a complaint with the Office of the Data Protection Commissioner
              (odpc.go.ke).
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-heading text-lg font-bold text-primary">8. Updates to This Policy</h2>
            <p>
              We may update this policy from time to time. Changes will be posted on this page
              with an updated revision date.
            </p>
          </div>
          <p className="rounded-md border border-border bg-secondary/60 p-4 text-xs">
            This policy is provided as a general statement of our practices and should be
            reviewed against our actual data handling and applicable Kenyan legal requirements.
          </p>
        </div>
      </section>
    </>
  );
}
