export default function ContactPage(){
  return (
    <section className="pt-28 mx-auto max-w-3xl px-6 pb-24">
      <h1 className="text-3xl font-semibold">Contacto</h1>
      <p className="mt-2 text-neutral-600">Escríbenos a <a className="underline" href="mailto:hey@cobalto.blue">hey@cobalto.blue</a> o agenda una llamada.</p>
      <form className="mt-6 grid gap-4">
        <input className="bg-white border border-neutral-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neutral-900" placeholder="Nombre" />
        <input className="bg-white border border-neutral-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neutral-900" placeholder="Email" type="email" />
        <textarea className="bg-white border border-neutral-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neutral-900" placeholder="Cuéntanos brevemente tu proyecto" rows={5} />
        <button className="rounded-full bg-neutral-900 hover:bg-black text-white px-5 py-2.5 w-fit">Enviar</button>
      </form>
    </section>
  )
}
