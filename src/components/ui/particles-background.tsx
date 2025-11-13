'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  baseSpeedX: number
  baseSpeedY: number
  speedX: number
  speedY: number
  opacity: number
  pulseSpeed: number
  pulseDirection: number
  minOpacity: number
  maxOpacity: number
  update(): void
  draw(): void
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Type assertions for canvas and ctx since we've checked they're not null
    const canvasEl = canvas
    const context = ctx

    let particlesArray: Particle[] = []
    const numberOfParticles = Math.floor((window.innerWidth * window.innerHeight) / 10000)
    const maxDistance = 170
    const flowDirection = { x: 0.07, y: 0.04 }

    // Enhanced flow effect
    const resizeCanvas = () => {
      canvasEl.width = window.innerWidth
      canvasEl.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', () => {
      resizeCanvas()
      init()
    })

    class ParticleClass implements Particle {
      x: number
      y: number
      size: number
      baseSpeedX: number
      baseSpeedY: number
      speedX: number
      speedY: number
      opacity: number
      pulseSpeed: number
      pulseDirection: number
      minOpacity: number
      maxOpacity: number

      constructor(x?: number, y?: number) {
        this.x = x ?? Math.random() * canvasEl.width
        this.y = y ?? Math.random() * canvasEl.height
        this.size = Math.random() * 3.5 + 0.5
        this.baseSpeedX = (Math.random() - 0.5) * 0.35
        this.baseSpeedY = (Math.random() - 0.5) * 0.35
        this.speedX = this.baseSpeedX + flowDirection.x
        this.speedY = this.baseSpeedY + flowDirection.y
        this.opacity = Math.random() * 0.6 + 0.25
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.pulseDirection = 1
        this.minOpacity = this.opacity * 0.7
        this.maxOpacity = this.opacity
      }

      update() {
        // Add enhanced movement effect
        this.speedX = this.baseSpeedX + flowDirection.x * (Math.sin(Date.now() * 0.0006) * 0.15)
        this.speedY = this.baseSpeedY + flowDirection.y * (Math.cos(Date.now() * 0.0006) * 0.15)

        this.x += this.speedX
        this.y += this.speedY

        // Pulsing opacity effect
        this.opacity += this.pulseSpeed * this.pulseDirection
        if (this.opacity >= this.maxOpacity || this.opacity <= this.minOpacity) {
          this.pulseDirection *= -1
        }

        // Wrap around the screen instead of bouncing
        if (this.x > canvasEl.width) this.x = 0
        if (this.x < 0) this.x = canvasEl.width
        if (this.y > canvasEl.height) this.y = 0
        if (this.y < 0) this.y = canvasEl.height
      }

      draw() {
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)

        // Use a variety of teal/cyan colors for more visual interest
        const colors = [
          '6, 214, 160', // Main teal
          '17, 233, 182', // Lighter teal
          '2, 190, 150', // Darker teal
          '0, 222, 213', // Cyan
          '8, 174, 158' // Muted teal
        ]

        const colorIndex = Math.floor((this.x * this.y) / 1000) % colors.length
        const accentRGB = colors[colorIndex]

        context.fillStyle = `rgba(${accentRGB}, ${this.opacity})`
        context.shadowBlur = 8
        context.shadowColor = `rgba(${accentRGB}, 0.3)`
        context.fill()
        context.shadowBlur = 0
      }
    }

    const init = () => {
      particlesArray.length = 0
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new ParticleClass())
      }
    }

    const connect = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance)

            // Use a gradient for the connection lines
            const gradient = context.createLinearGradient(
              particlesArray[a].x,
              particlesArray[a].y,
              particlesArray[b].x,
              particlesArray[b].y
            )

            gradient.addColorStop(0, `rgba(6, 214, 160, ${opacity * 0.25})`)
            gradient.addColorStop(1, `rgba(0, 222, 213, ${opacity * 0.25})`)

            context.strokeStyle = gradient
            context.lineWidth = opacity * 1.5
            context.beginPath()
            context.moveTo(particlesArray[a].x, particlesArray[a].y)
            context.lineTo(particlesArray[b].x, particlesArray[b].y)
            context.stroke()
          }
        }
      }
    }

    const animate = () => {
      context.clearRect(0, 0, canvasEl.width, canvasEl.height)
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }
      connect()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    init()
    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className="animated-bg fixed inset-0 -z-10">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  )
}
