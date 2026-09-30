import { useEffect, useRef } from 'react'

interface Firefly {
	x: number
	y: number
	vx: number
	vy: number
	radius: number
	opacity: number
	opacityDelta: number
	hue: number
}

const FIREFLY_COUNT = 45

function createFirefly(width: number, height: number): Firefly {
	const angle = Math.random() * Math.PI * 2
	const speed = 0.3 + Math.random() * 0.6
	return {
		x: Math.random() * width,
		y: Math.random() * height,
		vx: Math.cos(angle) * speed,
		vy: Math.sin(angle) * speed,
		radius: 1.5 + Math.random() * 1.5,
		opacity: Math.random() * 0.5,
		opacityDelta: 0.003 + Math.random() * 0.007,
		hue: 115 + Math.random() * 15,
	}
}

export function Fireflies() {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		let animId: number
		let fireflies: Firefly[] = []

		function resize() {
			if (!canvas) return
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
			fireflies = Array.from({ length: FIREFLY_COUNT }, () =>
				createFirefly(canvas.width, canvas.height),
			)
		}

		function draw() {
			if (!canvas || !ctx) return

			ctx.clearRect(0, 0, canvas.width, canvas.height)

			for (const f of fireflies) {
				f.x += f.vx
				f.y += f.vy

				if (Math.random() < 0.02) {
					const angle = Math.random() * Math.PI * 2
					const speed = 0.3 + Math.random() * 0.6
					f.vx = Math.cos(angle) * speed
					f.vy = Math.sin(angle) * speed
				}

				if (f.x < 0) f.x = canvas.width
				else if (f.x > canvas.width) f.x = 0
				if (f.y < 0) f.y = canvas.height
				else if (f.y > canvas.height) f.y = 0

				f.opacity += f.opacityDelta
				if (f.opacity >= 0.5 || f.opacity <= 0) {
					f.opacityDelta *= -1
					f.opacity = Math.max(0, Math.min(0.5, f.opacity))
				}

				const grd = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 3)
				grd.addColorStop(0, `hsla(${f.hue}, 100%, 70%, ${f.opacity * 0.4})`)
				grd.addColorStop(1, `hsla(${f.hue}, 100%, 50%, 0)`)

				ctx.beginPath()
				ctx.arc(f.x, f.y, f.radius * 3, 0, Math.PI * 2)
				ctx.fillStyle = grd
				ctx.fill()

				ctx.beginPath()
				ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2)
				ctx.fillStyle = `hsla(${f.hue}, 100%, 75%, ${f.opacity * 0.5})`
				ctx.fill()
			}

			animId = requestAnimationFrame(draw)
		}

		resize()
		draw()

		window.addEventListener('resize', resize)
		return () => {
			cancelAnimationFrame(animId)
			window.removeEventListener('resize', resize)
		}
	}, [])

	return (
		<canvas
			ref={canvasRef}
			className='pointer-events-none fixed inset-0 -z-10'
			aria-hidden='true'
		/>
	)
}
