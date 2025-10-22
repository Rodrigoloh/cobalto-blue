
'use client'
import { useState } from 'react'

export default function SectionContacto(){
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: ''
  })

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
    <section
      id="contacto"
      className="section relative bg-[#1F00FF] text-white"
    >
      <div className="relative mx-auto max-w-6xl w-full px-6 py-20 md:py-24">
        <h2 className="text-center text-2xl md:text-3xl font-semibold">
          <span className="italic mr-1 text-white">Nuestro</span>
          <span className="text-black">contacto</span>
        </h2>

        <div className="mt-10 grid md:grid-cols-2 gap-12 items-start justify-items-start">
          {/* Información */}
          <div className="w-full">
            <div className="flex items-center gap-3 flex-wrap text-white/90">
              <span className="text-lg">Escríbenos a</span>
              <a
                href="mailto:hey@cobalto.blue"
                className="inline-flex items-center rounded-full border border-white px-4 py-1.5 text-white hover:bg-[#1F00FF] hover:text-white transition"
              >
                hey@cobalto.blue
              </a>
            </div>
            <div className="flex items-center gap-3 mt-3 text-white/90">
              <span className="text-lg">Envíanos un</span>
              <a
                href="https://wa.me/524422009964?text=Hola! Me interesa conocer más sobre los servicios de Cobalto.blue"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-white px-4 py-1.5 text-white hover:bg-[#1F00FF] hover:text-white transition"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md justify-self-start">
            <input
              type="text"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full bg-transparent border-b border-white/60 pb-2 text-white placeholder-white/70 focus:outline-none focus:border-white"
              required
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              className="w-full bg-transparent border-b border-white/60 pb-2 text-white placeholder-white/70 focus:outline-none focus:border-white"
              required
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              className="w-full bg-transparent border-b border-white/60 pb-2 text-white placeholder-white/70 focus:outline-none focus:border-white"
            />
            <textarea
              placeholder="Cuéntanos sobre tu proyecto"
              value={formData.mensaje}
              onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
              rows={4}
              className="w-full bg-transparent border-b border-white/60 pb-2 text-white placeholder-white/70 focus:outline-none focus:border-white resize-none"
              required
            />
            <button
              type="submit"
              className="rounded-full border border-white px-5 py-2.5 text-white hover:bg-[#1F00FF] hover:text-white transition"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
