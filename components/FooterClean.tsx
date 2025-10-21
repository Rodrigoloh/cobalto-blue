export default function FooterClean() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-sm text-neutral-500">© {new Date().getFullYear()} Cobalto.blue</p>
          <p className="text-sm text-neutral-400">Todos los derechos reservados</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-neutral-700">
          <a href="/nosotros" className="hover:underline">Nosotros</a>
          <a href="/work" className="hover:underline">Proyectos</a>
          <a href="/contacto" className="hover:underline">Contacto</a>
          <a href="mailto:hey@cobalto.blue" className="hover:underline">hey@cobalto.blue</a>
        </div>
      </div>
    </footer>
  )
}

