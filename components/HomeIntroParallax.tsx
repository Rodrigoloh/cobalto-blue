export default function HomeIntroParallax() {
  return (
    <section id="intro" className="section bg-white text-black relative overflow-hidden flex items-center justify-center">
      <div className="mx-auto max-w-5xl px-6 w-full flex flex-col items-center justify-center text-center">
        <div className="mb-6 md:mb-8">
          <div className="h-7 w-7 md:h-10 md:w-10 rounded-full bg-cobaltBase" />
        </div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
          Brands that speak clearly.
        </h2>

        <h2 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
          Brands that <span className="text-cobaltBase">feel alive.</span>
        </h2>

        <div className="mt-12 md:mt-14 h-[3px] w-14 bg-black" />
      </div>
    </section>
  )
}
