import { Head } from '@/components/Head'

const skills = [
	'TypeScript',
	'React',
	'Node.js',
	'Python',
	'Docker',
	'PostgreSQL',
	'AWS',
	'CI/CD',
	'Linux'
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
			<main className='mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-16 px-6 py-20'>
				<section className='flex flex-col gap-6'>
					<span className='inline-flex w-fit items-center gap-2 rounded-full bg-purple-100 px-3 py-1 font-medium text-purple-700 text-sm dark:bg-purple-500/15 dark:text-purple-300'>
						<span className='size-2 animate-pulse rounded-full bg-green-500' />
						Disponível para novos projetos
					</span>

					<h1 className='font-bold text-4xl tracking-tight sm:text-6xl'>
						Paulo Kreft
					</h1>

					<p className='text-lg text-purple-600 sm:text-xl dark:text-purple-400'>
						Desenvolvedor de Software &amp; Profissional de TI
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
							Fale comigo
						</a>
						<a
							href='https://github.com/z1nl0x'
							target='_blank'
							rel='noreferrer'
							className='rounded-lg border border-gray-300 px-5 py-2.5 font-medium transition-colors hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700'
						>
							Ver projetos
						</a>
					</div>
				</section>

				<section className='flex flex-col gap-4'>
					<h2 className='font-semibold text-gray-500 text-sm uppercase tracking-wider dark:text-gray-400'>
						Tecnologias
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
						Onde me encontrar
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
