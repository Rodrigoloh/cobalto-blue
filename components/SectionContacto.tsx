
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
      <div className="relative mx-auto max-w-6xl w-full px-6 py-12 md:py-16">
        <h2 className="text-left text-2xl md:text-3xl font-bold">
          <span className="italic mr-1 text-white">Nuestro</span>
          <span className="text-black">contacto</span>
        </h2>

        <div className="mt-8 grid md:grid-cols-2 gap-10 items-start justify-items-start">
          {/* Formulario (alineado con el título a la izquierda) */}
          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md justify-self-start order-1">
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
              className="rounded-full border border-white px-5 py-2.5 text-white hover:bg-black hover:text-white transition"
            >
              Enviar
            </button>
          </form>

          {/* Información con dos botones (Email / WhatsApp) */}
          <div className="w-full order-2">
            <div className="flex flex-col gap-3 text-white/90">
              <a
                href="mailto:hey@cobalto.blue"
                className="inline-flex w-fit items-center rounded-full border border-white px-4 py-2 text-white hover:bg-black hover:text-white transition"
                aria-label="Escríbenos a hey@cobalto.blue"
              >
                <span className="text-lg">Escríbenos a&nbsp;</span>
                <span className="text-lg">hey@cobalto.blue</span>
              </a>
              <a
                href="https://wa.me/524422009964?text=Hola! Me interesa conocer más sobre los servicios de Cobalto.blue"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center rounded-full border border-white px-4 py-2 text-white hover:bg-black hover:text-white transition"
                aria-label="Envíanos un WhatsApp"
              >
                <span className="text-lg">Envíanos un&nbsp;</span>
                <span className="text-lg">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
