
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
      className="section relative bg-white bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: 'url(/contacto/bg.png), url(/contacto/bg.jpg)' }}
    >
      <div className="relative mx-auto max-w-6xl w-full px-6 py-20 md:py-24">
        <h2 className="text-center text-2xl md:text-3xl font-semibold">
          <span className="italic mr-1 text-[#1F00FF]">Nuestro</span> contacto
        </h2>

        <div className="mt-10 grid md:grid-cols-2 gap-12 items-start">
          {/* Información */}
          <div>
            <p className="text-lg text-neutral-700">
              Escríbenos a
              {' '}
              <a className="underline text-neutral-900" href="mailto:hey@cobalto.blue">hey@cobalto.blue</a>
              {' '}o envíanos un WhatsApp.
            </p>
            <p className="mt-3 text-neutral-700">
              <a
                href="https://wa.me/524422009964?text=Hola! Me interesa conocer más sobre los servicios de Cobalto.blue"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 underline"
              >
                WhatsApp
              </a>
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full bg-white border border-neutral-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              required
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              className="w-full bg-white border border-neutral-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              required
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              className="w-full bg-white border border-neutral-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
            <textarea
              placeholder="Cuéntanos sobre tu proyecto"
              value={formData.mensaje}
              onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
              rows={4}
              className="w-full bg-white border border-neutral-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              required
            />
            <button
              type="submit"
              className="rounded-full bg-neutral-900 hover:bg-black text-white px-5 py-2.5 w-fit"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
