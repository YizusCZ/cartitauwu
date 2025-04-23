interface ConfettiOptions {
  particleCount?: number
  spread?: number
  startVelocity?: number
  decay?: number
  gravity?: number
  drift?: number
  colors?: string[]
}

interface Particle {
  color: string
  x: number
  y: number
  diameter: number
  tilt: number
  tiltAngleIncrement: number
  tiltAngle: number
  velocity: {
    x: number
    y: number
  }
}

export function createConfetti(canvas: HTMLCanvasElement, options: ConfettiOptions = {}) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  // Set canvas size to match window
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const particles: Particle[] = []
  const particleCount = options.particleCount || 50
  const spread = options.spread || 50
  const startVelocity = options.startVelocity || 30
  const decay = options.decay || 0.9
  const gravity = options.gravity || 1
  const drift = options.drift || 0
  const colors = options.colors || ["#9d4edd", "#c77dff", "#e0aaff"]

  // Get the center of the canvas
  const originX = canvas.width / 2
  const originY = canvas.height / 2

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    const size = Math.random() * 15 + 8 // Larger particles (was 10 + 5)
    const angle = Math.random() * 2 * Math.PI
    const velocity = startVelocity * Math.random()

    particles.push({
      color: colors[Math.floor(Math.random() * colors.length)],
      x: originX,
      y: originY,
      diameter: size,
      tilt: 0,
      tiltAngleIncrement: Math.random() * 0.1 + 0.05,
      tiltAngle: 0,
      velocity: {
        x: Math.cos(angle) * velocity + drift * (Math.random() - 0.5),
        y: Math.sin(angle) * velocity,
      },
    })
  }

  // Animation loop
  let animationFrame: number
  let completed = false

  const update = () => {
    if (completed) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    let remainingParticles = 0
    for (const particle of particles) {
      particle.velocity.y += gravity
      particle.x += particle.velocity.x
      particle.y += particle.velocity.y
      particle.tiltAngle += particle.tiltAngleIncrement
      particle.tilt = Math.sin(particle.tiltAngle) * 15

      // Apply decay
      particle.velocity.x *= decay
      particle.velocity.y *= decay

      // Check if particle is still visible
      if (particle.y < canvas.height && particle.x > 0 && particle.x < canvas.width) {
        remainingParticles++

        ctx.beginPath()
        ctx.fillStyle = particle.color
        ctx.ellipse(
          particle.x,
          particle.y,
          (Math.cos(particle.tiltAngle) * particle.diameter) / 2,
          particle.diameter / 2,
          particle.tilt,
          0,
          2 * Math.PI,
        )
        ctx.fill()
      }
    }

    // Stop animation if all particles are off screen
    if (remainingParticles === 0) {
      completed = true
      ctx.clearRect(0, 0, canvas.width, canvas.height) // Clear canvas when done
      return
    }

    animationFrame = requestAnimationFrame(update)
  }

  // Start animation
  update()

  // Clean up after 8 seconds (as a fallback)
  setTimeout(() => {
    if (!completed) {
      cancelAnimationFrame(animationFrame)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      completed = true
    }
  }, 8000)
}
