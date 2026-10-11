import { useState } from "react";
import { Seo } from "@/components/Seo";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  category: string;
  subject: string;
  message: string;
  createdAt: string;
}

const apiBaseUrl = import.meta.env.PROD
  ? "https://smartmoves-backend.onrender.com"
  : (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem("smartmoves_admin_token") ?? "");
  const [items, setItems] = useState<Enquiry[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "loaded" | "error">("idle");
  const [error, setError] = useState("");

  async function loadEnquiries(requestedPage = page) {
    setStatus("loading");
    setError("");
    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/enquiries?page=${requestedPage}&limit=25`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) sessionStorage.removeItem("smartmoves_admin_token");
        throw new Error(data.message ?? "Could not load enquiries.");
      }
      setItems(data.items);
      setPage(data.page);
      setTotal(data.total);
      setStatus("loaded");
    } catch (requestError) {
      setStatus("error");
      setError(requestError instanceof Error ? requestError.message : "Could not load enquiries.");
    }
  }

  return (
    <>
      <Seo title="Admin | SmartMoves Abusaki Group Limited" path="/admin" />
      <section className="border-b border-border bg-secondary/60 py-14">
        <div className="section-container">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">Enquiry Dashboard</h1>
          <p className="mt-3 text-muted-foreground">Private view of submissions received through the website.</p>
        </div>
      </section>
      <section className="section-container py-12">
        <div className="card-surface max-w-xl space-y-4 p-6">
          <label htmlFor="admin-token" className="block text-sm font-medium">Admin token</label>
          <div className="flex gap-3">
            <input
              id="admin-token"
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              className="min-w-0 flex-1 rounded-md border border-input bg-input-background px-3 py-2.5 text-sm"
              placeholder="Enter the Render ADMIN_TOKEN"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={loadEnquiries}
              disabled={!token || status === "loading"}
              className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground disabled:opacity-50"
            >
              {status === "loading" ? "Loading…" : "View submissions"}
            </button>
          </div>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        </div>

        {status === "loaded" && (
          <div className="mt-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">{total} submission{total === 1 ? "" : "s"} total.</p>
              {total > 25 && (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => loadEnquiries(page - 1)}
                    disabled={page === 1 || status === "loading"}
                    className="rounded-md border border-input px-3 py-1.5 text-sm disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-muted-foreground">Page {page} of {Math.ceil(total / 25)}</span>
                  <button
                    type="button"
                    onClick={() => loadEnquiries(page + 1)}
                    disabled={page >= Math.ceil(total / 25) || status === "loading"}
                    className="rounded-md border border-input px-3 py-1.5 text-sm disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
            {items.length === 0 ? (
              <div className="card-surface p-6 text-sm text-muted-foreground">No enquiries have been submitted yet.</div>
            ) : items.map((item) => (
              <article key={item._id} className="card-surface space-y-3 p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-heading text-lg font-bold text-primary">{item.subject}</h2>
                    <p className="text-sm text-muted-foreground">{item.name} · {item.email}{item.organization ? ` · ${item.organization}` : ""}</p>
                  </div>
                  <time className="text-xs text-muted-foreground" dateTime={item.createdAt}>
                    {new Date(item.createdAt).toLocaleString()}
                  </time>
                </div>
                <p className="text-sm leading-relaxed text-foreground">{item.message}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">{item.category}{item.phone ? ` · ${item.phone}` : ""}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
