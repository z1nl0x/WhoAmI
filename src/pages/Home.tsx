import { Fireflies } from '@/components/Fireflies'
import { Head } from '@/components/Head'
import { Typewriter } from '@/components/Typewriter'

const skills = [
	'TypeScript',
	'React',
	'Node.js',
	'Python',
	'C#',
	'.Net',
	'Docker',
	'PostgreSQL',
	'CI/CD',
	'DevSecOps'
]

const socials = [
	{label: 'Email', href: 'mailto:paulo.kreft@gmail.com'},
	{label: 'GitHub', href: 'https://github.com/z1nl0x'},
	{label: 'LinkedIn', href: 'https://www.linkedin.com/in/paulo-kreft'}
]

export function Home() {
	return (
		<>
			<Head title='Paulo Kreft — SysAdmin e Software Developer' />
			<Fireflies />
			<main className='mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-16 px-6 py-20'>
				<section className='flex flex-col gap-6'>
					<h1 className='font-bold text-4xl tracking-tight sm:text-6xl'>
						Paulo Kreft
					</h1>

					<p className='text-lg sm:text-xl' style={{color: '#00ff41'}}>
						<Typewriter text='Software Developer & SysAdmin' speed={80} />
					</p>

					<p className='max-w-2xl text-base text-gray-600 leading-relaxed sm:text-lg dark:text-gray-300'>
						Ajudo empresas a construir e manter sistemas confiáveis — do
						back-end à infraestrutura. Foco em código limpo, automação e
						soluções que escalam sem dor de cabeça.
					</p>

					<div className='mt-2 flex flex-wrap gap-3'>
						<a
							href='mailto:paulo.kreft@gmail.com'
							className='rounded-lg bg-purple-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-purple-700'
						>
							Fale comigo <span className='text-white/50'>/ Contact</span>
						</a>
						<a
							href='https://github.com/z1nl0x'
							target='_blank'
							rel='noreferrer'
							className='rounded-lg border border-gray-300 px-5 py-2.5 font-medium transition-colors hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700'
						>
							Projetos <span className='text-gray-400 dark:text-gray-500'>/ Projects</span>
						</a>
					</div>
				</section>

				<section className='flex flex-col gap-4'>
					<h2 className='font-semibold text-gray-500 text-sm uppercase tracking-wider dark:text-gray-400'>
						Tecnologias <span className='text-cyan-500 dark:text-cyan-400'>/ Stack</span>
					</h2>
					<ul className='flex flex-wrap gap-2'>
						{skills.map(skill => (
							<li
								key={skill}
								className='rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-gray-700 text-sm dark:border-gray-700 dark:bg-gray-700/40 dark:text-gray-200'
							>
								{skill}
							</li>
						))}
					</ul>
				</section>

				<section className='flex flex-col gap-4'>
					<h2 className='font-semibold text-gray-500 text-sm uppercase tracking-wider dark:text-gray-400'>
						Onde me encontrar <span className='text-cyan-500 dark:text-cyan-400'>/ Where you can find me</span>
					</h2>
					<div className='flex flex-wrap gap-6'>
						{socials.map(social => (
							<a
								key={social.label}
								href={social.href}
								target={social.href.startsWith('http') ? '_blank' : undefined}
								rel='noreferrer'
								className='font-medium text-gray-700 underline-offset-4 transition-colors hover:text-purple-600 hover:underline dark:text-gray-200 dark:hover:text-purple-400'
							>
								{social.label}
							</a>
						))}
					</div>
				</section>

				<footer className='text-gray-400 text-sm dark:text-gray-500'>
					© 2026 Paulo Kreft.
				</footer>
			</main>
		</>
	)
}
