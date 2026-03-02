"use client"

type Origin = {
  x?: number
  y?: number
}

type ConfettiOptions = {
  particleCount?: number
  spread?: number
  origin?: Origin
  colors?: string[]
  startVelocity?: number
  gravity?: number
  scalar?: number
  drift?: number
  ticks?: number
  shapes?: string[]
  disableForReducedMotion?: boolean
}

const DEFAULT_COLORS = ["#ffffff", "#f3f4f6", "#d1d5db"]

export default function confetti(options: ConfettiOptions = {}) {
  if (typeof window === "undefined" || typeof document === "undefined") return

  if (
    options.disableForReducedMotion &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return
  }

  const count = Math.max(1, options.particleCount ?? 24)
  const spread = ((options.spread ?? 60) * Math.PI) / 180
  const originX = (options.origin?.x ?? 0.5) * window.innerWidth
  const originY = (options.origin?.y ?? 0.5) * window.innerHeight
  const startVelocity = options.startVelocity ?? 18
  const gravity = options.gravity ?? 0.6
  const scalar = options.scalar ?? 1
  const drift = options.drift ?? 0
  const duration = Math.max(600, (options.ticks ?? 120) * 12)
  const colors = options.colors?.length ? options.colors : DEFAULT_COLORS

  const container = document.createElement("div")
  container.style.position = "fixed"
  container.style.inset = "0"
  container.style.pointerEvents = "none"
  container.style.zIndex = "60"
  document.body.appendChild(container)

  const particles: Array<{
    el: HTMLSpanElement
    vx: number
    vy: number
    x: number
    y: number
    rot: number
    vr: number
  }> = []

  for (let i = 0; i < count; i++) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * spread
    const speed = startVelocity * (0.5 + Math.random() * 0.7)
    const size = (4 + Math.random() * 6) * scalar

    const el = document.createElement("span")
    el.style.position = "absolute"
    el.style.left = "0"
    el.style.top = "0"
    el.style.width = `${size}px`
    el.style.height = `${size * 0.7}px`
    el.style.borderRadius = "999px"
    el.style.background = colors[i % colors.length]
    el.style.transform = `translate(${originX}px, ${originY}px)`
    el.style.opacity = "1"
    container.appendChild(el)

    particles.push({
      el,
      vx: Math.cos(angle) * speed + drift,
      vy: Math.sin(angle) * speed,
      x: originX,
      y: originY,
      rot: Math.random() * 360,
      vr: (Math.random() - 0.5) * 20,
    })
  }

  const start = performance.now()
  const tick = (now: number) => {
    const elapsed = now - start
    const t = Math.min(elapsed / duration, 1)

    for (const p of particles) {
      p.vy += gravity * 0.25
      p.x += p.vx
      p.y += p.vy
      p.rot += p.vr

      p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`
      p.el.style.opacity = `${1 - t}`
    }

    if (t < 1) {
      window.requestAnimationFrame(tick)
      return
    }

    container.remove()
  }

  window.requestAnimationFrame(tick)
}

