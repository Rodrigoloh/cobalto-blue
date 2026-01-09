'use client'
import { useEffect, useState } from 'react'

const items = [
  { id: 'inicio', label: 'INICIO' },
  { id: 'nosotros', label: 'NOSOTROS' },
  { id: 'servicios', label: 'SERVICIOS' },
  { id: 'work', label: 'WORK' },
  { id: 'clientes', label: 'CLIENTES' },
  { id: 'contacto', label: 'CONTACTO' },
]

export default function ScrollSpyNav(){
  const [active, setActive] = useState('inicio')

  useEffect(()=>{
    const obs = new IntersectionObserver((entries)=>{
      // Encontrar la entrada con mayor intersección
      let mostVisible = entries[0]
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > mostVisible.intersectionRatio) {
          mostVisible = entry
        }
      })
      if (mostVisible.isIntersecting) {
        setActive(mostVisible.target.id)
      }
    }, { 
      rootMargin: '-20% 0px -20% 0px', 
      threshold: [0, 0.25, 0.5, 0.75, 1]
    })
    
    items.forEach(i=>{
      const el = document.getElementById(i.id)
      if(el) obs.observe(el)
    })
    return ()=> obs.disconnect()
  }, [])

  const go = (id:string)=>{
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <aside className="fixed left-4 top-6 z-40 select-none">
      <ul className="space-y-1 text-sm">
        {items.map(i=>{
          const isActive = active === i.id
          return (
            <li key={i.id}>
              <button
                onClick={()=>go(i.id)}
                className={`uppercase tracking-wide transition-all duration-300 font-normal ${
                  isActive 
                    ? 'text-white border-b border-white pb-0.5' 
                    : 'text-white/60 hover:text-white/90'
                }`}
              >{i.label}</button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
