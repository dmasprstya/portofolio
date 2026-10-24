import { useEffect, useRef } from 'react'

/**
 * Background component
 * - Gradient blob shapes animated via CSS
 * - Interactive particle canvas (vanilla JS, no external deps)
 * - Adapts to light/dark mode via class observer
 */
const Background = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []
    let mouse = { x: -9999, y: -9999 }

    // Get particle color based on current theme
    const getColor = () => {
      return document.documentElement.classList.contains('dark')
        ? 'rgba(255,255,255,'
        : 'rgba(80,80,120,'
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    class Particle {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.8
        this.vy = (Math.random() - 0.5) * 0.8
        this.radius = Math.random() * 2.5 + 1
        this.opacity = Math.random() * 0.5 + 0.2
      }
      update() {
        // Repulse from mouse
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const force = (120 - dist) / 120
          this.vx += (dx / dist) * force * 0.6
          this.vy += (dy / dist) * force * 0.6
        }
        // Dampen velocity
        this.vx *= 0.98
        this.vy *= 0.98
        this.x += this.vx
        this.y += this.vy
        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = getColor() + this.opacity + ')'
        ctx.fill()
      }
    }

    const initParticles = () => {
      particles = []
      const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000))
      for (let i = 0; i < count; i++) {
        particles.push(new Particle())
      }
    }

    const drawLinks = () => {
      const colorBase = getColor()
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            const opacity = (1 - dist / 140) * 0.25
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = colorBase + opacity + ')'
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      drawLinks()
      animationId = requestAnimationFrame(animate)
    }

    // Mouse tracking (pointer-events enabled on canvas only)
    const onMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    initParticles()
    animate()

    window.addEventListener('resize', () => { resize(); initParticles() })
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950" />

      {/* Animated gradient blobs */}
      <div
        className="absolute rounded-full blur-3xl animate-blob"
        style={{
          top: '-10%', left: '-10%',
          width: '45vw', height: '45vw',
          background: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(168,85,247,0.15) 60%, transparent 100%)',
          animationDelay: '0s',
        }}
      />
      <div
        className="absolute rounded-full blur-3xl animate-blob"
        style={{
          top: '40%', right: '-15%',
          width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(244,114,182,0.12) 60%, transparent 100%)',
          animationDelay: '3s',
        }}
      />
      <div
        className="absolute rounded-full blur-3xl animate-blob"
        style={{
          bottom: '-15%', left: '20%',
          width: '40vw', height: '40vw',
          background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(129,140,248,0.12) 60%, transparent 100%)',
          animationDelay: '6s',
        }}
      />

      {/* Interactive particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  )
}

export default Background
