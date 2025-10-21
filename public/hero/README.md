Coloca aquí los assets del Hero.

Recomendado:
- Imagen: `hero.jpg` (o `.png`/`.webp`) ~2880px de ancho, calidad 70–80.
- Video (opcional): `hero.mp4` (H.264, 1080p, 8–12 Mbps, sin audio, loop 10–20s).

Usos en código:
- `components/HeroClean.tsx` lee `/hero/hero.jpg` y, si no existe, usa un degradado de fallback.
- Si `hero.mp4` no existe, el video se oculta automáticamente.

