export default function ContactPage(){
  return (
    <section className="pt-28 mx-auto max-w-3xl px-6 pb-24">
      <h1 className="text-3xl font-semibold">Contacto</h1>
      <p className="mt-2 text-slate-300">Escríbenos a <a className="underline" href="mailto:hey@cobalto.blue">hey@cobalto.blue</a> o agenda una llamada.</p>
      <form className="mt-6 grid gap-4">
        <input className="bg-white/5 border border-white/10 rounded-xl p-3" placeholder="Nombre" />
        <input className="bg-white/5 border border-white/10 rounded-xl p-3" placeholder="Email" type="email" />
        <textarea className="bg-white/5 border border-white/10 rounded-xl p-3" placeholder="Cuéntanos brevemente tu proyecto" rows={5} />
        <button className="rounded-xl bg-cobalt-300 hover:bg-cobalt-200 text-slate-900 px-5 py-3 w-fit">Enviar</button>
      </form>
    </section>
  )
}