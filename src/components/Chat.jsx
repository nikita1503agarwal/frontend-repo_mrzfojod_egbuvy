import { useEffect, useRef, useState } from 'react'

export default function Chat() {
  const [role, setRole] = useState('general')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Welcome to Agent Crafter. Choose a mode and ask your question.' },
  ])
  const listRef = useRef(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }

  useEffect(() => { scrollToBottom() }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', content: text, persona: role }])
    setLoading(true)

    try {
      const res = await fetch(`${baseUrl}/api/agent/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, message: text }),
      })
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: data.reply, persona: data.role, tips: data.tips },
      ])
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: 'Something went wrong. Please try again.', persona: role },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative z-10 -mt-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'general', label: 'Main AI' },
                { id: 'student', label: 'Student' },
                { id: 'finance', label: 'Financial Advisor' },
                { id: 'lawyer', label: 'Lawyer' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`rounded-lg px-3 py-2 text-sm transition-all ${
                    role === r.id
                      ? 'bg-indigo-500/20 border border-indigo-400/60 text-white'
                      : 'bg-white/5 border border-white/10 text-white/80 hover:text-white'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <div className="h-[320px] overflow-y-auto rounded-lg bg-slate-900/60 border border-white/10 p-4" ref={listRef}>
              <div className="space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className="text-sm">
                    <div className={`font-semibold ${m.role === 'assistant' ? 'text-indigo-300' : m.role === 'system' ? 'text-white/50' : 'text-white'}`}>
                      {m.role === 'assistant' ? `Agent (${m.persona})` : m.role === 'user' ? 'You' : 'System'}
                    </div>
                    <pre className="whitespace-pre-wrap text-white/90 leading-relaxed">{m.content}</pre>
                    {m.tips && m.tips.length > 0 && (
                      <ul className="mt-2 text-white/60 list-disc list-inside">
                        {m.tips.map((t, idx) => (
                          <li key={idx}>{t}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask anything..."
                className="flex-1 rounded-lg bg-slate-950/60 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              <button
                onClick={send}
                disabled={loading}
                className="rounded-lg px-5 py-3 bg-indigo-500 text-white disabled:opacity-50 hover:bg-indigo-400 transition-colors"
              >
                {loading ? 'Thinking…' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
