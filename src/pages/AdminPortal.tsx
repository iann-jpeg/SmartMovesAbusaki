import { FormEvent, useEffect, useState } from "react";
import { LogOut, ShieldCheck, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Seo } from "@/components/Seo";

interface Employee { id: string; name: string; email: string; role: string; department: string; employeeId: string; suspended: boolean; }
const apiBaseUrl = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

export default function AdminPortal() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("smartmoves_employee_token") ?? "";
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "EMPLOYEE", department: "", employeeId: "" });

  useEffect(() => {
    if (!token) { navigate("/login?role=admin", { replace: true }); return; }
    fetch(`${apiBaseUrl}/api/admin/employees`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 401) {
          sessionStorage.removeItem("smartmoves_employee_token");
          navigate("/login?role=admin", { replace: true });
          return;
        }
        if (!response.ok) throw new Error(data.message ?? "Unable to load employees.");
        setEmployees(data.items);
      })
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : "Unable to load employees."));
  }, [navigate, token]);

  async function createEmployee(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const response = await fetch(`${apiBaseUrl}/api/admin/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.message ?? "Unable to create employee.");
      return;
    }
    setEmployees((current) => [...current, data.user].sort((a, b) => a.name.localeCompare(b.name)));
    setForm({ name: "", email: "", password: "", role: "EMPLOYEE", department: "", employeeId: "" });
    setShowForm(false);
  }

  async function signOut() {
    await fetch(`${apiBaseUrl}/api/auth/logout`, { method: "POST", headers: { Authorization: `Bearer ${token}` } }).catch(() => undefined);
    sessionStorage.removeItem("smartmoves_employee_token");
    navigate("/login", { replace: true });
  }

  return (
    <>
      <Seo title="Administration | SmartMoves Abusaki Group Limited" path="/admin/portal" />
      <section className="border-b border-border bg-[#0b2347] py-14 text-white">
        <div className="section-container flex flex-wrap items-end justify-between gap-6">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e5c77a]">Super Admin</p><h1 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">Workforce control centre</h1><p className="mt-3 text-white/70">Manage employee accounts and portal access.</p></div>
          <button type="button" onClick={signOut} className="inline-flex items-center gap-2 rounded-md border border-white/30 px-4 py-2 text-sm font-semibold hover:bg-white/10"><LogOut className="h-4 w-4" aria-hidden /> Sign out</button>
        </div>
      </section>
      <section className="section-container py-12">
        {error && <p role="alert" className="mb-6 text-destructive">{error}</p>}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-accent" /><h2 className="font-heading text-2xl font-bold text-primary">Employee accounts</h2></div><button type="button" onClick={() => setShowForm((open) => !open)} className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"><UserPlus className="h-4 w-4" aria-hidden /> {showForm ? "Close form" : "Add employee"}</button></div>
        {showForm && <form onSubmit={createEmployee} className="card-surface mb-6 grid gap-4 p-6 sm:grid-cols-2">
          <label className="text-sm font-medium">Full name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-1 w-full rounded-md border border-input bg-input-background px-3 py-2" /></label>
          <label className="text-sm font-medium">Work email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-1 w-full rounded-md border border-input bg-input-background px-3 py-2" /></label>
          <label className="text-sm font-medium">Temporary password<input required minLength={12} type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="mt-1 w-full rounded-md border border-input bg-input-background px-3 py-2" /></label>
          <label className="text-sm font-medium">Employee number<input value={form.employeeId} onChange={(event) => setForm({ ...form, employeeId: event.target.value })} className="mt-1 w-full rounded-md border border-input bg-input-background px-3 py-2" /></label>
          <label className="text-sm font-medium">Department<input value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })} className="mt-1 w-full rounded-md border border-input bg-input-background px-3 py-2" /></label>
          <label className="text-sm font-medium">Role<select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} className="mt-1 w-full rounded-md border border-input bg-input-background px-3 py-2"><option value="EMPLOYEE">Employee</option><option value="ILLUSTRATOR">Illustrator</option><option value="HR_MANAGER">HR Manager</option><option value="DEPARTMENT_MANAGER">Department Manager</option><option value="FINANCE">Finance / Payroll</option></select></label>
          <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground sm:col-span-2">Create account</button>
        </form>}
        <div className="overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-secondary/70 text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="px-4 py-3">Employee</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Department</th><th className="px-4 py-3">Status</th></tr></thead><tbody className="divide-y divide-border">{employees.map((employee) => <tr key={employee.id}><td className="px-4 py-4"><div className="font-semibold">{employee.name}</div><div className="text-muted-foreground">{employee.email}</div></td><td className="px-4 py-4">{employee.role.replaceAll("_", " ")}</td><td className="px-4 py-4">{employee.department || "—"}</td><td className="px-4 py-4">{employee.suspended ? "Suspended" : "Active"}</td></tr>)}{employees.length === 0 && <tr><td className="px-4 py-8 text-center text-muted-foreground" colSpan={4}>No employee accounts have been created yet.</td></tr>}</tbody></table></div>
        <Link className="mt-6 inline-block text-sm text-accent" to="/admin">Open enquiry dashboard</Link>
      </section>
    </>
  );
}
