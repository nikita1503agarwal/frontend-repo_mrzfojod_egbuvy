import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-12 text-center">
        <div className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs text-white/80 backdrop-blur">
          Agent Crafter • Multi‑persona AI
        </div>
        <h1 className="mt-6 text-4xl sm:text-6xl font-bold tracking-tight text-white">
          Craft your perfect AI<br className="hidden sm:block" /> for every task
        </h1>
        <p className="mt-4 text-white/80 text-base sm:text-lg">
          One main brain. Three specialized modes — Student, Finance, and Lawyer — answering in the right tone and structure.
        </p>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.15),transparent_60%)]" />
      </div>
    </section>
  )
}
