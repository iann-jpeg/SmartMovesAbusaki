import { useEffect, useState } from "react";
import { ArrowRight, LogOut, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Seo } from "@/components/Seo";

interface PortalUser {
  name: string;
  email: string;
  role: string;
  department: string;
  employeeId: string;
  suspended: boolean;
}
interface Illustration { _id: string; title: string; brief: string; dueDate?: string; status: string; }

const apiBaseUrl = import.meta.env.PROD
  ? "https://smartmoves-backend.onrender.com"
  : (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

export default function EmployeePortal() {
  const navigate = useNavigate();
  const [user, setUser] = useState<PortalUser | null>(null);
  const [error, setError] = useState("");
  const [illustrations, setIllustrations] = useState<Illustration[]>([]);
  const token = sessionStorage.getItem("smartmoves_employee_token") ?? "";

  useEffect(() => {
    if (!token) {
      navigate("/login?role=admin", { replace: true });
      return;
    }
    fetch(`${apiBaseUrl}/api/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message ?? "Your session is no longer valid.");
        setUser(data.user);
        if (data.user.role === "ILLUSTRATOR") {
          const assignments = await fetch(`${apiBaseUrl}/api/illustrations/me`, { headers: { Authorization: `Bearer ${token}` } });
          const assignmentData = await assignments.json();
          if (assignments.ok) setIllustrations(assignmentData.items);
        }
      })
      .catch((requestError) => {
        sessionStorage.removeItem("smartmoves_employee_token");
        setError(requestError instanceof Error ? requestError.message : "Unable to load your portal.");
      });
  }, [navigate, token]);

  async function signOut() {
    await fetch(`${apiBaseUrl}/api/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => undefined);
    sessionStorage.removeItem("smartmoves_employee_token");
    navigate("/login", { replace: true });
  }

  async function updateIllustration(id: string, status: string) {
    const response = await fetch(`${apiBaseUrl}/api/illustrations/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    if (response.ok) setIllustrations((items) => items.map((item) => item._id === id ? data.item : item));
  }

  if (error) {
    return <main className="section-container py-24"><p role="alert" className="text-destructive">{error}</p><Link className="mt-4 inline-block text-accent" to="/login">Return to sign in</Link></main>;
  }
  if (!user) return <main className="section-container py-24"><p className="text-muted-foreground">Loading your portal…</p></main>;

  return (
    <>
      <Seo title="Employee Portal | SmartMoves Abusaki Group Limited" path="/employee-portal" />
      <section className="border-b border-border bg-[#0b2347] py-14 text-white">
        <div className="section-container flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e5c77a]">Employee portal</p>
            <h1 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">Welcome, {user.name}</h1>
            <p className="mt-3 text-white/70">{user.employeeId || "Employee"} · {user.department || "SmartMoves Abusaki Group"}</p>
          </div>
          <button type="button" onClick={signOut} className="inline-flex items-center gap-2 rounded-md border border-white/30 px-4 py-2 text-sm font-semibold hover:bg-white/10">
            <LogOut className="h-4 w-4" aria-hidden /> Sign out
          </button>
        </div>
      </section>
      <section className="section-container py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <article className="card-surface p-6 md:col-span-2">
            <div className="flex items-center gap-3 text-accent"><UserRound className="h-5 w-5" aria-hidden /><h2 className="font-heading text-xl font-bold text-primary">My profile</h2></div>
            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              <div><dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Name</dt><dd className="mt-1 text-sm">{user.name}</dd></div>
              <div><dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Work email</dt><dd className="mt-1 text-sm">{user.email}</dd></div>
              <div><dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Role</dt><dd className="mt-1 text-sm">{user.role.replaceAll("_", " ")}</dd></div>
              <div><dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Department</dt><dd className="mt-1 text-sm">{user.department || "Not assigned"}</dd></div>
            </dl>
          </article>
          {user.role === "ILLUSTRATOR" ? <article className="card-surface bg-secondary/50 p-6 md:col-span-3">
            <h2 className="font-heading text-xl font-bold text-primary">Illustration assignments</h2>
            <p className="mt-2 text-sm text-muted-foreground">Review your briefs, update progress and keep delivery dates visible.</p>
            <div className="mt-5 space-y-3">{illustrations.length === 0 ? <p className="text-sm text-muted-foreground">No illustration assignments yet.</p> : illustrations.map((item) => <div key={item._id} className="rounded-md border border-border bg-background p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-semibold">{item.title}</h3><p className="mt-1 text-sm text-muted-foreground">{item.brief}</p></div><select value={item.status} onChange={(event) => void updateIllustration(item._id, event.target.value)} className="rounded-md border border-input bg-input-background px-2 py-1 text-xs"><option value="ASSIGNED">Assigned</option><option value="IN_PROGRESS">In progress</option><option value="IN_REVIEW">In review</option><option value="COMPLETED">Completed</option></select></div>{item.dueDate && <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-accent">Due {item.dueDate}</p>}</div>)}</div>
          </article> : <article className="card-surface bg-secondary/50 p-6">
            <h2 className="font-heading text-xl font-bold text-primary">Coming next</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Leave requests, assigned tasks, announcements and HR support will appear here as your administrator enables each module.</p>
            <Link to="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">Contact HR <ArrowRight className="h-4 w-4" aria-hidden /></Link>
          </article>}
        </div>
      </section>
    </>
  );
}
