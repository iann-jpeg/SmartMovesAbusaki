import { FormEvent, useState } from "react";
import { ArrowRight, Eye, EyeOff, Handshake, ShieldCheck } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Seo } from "@/components/Seo";

type LoginMode = "partner" | "employee" | "admin";
const apiBaseUrl = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
const resolvedApiBaseUrl = apiBaseUrl.includes("smartmovesabusaki.onrender.com")
  ? "https://smartmoves-backend.onrender.com"
  : apiBaseUrl;

async function readApiResponse(response: Response, fallbackMessage: string) {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error(
      "The SmartMoves API is not responding. Check the Vercel deployment and server environment variables.",
    );
  }
  const data = await response.json();
  if (!response.ok) throw new Error(data.message ?? fallbackMessage);
  return data;
}

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<LoginMode>(searchParams.get("role") === "admin" ? "admin" : "partner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [error, setError] = useState("");

  async function submitEmployeeLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError("Enter your work email and password to continue.");
      return;
    }

    setError("");
    try {
      const response = await fetch(`${resolvedApiBaseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await readApiResponse(response, "Unable to sign in.");
      sessionStorage.setItem("smartmoves_employee_token", data.token);
      navigate(data.user.role === "EMPLOYEE" ? "/employee-portal" : "/admin/portal");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to sign in.");
    }
  }

  async function submitAdminLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!adminToken.trim()) {
      setError("Enter the ADMIN_TOKEN configured on your Render backend.");
      return;
    }
    setError("");
    try {
      const response = await fetch(`${resolvedApiBaseUrl}/api/auth/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: adminToken.trim() }),
      });
      const data = await readApiResponse(response, "Unable to sign in as Super Admin.");
      sessionStorage.setItem("smartmoves_employee_token", data.token);
      navigate("/admin/portal");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to sign in as Super Admin.");
    }
  }

  function changeMode(nextMode: LoginMode) {
    setMode(nextMode);
    setError("");
  }

  return (
    <>
      <Seo
        title="Sign in | SmartMoves Abusaki Group Limited"
        description="Access the SmartMoves partner enquiry flow or private administration dashboard."
        path="/login"
      />
      <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-[#101214] px-4 py-16 sm:px-6">
        <div className="pointer-events-none absolute -left-20 top-16 h-56 w-56 rounded-full bg-[#b98a4b]/30 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-[#0b5d3b]/30 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute right-[12%] top-8 h-16 w-16 rounded-full border border-[#c9a878]/40 bg-[#94714c]/30 shadow-[0_0_55px_rgba(201,162,63,0.28)]" aria-hidden />
        <div className="pointer-events-none absolute bottom-8 left-[10%] h-24 w-24 rounded-full border border-[#c9a878]/30 bg-[#563b2c]/45" aria-hidden />

        <section className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#c9a878]/50 bg-[#171a1b]/90 p-2 shadow-2xl shadow-black/50 backdrop-blur sm:p-3">
          <div className="grid overflow-hidden rounded-[1.55rem] border border-[#c9a878]/25 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative hidden min-h-[540px] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0b5d3b] via-[#123f35] to-[#101b20] p-10 lg:flex">
              <div className="pointer-events-none absolute -right-16 top-20 h-56 w-56 rounded-full border border-white/10 bg-white/5" aria-hidden />
              <div className="pointer-events-none absolute -bottom-20 -left-12 h-64 w-64 rounded-full border border-[#c9a878]/20 bg-[#c9a878]/10" aria-hidden />
              <Logo />
              <div className="relative max-w-sm">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#e5c77a]">SmartMoves Abusaki</p>
                <h1 className="font-heading text-4xl font-extrabold leading-tight text-white">
                  Move with purpose.
                </h1>
                <p className="mt-5 text-base leading-relaxed text-white/70">
                  A thoughtful space for the people and partners helping build what comes next.
                </p>
              </div>
              <p className="relative text-xs uppercase tracking-[0.16em] text-white/45">Nairobi · Kenya</p>
            </div>

            <div className="bg-[#171a1b] px-6 py-9 sm:px-12 sm:py-12">
              <div className="mx-auto max-w-md">
                <div className="mb-8 lg:hidden">
                  <Logo />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d0aa5c]">Welcome back</p>
                <h2 className="mt-3 font-heading text-3xl font-extrabold text-white sm:text-4xl">Choose your path</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Continue your conversation with SmartMoves or access the private dashboard.
                </p>

                <div className="mt-8 grid grid-cols-3 rounded-xl border border-white/10 bg-black/20 p-1" role="tablist" aria-label="Login type">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === "partner"}
                    onClick={() => changeMode("partner")}
                    className={`rounded-lg px-3 py-3 text-sm font-semibold transition ${mode === "partner" ? "bg-[#c9a23f] text-[#211a11]" : "text-white/60 hover:text-white"}`}
                  >
                    Work With Us
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === "employee"}
                    onClick={() => changeMode("employee")}
                    className={`rounded-lg px-3 py-3 text-sm font-semibold transition ${mode === "employee" ? "bg-[#c9a23f] text-[#211a11]" : "text-white/60 hover:text-white"}`}
                  >
                    Employee Portal
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === "admin"}
                    onClick={() => changeMode("admin")}
                    className={`rounded-lg px-3 py-3 text-sm font-semibold transition ${mode === "admin" ? "bg-[#c9a23f] text-[#211a11]" : "text-white/60 hover:text-white"}`}
                  >
                    Admin
                  </button>
                </div>

                {mode === "partner" ? (
                  <div className="mt-8">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#c9a878]/30 bg-[#c9a23f]/10 text-[#e5c77a]">
                      <Handshake className="h-7 w-7" aria-hidden />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white">Let&apos;s build something useful.</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      Tell us about your idea, organisation or opportunity. Our team will get back to you through the partnership enquiry form.
                    </p>
                    <Link
                      to="/contact?category=partnership"
                      className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#c9a23f] px-5 py-3.5 text-sm font-bold text-[#211a11] transition hover:bg-[#e0bb5d] focus:outline-none focus:ring-2 focus:ring-[#e5c77a] focus:ring-offset-2 focus:ring-offset-[#171a1b]"
                    >
                      Continue to Work With Us <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                ) : mode === "employee" ? (
                  <form className="mt-8" onSubmit={submitEmployeeLogin}>
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#c9a878]/30 bg-[#c9a23f]/10 text-[#e5c77a]">
                      <ShieldCheck className="h-7 w-7" aria-hidden />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white">Your work portal</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      Sign in with the account created for you by your SmartMoves administrator.
                    </p>
                    <label htmlFor="portal-email" className="mt-7 block text-sm font-medium text-white/80">Work email</label>
                    <input
                      id="portal-email"
                      type="email"
                      value={email}
                      onChange={(event) => { setEmail(event.target.value); setError(""); }}
                      className="mt-2 w-full rounded-xl border border-[#c9a878]/40 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#e5c77a] focus:ring-1 focus:ring-[#e5c77a]"
                      placeholder="name@smartmoves.co.ke"
                      autoComplete="username"
                    />
                    <label htmlFor="portal-password" className="mt-4 block text-sm font-medium text-white/80">Password</label>
                    <div className="relative mt-2">
                      <input
                        id="portal-password"
                        type={showToken ? "text" : "password"}
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value);
                          setError("");
                        }}
                        className="w-full rounded-xl border border-[#c9a878]/40 bg-black/20 px-4 py-3.5 pr-12 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#e5c77a] focus:ring-1 focus:ring-[#e5c77a]"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowToken((visible) => !visible)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/50 hover:text-white"
                        aria-label={showToken ? "Hide password" : "Show password"}
                      >
                        {showToken ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
                      </button>
                    </div>
                    {error && <p className="mt-2 text-sm text-red-300" role="alert">{error}</p>}
                    <button
                      type="submit"
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#c9a23f] px-5 py-3.5 text-sm font-bold text-[#211a11] transition hover:bg-[#e0bb5d] focus:outline-none focus:ring-2 focus:ring-[#e5c77a] focus:ring-offset-2 focus:ring-offset-[#171a1b]"
                    >
                      Sign in <ArrowRight className="h-4 w-4" aria-hidden />
                    </button>
                  </form>
                ) : (
                  <form className="mt-8" onSubmit={submitAdminLogin}>
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#c9a878]/30 bg-[#c9a23f]/10 text-[#e5c77a]">
                      <ShieldCheck className="h-7 w-7" aria-hidden />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white">Super Admin portal</h3>
                    <label htmlFor="admin-token" className="mt-7 block text-sm font-medium text-white/80">Admin token</label>
                    <div className="relative mt-2">
                      <input
                        id="admin-token"
                        type={showToken ? "text" : "password"}
                        value={adminToken}
                        onChange={(event) => { setAdminToken(event.target.value); setError(""); }}
                        className="w-full rounded-xl border border-[#c9a878]/40 bg-black/20 px-4 py-3.5 pr-12 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#e5c77a] focus:ring-1 focus:ring-[#e5c77a]"
                        placeholder="Enter your admin token"
                        autoComplete="current-password"
                      />
                      <button type="button" onClick={() => setShowToken((visible) => !visible)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/50 hover:text-white" aria-label={showToken ? "Hide admin token" : "Show admin token"}>
                        {showToken ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
                      </button>
                    </div>
                    {error && <p className="mt-2 text-sm text-red-300" role="alert">{error}</p>}
                    <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#c9a23f] px-5 py-3.5 text-sm font-bold text-[#211a11] transition hover:bg-[#e0bb5d]">
                      Enter Super Admin <ArrowRight className="h-4 w-4" aria-hidden />
                    </button>
                  </form>
                )}
                <Link to="/" className="mt-8 block text-center text-xs text-white/40 transition hover:text-white/75">Return to smartmovesabusaki.co.ke</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
