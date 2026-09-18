import {useEffect} from 'react'

export function useSmoothScroll() {
	useEffect(() => {
		function onClick(event: MouseEvent) {
			const target = event.target as HTMLElement
			const anchor = target.closest('a[href^="#"]')
			if (anchor) {
				const id = anchor.getAttribute('href')?.slice(1)
				const element = id ? document.getElementById(id) : null
				if (element) {
					event.preventDefault()
					element.scrollIntoView({behavior: 'smooth'})
				}
			}
		}

		document.addEventListener('click', onClick)
		return () => document.removeEventListener('click', onClick)
	}, [])
}
