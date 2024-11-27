import { MetaFunction, LoaderFunctionArgs } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'

import { formatDate } from '~/components/utils/formatDate'
import { styles } from '~/styles/aboutStyles'
import { Lang } from '~/types/lang'

export const meta: MetaFunction = () => [
	{
		title: 'Grillware - About',
	},
	{
		name: 'description',
		content:
			'Welcome to Grillware, where innovative solutions meet technology. Explore our offerings and discover how we can help your business grow.',
	},
]

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const lang = params.lang === 'ja' ? Lang.JA : Lang.EN
	return { lang }
}

const StyledLink = ({ href, children }: { href: string; children: string }) => (
	<Link className={styles.link} to={href}>
		{children}
	</Link>
)

// コンテンツ生成関数
const generateContent = (lang: Lang) => {
	const links = [
		{ href: 'https://remix.run/', text: 'Remix' },
		{
			href: 'https://www.cloudflare.com/ja-jp/developer-platform/pages/',
			text: 'Cloudflare Pages',
		},
		{ href: 'https://www.newt.so/', text: 'Newt' },
		{ href: 'https://panda-css.com/', text: 'Panda CSS' },
	]

	return lang === Lang.EN ? (
		<>
			<h1 className={styles.heading}>Hello there!</h1>
			<div className={styles.paragraph}>
				I&apos;m what you&apos;d call a &quot;one-man IT
				department,&quot; working as an in-house SE. I’ve spent most of
				my career in the classic world of web development, backend
				systems, and databases. But when it comes to creative stuff like
				3D modeling, animation, or lighting—it’s like trying to draw a
				masterpiece with my non-dominant hand. This site was thrown
				together using tools like
				{links.map((link, idx) => (
					<StyledLink key={idx} href={link.href}>
						{link.text}
					</StyledLink>
				))}
				. Honestly, the libraries do most of the heavy lifting, so hats
				off to OSS for making my life easier.
			</div>
			<div className={styles.paragraph}>
				The whole reason this site exists is because I’m into a pretty
				niche sport called &quot;Kabaddi.&quot; I wanted to help promote
				it by making a 3D video explaining the rules and sharing it
				online. I hit 30 this year and decided to dive into Houdini for
				the first time—it’s been a fun but brain-melting experience.
				This site is basically a place for me to share my Houdini
				experiments and creations. I hope you find something cool here!
			</div>
		</>
	) : (
		<>
			<h1 className={styles.heading}>ご挨拶</h1>
			<div className={styles.paragraph}>
				私は「一人情シス」と呼ばれる立場で社内SEをしています。Web開発、バックエンド、データベースといったオーソドックスなシステム畑を長く歩んできましたが、モデリングやアニメーション、ライティングなどの創造的な作業は苦手で、私にとっては「絵を描く」ような感覚です。
				このウェブサイトは
				{links.map((link, idx) => (
					<StyledLink key={idx} href={link.href}>
						{link.text}
					</StyledLink>
				))}
				によって構築しており、かなり怠惰にコーディングできています。
			</div>
			<div className={styles.paragraph}>
				そもそものきっかけは、私が関わっているマイナースポーツ「カバディ」の振興・普及に寄与したいという思いでした。ルール説明用の3DCG動画を作り、それをどこかに投稿したいという個人的な企画から始まりました。今年30歳になって初めてHoudiniを触り、脳のメモリを大量に持っていかれながら生活を送っています。
			</div>
			<div className={styles.paragraph}>
				このウェブサイトは、Houdiniで制作した練習や成果物を展示する場として運営しています。
				ここで何か興味深いものを見つけていただければ幸いです。
			</div>
		</>
	)
}

export default function Index() {
	const { lang }: { lang: Lang } = useLoaderData<typeof loader>()

	return (
		<section className={styles.container}>
			{generateContent(lang)}
			<div className={styles.signature}>
				{formatDate('2024-07-10')}
				<br />
				Grillware
			</div>
		</section>
	)
}
