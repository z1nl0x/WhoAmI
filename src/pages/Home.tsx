import {GaugeSweepBackground} from '@/components/GaugeSweepBackground'
import {Head} from '@/components/Head'
import {Typewriter} from '@/components/Typewriter'
import {useSmoothScroll} from './useSmoothScroll'
import {navItems, skills, socials} from './utils'

function Card({
	children,
	className = ''
}: {
	children: React.ReactNode
	className?: string
}) {
	return (
		<div
			className={`rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-8 dark:border-gray-700 dark:bg-gray-800/80 ${className}`}
		>
			{children}
		</div>
	)
}

function SectionTitle({pt, en}: {pt: string; en: string}) {
	return (
		<h2 className='font-semibold text-gray-500 text-sm uppercase tracking-wider dark:text-gray-400'>
			{pt} <span className='text-cyan-500 dark:text-cyan-400'>/ {en}</span>
		</h2>
	)
}

export function Home() {
	useSmoothScroll()

	return (
		<>
			<Head title='Paulo Kreft — SysAdmin e Software Developer' />
			<GaugeSweepBackground />

			<header className='fixed top-0 right-0 left-0 z-40 border-gray-200 border-b bg-white/80 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/80'>
				<div className='mx-auto flex max-w-3xl items-center justify-between px-6 py-4'>
					<a className='flex items-center' href='#inicio'>
						<img
							alt='Paulo Kreft'
							className='h-8 w-auto object-contain'
							height={32}
							src='/pk_semfundo.png'
							width={64}
						/>
					</a>
					<nav className='flex gap-1 sm:gap-4'>
						{navItems.map(item => (
							<a
								className='rounded-md px-2 py-1 font-medium text-gray-600 text-sm transition-colors hover:bg-gray-100 hover:text-gray-900 sm:px-3 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
								href={`#${item.target}`}
								key={item.target}
							>
								{item.label}
							</a>
						))}
					</nav>
				</div>
			</header>

			<main className='mx-auto flex max-w-3xl flex-col gap-10 px-6 pt-28 pb-20 sm:pt-32'>
				{/* biome-ignore lint/correctness/useUniqueElementIds: stable anchor IDs for navigation */}
				<section className='scroll-mt-28 sm:scroll-mt-32' id='inicio'>
					<Card>
						<div className='flex flex-col gap-6'>
							<h1 className='font-bold text-4xl tracking-tight sm:text-6xl'>
								Paulo Kreft
							</h1>

							<p className='text-lg sm:text-xl'>
								<Typewriter
									className='text-[#00ff41]'
									speed={80}
									text='Software Developer & SysAdmin'
								/>
							</p>

							<p className='max-w-2xl text-base text-gray-600 leading-relaxed sm:text-lg dark:text-gray-300'>
								Ajudo empresas a construir e manter sistemas confiáveis — do
								back-end à infraestrutura. Foco em código limpo, automação e
								soluções que escalam sem dor de cabeça.
							</p>

							<div className='mt-2 flex flex-wrap gap-3'>
								<a
									className='rounded-lg bg-purple-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-purple-700'
									href='mailto:paulo.kreft@gmail.com'
								>
									Fale comigo <span className='text-white/50'>/ Contact</span>
								</a>
								<a
									className='rounded-lg border border-gray-300 px-5 py-2.5 font-medium transition-colors hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700'
									href='https://github.com/z1nl0x'
									rel='noreferrer'
									target='_blank'
								>
									Projetos{' '}
									<span className='text-gray-400 dark:text-gray-500'>
										/ Projects
									</span>
								</a>
							</div>
						</div>
					</Card>
				</section>

				{/* biome-ignore lint/correctness/useUniqueElementIds: stable anchor IDs for navigation */}
				<section
					className='flex scroll-mt-28 flex-col gap-4 sm:scroll-mt-32'
					id='sobre'
				>
					<SectionTitle en='About' pt='Sobre' />
					<div className='flex max-w-2xl flex-col gap-4 text-base text-gray-600 leading-relaxed sm:text-lg dark:text-gray-300'>
						<p>
							Profissional de Tecnologia da Informação com sólida experiência em
							DevSecOps, automações em Python, administração de servidores
							Windows e Linux, e integração de sistemas corporativos. Atualmente
							atuo como desenvolvedor de Software utilizando a stack: .NET/C#
							(Entity Framework/Dapper/PostgreSQL) no backend e
							TypeScript/React/Ant Design no frontend.
						</p>
						<p>
							Tenho forte domínio em infraestrutura, incluindo gerenciamento de
							servidores, redes, Active Directory e firewall Fortinet Fortigate.
							Participo do planejamento, documentação e execução de projetos
							técnicos com foco em eficiência, escalabilidade e automação de
							processos.
						</p>
						<p>
							Familiarizado com práticas de CI/CD, versionamento com Git,
							arquitetura de integração e suporte técnico de alto nível. Busco
							constante evolução com foco em cultura DevSecOps e
							Desenvolvimento.
						</p>
					</div>
				</section>

				{/* biome-ignore lint/correctness/useUniqueElementIds: stable anchor IDs for navigation */}
				<section className='scroll-mt-28 sm:scroll-mt-32' id='stack'>
					<Card className='flex flex-col gap-4'>
						<SectionTitle en='Stack' pt='Tecnologias' />
						<ul className='flex flex-wrap gap-2'>
							{skills.map(skill => (
								<li
									className='rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-gray-700 text-sm transition-colors hover:border-purple-300 hover:bg-purple-50 dark:border-gray-700 dark:bg-gray-700/40 dark:text-gray-200 dark:hover:border-purple-500 dark:hover:bg-purple-900/20'
									key={skill}
								>
									{skill}
								</li>
							))}
						</ul>
					</Card>
				</section>

				{/* biome-ignore lint/correctness/useUniqueElementIds: stable anchor IDs for navigation */}
				<section
					className='flex scroll-mt-28 flex-col gap-4 sm:scroll-mt-32'
					id='contato'
				>
					<SectionTitle en='Contact' pt='Contato' />
					<div className='flex flex-wrap gap-6'>
						{socials.map(social => (
							<a
								className='font-medium text-gray-700 underline-offset-4 transition-colors hover:text-purple-600 hover:underline dark:text-gray-200 dark:hover:text-purple-400'
								href={social.href}
								key={social.label}
								rel='noreferrer'
								target={social.href.startsWith('http') ? '_blank' : undefined}
							>
								{social.label}
							</a>
						))}
					</div>
				</section>
			</main>

			<footer className='border-gray-200 border-t bg-white/80 py-8 text-center text-gray-500 text-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-400'>
				<p>
					© {new Date().getFullYear()} Paulo Kreft. Todos os direitos
					reservados.
				</p>
			</footer>
		</>
	)
}
