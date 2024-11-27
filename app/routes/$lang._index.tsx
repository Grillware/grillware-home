import { MetaFunction } from '@remix-run/cloudflare'

import { styles } from '~/styles/indexStyles'

export const meta: MetaFunction = () => [
	{ title: 'Grillware' },
	{
		name: 'description',
		content: 'Welcome to Grillware',
	},
]

const projects = [
	{
		name: 'Ancient',
		description:
			'A 3D CG short film inspired by the sport of Kabaddi, created using Houdini 20.5 and Unreal Engine 5. This project aims to explore the intersection of technology and the cultural heritage of Kabaddi.',
	},
	{
		name: 'Judar',
		description:
			'On October 20, 2024, I began a 10,000-day journey to release daily assets made with Houdini. This initiative focuses on building expertise in 3D CGI over an extended period.',
	},
	{
		name: 'Game Development',
		description:
			'A series of free mini-games developed in Unity, available on the App Store, covering a variety of genres.',
	},
	{
		name: 'Asset Sales',
		description:
			"Offering various 3D models and VFX assets for sale on the 'FAB' marketplace.",
	},
]

export default function Index() {
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
