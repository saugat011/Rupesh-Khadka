import {
  Shield,
  Terminal,
  BrainCircuit,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,255,170,0.15),transparent_70%)]" />

        {/* Small Badge */}
        <div className="mb-6 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400 backdrop-blur">
          🛡️ Ethical Hacker • Malware Researcher • AI Security
        </div>

        {/* Main Heading */}
        <h1 className="max-w-5xl text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl">
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Rupesh Khadka
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400 sm:text-xl">
          Young Malware Researcher skilled in Reverse Engineering,
          Penetration Testing, Ethical Hacking, and AI-driven Cybersecurity.
          Passionate about building secure and scalable digital systems.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#projects"
            className="flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3 font-medium text-black transition hover:bg-emerald-400"
          >
            View Projects
            <ArrowRight size={18} />
          </a>

          <a
            href="#contact"
            className="rounded-full border border-zinc-700 px-7 py-3 font-medium text-white transition hover:border-emerald-400 hover:text-emerald-400"
          >
            Contact Me
          </a>
        </div>

        {/* Tech Cards */}
        <div className="mt-20 grid w-full max-w-5xl gap-6 sm:grid-cols-3">
          
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur transition hover:border-emerald-500/50">
            <Shield className="mb-4 text-emerald-400" size={32} />
            <h3 className="mb-2 text-xl font-semibold">
              Cybersecurity
            </h3>
            <p className="text-zinc-400">
              Ethical hacking, penetration testing, malware analysis,
              vulnerability assessment, and secure architecture.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur transition hover:border-cyan-500/50">
            <Terminal className="mb-4 text-cyan-400" size={32} />
            <h3 className="mb-2 text-xl font-semibold">
              Reverse Engineering
            </h3>
            <p className="text-zinc-400">
              Deep analysis of binaries, exploit behavior,
              detection evasion, and malware research.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur transition hover:border-purple-500/50">
            <BrainCircuit className="mb-4 text-purple-400" size={32} />
            <h3 className="mb-2 text-xl font-semibold">
              AI Security
            </h3>
            <p className="text-zinc-400">
              Machine learning for malware detection,
              behavioral analytics, and intelligent threat mitigation.
            </p>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-10 text-center">
          <div>
            <h2 className="text-4xl font-bold text-emerald-400">5+</h2>
            <p className="text-zinc-400">Years Experience</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-cyan-400">50+</h2>
            <p className="text-zinc-400">Projects</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-purple-400">100+</h2>
            <p className="text-zinc-400">Security Audits</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-orange-400">25+</h2>
            <p className="text-zinc-400">CTF Competitions</p>
          </div>
        </div>
      </section>
    </main>
  );
}

