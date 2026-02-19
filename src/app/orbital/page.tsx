"use client";

import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Radar,
  Cpu,
  ScrollText,
  Activity,
  Globe,
  Coins,
  Repeat,
  TrendingUp,
  Building,
  ShieldCheck,
} from "lucide-react";
import "./orbital.css";

export default function OrbitalPage() {
  const planetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!planetRef.current) return;
      const scrolled = window.scrollY;
      planetRef.current.style.transform = `translateY(${scrolled * 0.1}px) scale(${1 + scrolled * 0.0005})`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="orbital-page">
      {/* Background Elements */}
      <div className="starfield" />
      <div className="planet-horizon" ref={planetRef} />
      <div
        className="orbital-ring"
        style={{ width: "80vw", height: "80vw", opacity: 0.1 }}
      />
      <div
        className="orbital-ring"
        style={{
          width: "120vw",
          height: "120vw",
          opacity: 0.05,
          borderStyle: "dashed",
        }}
      />

      {/* ── NAV ── */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-6 backdrop-blur-sm border-b border-[rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-4">
          <div className="w-4 h-4 rounded-full border border-white" />
          <span className="tracking-widest text-sm font-bold">
            ORBITAL<span className="text-gray-500">_FINANCE</span>
          </span>
        </div>
        <div className="hidden md:flex gap-12 text-xs tracking-widest-plus text-gray-400">
          <a href="#" className="hover:text-white transition-colors">
            PLATFORM
          </a>
          <a href="#" className="hover:text-white transition-colors">
            INTELLIGENCE
          </a>
          <a href="#" className="hover:text-white transition-colors">
            COMPLIANCE
          </a>
        </div>
        <button className="text-xs border border-gray-600 px-4 py-2 hover:bg-white hover:text-black transition-all mono">
          LOGIN_SECURE
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="relative h-screen w-full flex flex-col justify-center px-8 md:px-24 pt-20 overflow-hidden">
        <div className="absolute right-0 top-1/3 w-[1px] h-32 bg-white/20" />
        <div
          className="absolute right-12 top-1/3 text-[10px] text-gray-500 mono"
          style={{ writingMode: "vertical-rl" }}
        >
          SYSTEM STATUS: NOMINAL
          <br />
          ORBIT: STABLE
        </div>

        <div className="z-10 max-w-4xl">
          <div className="flex items-center gap-4 mb-6 animate-fade-in-1">
            <div className="h-[1px] w-12 bg-gray-500" />
            <span className="text-xs tracking-[0.3em] text-gray-400 mono">
              AUTONOMOUS_LEDGER_SYSTEMS
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl leading-tight mb-8 animate-fade-in-2">
            Financial Close.
            <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-600">
              On Autopilot.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-12 font-light mono animate-fade-in-3">
            Close your books in days - not weeks. Automate reconciliations,
            journal entries, and revenue workflows with autonomous intelligence.
          </p>

          <div className="flex flex-col md:flex-row gap-6 animate-fade-in-4">
            <button className="btn-primary group">
              <span className="flex items-center gap-2">
                Enter Mission Control
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="btn-ghost">See It In Action</button>
          </div>
        </div>

        <div className="absolute bottom-12 left-8 md:left-24 flex gap-12 text-[10px] text-gray-600 mono">
          <div>
            <span className="block text-gray-400">LATENCY</span>
            0.0024ms
          </div>
          <div>
            <span className="block text-gray-400">REC_RATE</span>
            99.9%
          </div>
          <div>
            <span className="block text-gray-400">ERROR_MARGIN</span>
            <span className="text-red-400">NULL</span>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="relative py-32 px-8 md:px-24 border-t border-[rgba(255,255,255,0.05)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl mb-6">Month-End Turbulence</h2>
            <p className="text-gray-400 leading-relaxed mb-8 mono">
              Manual entry creates friction. Friction creates heat. Heat
              destroys systems. The chaotic dashboard of spreadsheet dependency
              leads to data reentry errors and team burnout.
            </p>
            <ul className="list-selector space-y-4 mono text-sm">
              <li>UNRECONCILED_TRANSACTIONS</li>
              <li>VERSION_CONTROL_CONFLICTS</li>
              <li>COMPLIANCE_DRIFT</li>
              <li>RESOURCE_EXHAUSTION</li>
            </ul>
          </div>
          <div className="relative h-[400px] glass-panel p-8 animate-drift">
            <div className="scan-line" />
            <div className="absolute top-4 left-4 text-xs text-red-400 tracking-widest mono">
              ALERT: MANUAL_OVERLOAD
            </div>
            <div className="flex flex-col gap-4 mt-8 opacity-50">
              <div className="h-2 w-full bg-red-900/20 rounded overflow-hidden">
                <div className="h-full bg-red-500 w-[90%]" />
              </div>
              <div className="h-2 w-3/4 bg-red-900/20 rounded overflow-hidden">
                <div className="h-full bg-red-500 w-[60%]" />
              </div>
              <div className="flex justify-between text-[10px] text-red-300 mono mt-2">
                <span>ERR_0192</span>
                <span>CRITICAL</span>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-4">
                <div className="h-16 border border-red-900/30 bg-red-900/10" />
                <div className="h-16 border border-red-900/30 bg-red-900/10" />
                <div className="h-16 border border-red-900/30 bg-red-900/10" />
                <div className="h-16 border border-red-900/30 bg-red-900/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOGGLE ── */}
      <section className="py-24 text-center relative overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gray-800 rounded-full opacity-20"
          style={{ borderStyle: "dashed" }}
        />
        <h2 className="text-3xl md:text-5xl mb-12 z-10 relative">
          From Periodic Panic to
          <br />
          Continuous Close
        </h2>
        <div className="flex justify-center items-center gap-12 z-10 relative">
          <span className="text-gray-500 mono text-sm tracking-widest">
            MANUAL
          </span>
          <div className="relative w-24 h-12 rounded-full border border-gray-600 p-1 cursor-pointer group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-amber-900/20 rounded-full" />
            <div className="w-10 h-10 bg-gradient-to-b from-amber-100 to-amber-600 rounded-full shadow-[0_0_15px_rgba(217,119,6,0.5)] transform translate-x-12 transition-transform duration-500" />
          </div>
          <span className="text-amber-400 mono text-sm tracking-widest">
            AUTONOMOUS
          </span>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-32 px-8 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              icon: Radar,
              code: "SYS_01",
              title: "Signal Capture",
              desc: "Transaction Intelligence utilizing API telemetry to ingest data streams instantly.",
            },
            {
              icon: Cpu,
              code: "SYS_02",
              title: "Reconciliation Engine",
              desc: "Autonomous Matching algorithms resolve 99.9% of discrepancies without pilot intervention.",
            },
            {
              icon: ScrollText,
              code: "SYS_03",
              title: "Journal Automation",
              desc: "Intelligent Entries posted directly to ERP. Rules-based logic for recurring patterns.",
            },
            {
              icon: Activity,
              code: "SYS_04",
              title: "Continuous Monitor",
              desc: "Always-On Close. Detect anomalies in real-time, not 30 days post-facto.",
            },
          ].map(({ icon: Icon, code, title, desc }) => (
            <div
              key={code}
              className="glass-panel p-6 hover:bg-white/5 transition-colors group cursor-crosshair"
            >
              <div className="flex justify-between items-start mb-12">
                <Icon className="text-gray-400 group-hover:text-amber-400 transition-colors w-6 h-6" />
                <span className="text-[10px] border border-gray-600 px-1 text-gray-500 mono">
                  {code}
                </span>
              </div>
              <h3 className="text-xl mb-2">{title}</h3>
              <p className="text-xs text-gray-400 mono leading-relaxed">
                {desc}
              </p>
              <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-amber-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* ── CHAOS vs ORBIT ── */}
      <section className="h-[80vh] flex relative border-y border-[rgba(255,255,255,0.05)]">
        <div className="w-1/2 h-full bg-[#0a0a0c] relative flex items-center justify-center overflow-hidden">
          <div className="z-10 text-center">
            <h3 className="text-2xl text-gray-500 italic">Chaos</h3>
            <p className="text-xs mono text-red-900 mt-2">
              DECOUPLED_SYSTEMS
            </p>
          </div>
        </div>
        <div className="w-1/2 h-full relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-black" />
          <div className="starfield" style={{ position: "absolute" }} />
          <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-amber-900/20 to-transparent" />
          <div className="z-10 text-center">
            <h3 className="text-4xl text-white">Orbit</h3>
            <p className="text-xs mono text-amber-400 mt-2">
              STABILIZED_TRAJECTORY
            </p>
          </div>
          <div className="absolute left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white to-transparent" />
          <div className="absolute left-[-12px] top-1/2 w-6 h-6 rounded-full border border-white bg-black flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* ── MISSION PARAMETERS ── */}
      <section className="py-32 px-8 md:px-24 bg-black/50 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-800 pb-8">
          <h2 className="text-4xl">Mission Parameters</h2>
          <div className="text-right">
            <div className="text-[10px] mono text-gray-500">DESIGNATION</div>
            <div className="text-sm mono text-gray-300">
              MULTI_VECTOR_SUPPORT
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { icon: Globe, title: "MULTI-ENTITY", sub: "Consolidation" },
            { icon: Coins, title: "REVENUE", sub: "Recognition" },
            { icon: Repeat, title: "BILLING", sub: "Subscription" },
            { icon: TrendingUp, title: "CASH FLOW", sub: "Intelligence" },
            { icon: Building, title: "CAPEX", sub: "Planning" },
          ].map(({ icon: Icon, title, sub }) => (
            <div
              key={title}
              className="aspect-square glass-panel rounded-full flex flex-col items-center justify-center p-6 text-center hover:border-amber-500/50 transition-colors group"
            >
              <Icon className="mb-4 text-gray-500 group-hover:text-amber-400 w-6 h-6 transition-colors" />
              <h4 className="text-xs tracking-widest font-bold mb-2 mono">
                {title}
              </h4>
              <p className="text-[10px] text-gray-500 mono">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECURITY ── */}
      <section className="py-32 px-8 md:px-24 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center z-10 relative">
          <div className="order-2 md:order-1 relative">
            <div className="w-[400px] h-[400px] mx-auto shield-container flex items-center justify-center animate-pulse">
              <ShieldCheck className="w-24 h-24 text-blue-300 opacity-80" />
              <div
                className="absolute inset-0 border border-blue-400/20 rounded-full animate-ping"
                style={{ animationDuration: "3s" }}
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl mb-6">Built for Gravity</h2>
            <p className="text-gray-400 mb-8 mono">
              Audit trails are not an afterthought; they are the hull plating.
              Every transaction is logged, timestamped, and immutable. Survive
              the pressure of external scrutiny with zero hull integrity loss.
            </p>
            <div className="space-y-4">
              {[
                "SOC2 TYPE II CERTIFIED",
                "IMMUTABLE LOGGING",
                "ROLE-BASED ACCESS CONTROL",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
                  <span className="mono text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DASHBOARD MOCKUP ── */}
      <section className="py-24 px-4 md:px-12">
        <div className="max-w-7xl mx-auto glass-panel border-t-4 border-t-amber-500/50 p-2 md:p-8 rounded-lg shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/5 to-transparent pointer-events-none z-20" />

          <div className="bg-[#0c0c10] border border-gray-800 rounded w-full h-[600px] relative p-6 mono">
            <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-6">
              <div className="text-xs text-gray-500">
                GLOBAL_CONSOL_VIEW // Q3_FY24
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-green-500">LIVE_LINK</span>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6 h-full">
              {/* Sidebar */}
              <div className="col-span-3 border-r border-gray-800 pr-6 space-y-4">
                <div className="h-8 bg-gray-800/50 rounded w-full" />
                <div className="h-8 bg-gray-800/30 rounded w-full" />
                <div className="h-8 bg-gray-800/30 rounded w-full" />
                <div className="mt-8">
                  <div className="text-[10px] text-gray-500 mb-2">
                    CLOSE PROGRESS
                  </div>
                  <div className="w-full bg-gray-800 h-1 rounded">
                    <div className="bg-amber-500 h-1 rounded w-[78%] shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                  </div>
                  <div className="text-right text-[10px] text-amber-500 mt-1">
                    78% COMPLETE
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="col-span-9">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-800/20 p-4 border border-gray-800 rounded">
                    <div className="text-[10px] text-gray-500">
                      CASH POSITION
                    </div>
                    <div className="text-xl text-white mt-1">$42,891,020</div>
                  </div>
                  <div className="bg-gray-800/20 p-4 border border-gray-800 rounded">
                    <div className="text-[10px] text-gray-500">EXCEPTIONS</div>
                    <div className="text-xl text-red-400 mt-1">
                      3{" "}
                      <span className="text-[10px] text-gray-600">
                        REQ ATTN
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-800/20 p-4 border border-gray-800 rounded">
                    <div className="text-[10px] text-gray-500">
                      AUTO-MATCH RATE
                    </div>
                    <div className="text-xl text-green-400 mt-1">99.4%</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-600 border-b border-gray-800 pb-2">
                    <span>ENTITY</span>
                    <span>STATUS</span>
                    <span>VARIANCE</span>
                    <span>DRIFT</span>
                  </div>
                  {[
                    {
                      entity: "US_CORP_01",
                      status: "CLOSED",
                      statusColor: "text-green-500",
                      variance: "0.00",
                      drift: "-",
                    },
                    {
                      entity: "EMEA_SUB_04",
                      status: "REVIEW",
                      statusColor: "text-amber-500",
                      variance: "124.50",
                      drift: "0.01%",
                    },
                    {
                      entity: "APAC_OPS_02",
                      status: "CLOSED",
                      statusColor: "text-green-500",
                      variance: "0.00",
                      drift: "-",
                    },
                  ].map((row) => (
                    <div
                      key={row.entity}
                      className="flex justify-between text-xs text-gray-400 py-2 border-b border-gray-800/50"
                    >
                      <span>{row.entity}</span>
                      <span className={row.statusColor}>{row.status}</span>
                      <span>{row.variance}</span>
                      <span>{row.drift}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-32 text-center relative z-10">
        <h2 className="text-5xl md:text-7xl mb-6">
          Ready to Stabilize Orbit?
        </h2>
        <p className="text-xl text-gray-400 mb-12 font-light mono">
          End the month without ending the team.
        </p>
        <button className="btn-primary text-lg px-12 py-4">
          Activate Automated Close
        </button>
        <div className="mt-24 text-[10px] text-gray-600 mono">
          SECURE CONNECTION ESTABLISHED // ENCRYPTED: AES-256
          <br />
          COPYRIGHT 2024 ORBITAL FINANCE INC.
        </div>
      </section>
    </div>
  );
}
