import { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { styles } from '~/styles/indexStyles'
import { Lang } from '~/types/lang'

export const meta: MetaFunction = () => [
	{ title: 'Grillware' },
	{
		name: 'description',
		content: 'Welcome to Grillware',
	},
]

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { lang } = params
	const projects = [
		{
			name: 'Jokarium 🎬',
			description:
				lang === Lang.EN
					? 'A series of short animated films created using Houdini and Unreal Engine.'
					: 'HoudiniとUnreal Engineによる短編アニメ集を配信します。',
		},
		{
			name: 'Game Development 🪅',
			description:
				lang === Lang.EN
					? 'A series of Unity-based mini-games available on the App Store.'
					: 'Unity製のミニゲームシリーズで、App Storeで公開しています。',
		},
		{
			name: 'OSS 🚧',
			description:
				lang === Lang.EN
					? 'Open-source TUI applications, primarily developed in Rust.'
					: '主にRustで開発したTUIアプリをOSSとして公開しています。',
		},
		{
			name: 'Judar 🐦‍🔥',
			description:
				lang === Lang.EN
					? 'A 10,000-day journey to release daily Houdini creations, which started on October 20, 2024.'
					: '2024年10月20日からHoudiniに触り始め、練習過程を毎日公開する1万日間の旅を開始しました。',
		},
		{
			name: 'Ancient Brief 🩲',
			description:
				lang === Lang.EN
					? "Developing digital assets for briefs using Houdini's Copernicus and Vellum."
					: 'HoudiniのCopernicusとVellumでパンツをつくるデジタルアセットを誠意を込めて開発中です。',
		},
	]
	return projects
}

export default function Index() {
	const projects = useLoaderData<typeof loader>()

	return (
		<section className={styles.container}>
			<div className={styles.message}>
				<h1 className={styles.heading}>GRILLWARE PRESENTS</h1>
				<p className={styles.paragraph}>
					Enabling the gateway to transformative journeys.
				</p>
			</div>
			{projects.map((project, index) => (
				<div key={index} className={styles.projectItem}>
					<h2 className={styles.projectHeading}>{project.name}</h2>
					<p className={styles.projectDescription}>
						{project.description}
					</p>
				</div>
			))}
		</section>
	)
}
