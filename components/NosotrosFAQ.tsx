'use client'

import { useState } from 'react'

type Faq = {
  q: string
  a: string
}

export default function NosotrosFAQ({ items }: { items: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="mt-12 border-t border-current/25">
      {items.map((faq, index) => {
        const open = openIndex === index
        return (
          <div key={faq.q} className="group border-b border-current/25 transition">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
              className={`grid w-full grid-cols-[1fr_auto] gap-6 px-0 py-6 text-left transition ${open ? 'text-[#1F00FF]' : 'group-hover:text-[#1F00FF]'}`}
            >
              <span className="text-2xl font-bold leading-tight">{faq.q}</span>
              <span className={`text-3xl leading-none transition ${open ? 'rotate-45' : ''}`}>+</span>
            </button>
            {open ? (
              <p className="max-w-4xl pb-6 text-lg leading-relaxed text-[#0d0d0d]/70">{faq.a}</p>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
