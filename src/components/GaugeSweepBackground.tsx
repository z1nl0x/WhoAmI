import {useEffect, useRef} from 'react'

interface Band {
	innerR: number
	outerR: number
	direction: number
	angle: number
}

interface DrawOptions {
	ctx: CanvasRenderingContext2D
	bands: Band[]
	cx: number
	cy: number
	isDark: boolean
	dt: number
}

const BAND_COUNT = 8
const RAY_COUNT = 24
const ANG_SPEED = 0.08

function getStrokeColor(isDark: boolean): string {
	return isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)'
}

function createBands(
	width: number,
	height: number
): {bands: Band[]; cx: number; cy: number} {
	const size = Math.min(width, height)
	const cx = width / 2
	const cy = height / 2
	const outerR = Math.max(width, height) * 0.75
	const startR = size * 0.05
	const bandWidth = (outerR - startR) / BAND_COUNT

	const bands = Array.from({length: BAND_COUNT}, (_, i) => ({
		innerR: startR + i * bandWidth,
		outerR: startR + (i + 1) * bandWidth,
		direction: i % 2 === 0 ? 1 : -1,
		angle: (i * Math.PI) / BAND_COUNT
	}))

	return {bands, cx, cy}
}

function drawBands(options: DrawOptions): void {
	const {ctx, bands, cx, cy, isDark, dt} = options

	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
	ctx.lineWidth = 1
	ctx.strokeStyle = getStrokeColor(isDark)

	const step = (Math.PI * 2) / RAY_COUNT

	for (const band of bands) {
		band.angle += ANG_SPEED * band.direction * dt

		for (let j = 0; j < RAY_COUNT; j += 1) {
			const a = band.angle + j * step
			const cos = Math.cos(a)
			const sin = Math.sin(a)

			const x1 = cx + cos * band.innerR
			const y1 = cy + sin * band.innerR
			const x2 = cx + cos * band.outerR
			const y2 = cy + sin * band.outerR

			ctx.beginPath()
			ctx.moveTo(x1, y1)
			ctx.lineTo(x2, y2)
			ctx.stroke()
		}
	}
}

function observeVisibility(
	canvas: HTMLCanvasElement,
	visibleRef: React.MutableRefObject<boolean>
): () => void {
	const observer = new IntersectionObserver(
		entries => {
			visibleRef.current = entries[0]?.isIntersecting ?? true
		},
		{threshold: 0}
	)
	observer.observe(canvas)
	return () => observer.disconnect()
}

interface FrameContext {
	ctx: CanvasRenderingContext2D
	bandsRef: {value: Band[]}
	centerRef: {cx: number; cy: number}
	visibleRef: React.MutableRefObject<boolean>
	darkRef: React.MutableRefObject<boolean>
}

function createDrawFrame(context: FrameContext): (now: number) => void {
	const {ctx, bandsRef, centerRef, visibleRef, darkRef} = context
	let lastTime: number | null = null

	function draw(now: number) {
		if (!visibleRef.current) {
			lastTime = null
			globalThis.requestAnimationFrame(draw)
			return
		}

		const dt = lastTime === null ? 0 : (now - lastTime) / 1000
		lastTime = now

		drawBands({
			ctx,
			bands: bandsRef.value,
			cx: centerRef.cx,
			cy: centerRef.cy,
			isDark: darkRef.current,
			dt
		})

		globalThis.requestAnimationFrame(draw)
	}

	return draw
}

function startGaugeSweep(
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D,
	visibleRef: React.MutableRefObject<boolean>,
	darkRef: React.MutableRefObject<boolean>
): () => void {
	const darkQuery = globalThis.matchMedia('(prefers-color-scheme: dark)')
	darkRef.current = darkQuery.matches

	const bandsRef = {value: [] as Band[]}
	const centerRef = {cx: 0, cy: 0}
	let animId = 0

	function resize() {
		const dpr = globalThis.devicePixelRatio ?? 1
		canvas.width = globalThis.innerWidth * dpr
		canvas.height = globalThis.innerHeight * dpr
		ctx.scale(dpr, dpr)

		const {bands, cx, cy} = createBands(
			globalThis.innerWidth,
			globalThis.innerHeight
		)
		bandsRef.value = bands
		centerRef.cx = cx
		centerRef.cy = cy
	}

	function onDarkChange(event: MediaQueryListEvent) {
		darkRef.current = event.matches
	}

	const draw = createDrawFrame({ctx, bandsRef, centerRef, visibleRef, darkRef})

	resize()
	animId = globalThis.requestAnimationFrame(draw)

	globalThis.addEventListener('resize', resize)
	darkQuery.addEventListener('change', onDarkChange)
	const disconnectVisibility = observeVisibility(canvas, visibleRef)

	return () => {
		globalThis.cancelAnimationFrame(animId)
		globalThis.removeEventListener('resize', resize)
		darkQuery.removeEventListener('change', onDarkChange)
		disconnectVisibility()
	}
}

function useGaugeSweepAnimation(
	canvasRef: React.RefObject<HTMLCanvasElement | null>,
	visibleRef: React.MutableRefObject<boolean>,
	darkRef: React.MutableRefObject<boolean>
): void {
	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		return startGaugeSweep(canvas, ctx, visibleRef, darkRef)
	}, [canvasRef, darkRef, visibleRef])
}

export function GaugeSweepBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const visibleRef = useRef(true)
	const darkRef = useRef(false)

	useGaugeSweepAnimation(canvasRef, visibleRef, darkRef)

	return (
		<canvas
			className='pointer-events-none fixed inset-0 -z-10'
			ref={canvasRef}
		/>
	)
}
