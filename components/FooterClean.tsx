export default function FooterClean() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col gap-4">
        <img src="/brand/logo-main-fullwhite.png" alt="cobalto.blue" className="h-7 w-auto" />
        <div>
          <p className="text-sm">© {new Date().getFullYear()} Cobalto.blue</p>
          <p className="text-sm text-white/80">Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  )
}
