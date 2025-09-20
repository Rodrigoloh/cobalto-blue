
'use client'
import { useEffect, useRef, useState } from 'react'

export default function SectionContacto(){
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: ''
  })
  const [showFooter, setShowFooter] = useState(false)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFooter(entry.isIntersecting)
      },
      { threshold: 0.6 }
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Crear el cuerpo del email
    const emailBody = `
Nuevo mensaje desde cobalto.blue:

Nombre: ${formData.nombre}
Correo: ${formData.correo}
Teléfono: ${formData.telefono}

Mensaje:
${formData.mensaje}
    `
    
    // Abrir cliente de email
    window.location.href = `mailto:hey@cobalto.blue?subject=Nuevo mensaje desde cobalto.blue&body=${encodeURIComponent(emailBody)}`
  }
  return (
    <section id="contacto" className="section flex flex-col relative">
      {/* Área principal de contacto con gradiente */}
      <div className="flex-1 flex items-center pb-[22vh] relative">
        <div className="mx-auto max-w-6xl px-6 pr-safe-right w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Información de contacto */}
            <div>
              <h2 className="font-neueMachina text-5xl md:text-6xl mb-6 text-white">Contacto</h2>
              <p className="font-circularStd text-xl text-white/90 mb-8">
                Escríbenos a <a className="underline hover:text-white transition-colors" href="mailto:hey@cobalto.blue">hey@cobalto.blue</a>
              </p>
              
              {/* Texto de WhatsApp */}
              <p className="font-circularStd text-lg text-white/90">
                o escribenos un <a 
                  href="https://wa.me/524422009964?text=Hola! Me interesa conocer más sobre los servicios de Cobalto.blue" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold text-green-400 hover:text-green-300 underline transition-colors"
                >WhatsApp</a>
              </p>
            </div>

            {/* Formulario de contacto minimalista */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  type="text"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="w-full bg-transparent border-b border-white/30 pb-2 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                  required
                />
                <input 
                  type="email"
                  placeholder="Correo electrónico"
                  value={formData.correo}
                  onChange={(e) => setFormData({...formData, correo: e.target.value})}
                  className="w-full bg-transparent border-b border-white/30 pb-2 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                  required
                />
                <input 
                  type="tel"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  className="w-full bg-transparent border-b border-white/30 pb-2 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                />
                <textarea 
                  placeholder="Cuéntanos sobre tu proyecto"
                  value={formData.mensaje}
                  onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                  rows={3}
                  className="w-full bg-transparent border-b border-white/30 pb-2 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors resize-none"
                  required
                />
                <button 
                  type="submit"
                  className="w-full text-left border-b border-white/30 pb-2 text-white/70 hover:text-white hover:border-white transition-all uppercase tracking-wide font-circularStd"
                >
                  → Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
        <div ref={sentinelRef} className="absolute bottom-0 left-0 w-full h-24" />
      </div>

      {/* Barra negra de partners - 1/5 de la pantalla */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-black text-white h-[20vh] min-h-[160px] flex items-center transition-all duration-500 ease-out z-30 ${
          showFooter
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
          <div className="mx-auto max-w-6xl px-6 pr-safe-right w-full">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            
            {/* Partners/Logos */}
            <div>
              <h3 className="font-circularStd text-sm uppercase tracking-wide text-white/60 mb-4">Partners</h3>
              <div className="flex items-center gap-6">
                {['Partner 1', 'Partner 2', 'Partner 3'].map((partner) => (
                  <div key={partner} className="w-16 h-8 bg-white/10 rounded border border-white/20 flex items-center justify-center text-xs text-white/40">
                    {partner}
                  </div>
                ))}
              </div>
            </div>

            {/* Logo central */}
            <div className="flex justify-center">
              <img src="/brand/cb_logo-main-fullwhite.png" alt="cobalto.blue" className="h-8" />
            </div>

            {/* Copyright */}
            <div className="text-right">
              <p className="text-sm text-white/60">
                © {new Date().getFullYear()} Cobalto.blue
              </p>
              <p className="text-xs text-white/40 mt-1">
                Todos los derechos reservados
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
