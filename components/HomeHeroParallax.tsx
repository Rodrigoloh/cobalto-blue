'use client'

import { useEffect, useRef, useState } from 'react'

const SLIDES = [
  {
    kind: 'logo',
    bg: '#1F00FF',
    accent: '#05051f',
    content: 'Cobalto Blue'
  },
  {
    kind: 'text',
    bg: '#0808b8',
    accent: '#7aa7ff',
    content: 'Soluciones digitales inteligentes.'
  },
  {
    kind: 'text',
    bg: '#071033',
    accent: '#1F00FF',
    content: 'Sistemas para crecer con claridad.'
  }
]

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export default function HomeHeroParallax() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let raf = 0

    const update = () => {
      const rect = section.getBoundingClientRect()
      const scrollable = Math.max(1, rect.height - window.innerHeight)
      setProgress(clamp(-rect.top / scrollable, 0, 1))
      raf = 0
    }

    const requestUpdate = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  const activeIndex = Math.min(SLIDES.length - 1, Math.floor(progress * SLIDES.length))
  const background = SLIDES[activeIndex]?.bg ?? SLIDES[0].bg
  const accent = SLIDES[activeIndex]?.accent ?? SLIDES[0].accent

  return (
    <section
      ref={sectionRef}
      className="relative h-[300svh] overflow-clip text-white"
      style={{ backgroundColor: background }}
    >
      <div
        className="sticky top-0 grid h-svh place-items-center overflow-hidden px-5 transition-colors duration-500 sm:px-8 lg:px-12"
        style={{ backgroundColor: background }}
      >
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-[42vw] opacity-55 transition-colors duration-500"
          style={{ backgroundColor: accent, transform: `translate3d(0, ${progress * -16}%, 0)` }}
        />
        <div
          className="pointer-events-none absolute bottom-[-18vw] left-[-10vw] h-[42vw] w-[42vw] rounded-full opacity-35 blur-3xl transition-colors duration-500"
          style={{ backgroundColor: accent, transform: `translate3d(${progress * 24}%, ${progress * -18}%, 0)` }}
        />

        <div className="relative z-10 flex h-[66svh] w-full max-w-[1500px] items-center">
          {SLIDES.map((slide, index) => {
            const slideProgress = clamp(progress * (SLIDES.length - 1) - index, -1, 1)
            const distance = slideProgress * -42
            const opacity = clamp(1 - Math.abs(slideProgress) * 1.25, 0, 1)
            const scale = 1 - Math.abs(slideProgress) * 0.08

            return (
              <div
                key={slide.content}
                className="absolute inset-0 flex items-center will-change-transform"
                style={{
                  opacity,
                  transform: `translate3d(0, ${distance}svh, 0) scale(${scale})`
                }}
              >
                {slide.kind === 'logo' ? (
                  <img
                    src="/brand/logo-main-fullwhite.png"
                    alt="Cobalto Blue"
                    className="w-[min(82vw,620px)] md:w-[min(44vw,760px)]"
                  />
                ) : (
                  <h1 className="max-w-[16ch] text-[clamp(3.2rem,13vw,6.5rem)] font-normal leading-[0.9] md:max-w-[18ch] md:text-[clamp(5rem,8vw,9rem)]">
                    {slide.content}
                  </h1>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
