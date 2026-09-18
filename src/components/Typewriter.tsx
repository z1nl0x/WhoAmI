import {useEffect, useState} from 'react'

interface TypewriterProps {
	text: string
	speed?: number
	delay?: number
	className?: string
	cursor?: boolean
}

export function Typewriter({
	text,
	speed = 60,
	delay = 0,
	className,
	cursor = true
}: TypewriterProps) {
	const [displayed, setDisplayed] = useState('')
	const [done, setDone] = useState(false)

	useEffect(() => {
		setDisplayed('')
		setDone(false)

		const timeout = setTimeout(() => {
			let i = 0
			const interval = setInterval(() => {
				i += 1
				setDisplayed(text.slice(0, i))
				if (i >= text.length) {
					clearInterval(interval)
					setDone(true)
				}
			}, speed)
			return () => clearInterval(interval)
		}, delay)

		return () => clearTimeout(timeout)
	}, [text, speed, delay])

	return (
		<span className={className}>
			{displayed}
			{cursor ? (
				<span
					aria-hidden='true'
					className={`ml-[2px] inline-block h-[1em] w-[2px] bg-current align-middle ${done ? 'animate-pulse' : ''}`}
				/>
			) : null}
		</span>
	)
}
