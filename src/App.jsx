import Hero from './components/Hero'
import Chat from './components/Chat'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero />
      <Chat />

      <footer className="relative z-10 mt-16 pb-12 text-center text-white/50">
        Built with love • Agent Crafter
      </footer>
    </div>
  )
}

export default App
