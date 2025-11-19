import { useState } from 'react'

const roles = [
  { id: 'general', label: 'Main AI', desc: 'General purpose assistant' },
  { id: 'student', label: 'Student', desc: 'Explanations, study steps, examples' },
  { id: 'finance', label: 'Financial Advisor', desc: 'Educational guidance and checklists' },
  { id: 'lawyer', label: 'Lawyer', desc: 'General legal information and disclaimers' },
]

export default function AgentSelector({ value, onChange }) {
  const [active, setActive] = useState(value || 'general')

  const handle = (id) => {
    setActive(id)
    onChange?.(id)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {roles.map((r) => (
        <button
          key={r.id}
          onClick={() => handle(r.id)}
          className={`text-left rounded-xl border p-4 transition-all ${
            active === r.id
              ? 'border-indigo-400/60 bg-indigo-500/10 shadow-[0_0_0_3px_rgba(99,102,241,0.2)]'
              : 'border-white/10 hover:border-white/30 bg-white/5'
          }`}
        >
          <div className="text-sm text-white/70">{r.label}</div>
          <div className="text-xs text-white/50 mt-1">{r.desc}</div>
        </button>
      ))}
    </div>
  )
}
