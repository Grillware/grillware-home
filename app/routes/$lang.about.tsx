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
			<h1 className={styles.heading}>Greetings</h1>
			<div className={styles.paragraph}>
				My initial exposure to IT was during my first year of
				university, where I was required to type the `ls` command into a
				Linux console during a lecture. From there, without much
				deviation, I began my career at a company engaged in the SES
				(System Engineering Services) industry. After two years of
				on-site assignments, I left the company and currently work as an
				in-house SE at a company entirely unrelated to IT.
			</div>
			<div className={styles.paragraph}>
				Throughout my career, I have engaged broadly and shallowly in
				conventional areas such as web development, backend systems, and
				databases. This website was constructed using tools like
				{links.map((link, idx) => (
					<StyledLink key={idx} href={link.href}>
						{link.text}
					</StyledLink>
				))}
				, allowing me to enjoy a somewhat lazy coding experience thanks
				to the excellent libraries and frameworks.
			</div>
			<div className={styles.paragraph}>
				The inspiration for delving into skills like modeling and
				animation stems from my involvement in promoting a niche sport
				called &quot;Kabaddi&quot;. My personal project began with the
				idea of creating a 3D CG video to explain the rules of the sport
				and sharing it online. However, at the age of 30, I began
				exploring Houdini for the first time, and I am now living a life
				where much of my mental capacity is consumed by its challenges.
			</div>
			<div className={styles.paragraph}>
				This website serves as a platform to showcase my practice works
				and deliverables using Houdini. I sincerely hope you find
				something of interest here.
			</div>
		</>
	) : (
		<>
			<h1 className={styles.heading}>ご挨拶</h1>
			<div className={styles.paragraph}>
				ITっぽいものに最初に触れたのは、大学時代でした。モデル論に関する講義でLinuxのコンソールにls
				コマンドを打たされただけですが、真っ暗の画面に文字だけで入出力が行われているのを目の当たりにした体験でした。
				そこから特に紆余曲折することなく、私はSES事業を展開する企業へ就職しました。
				客先常駐を2年経験して退職し、現在はITと全く関係ない業種の企業でいわゆる一人情シスを長くやっています。
			</div>
			<div className={styles.paragraph}>
				これまでに基幹システムの保守、DB設計、Web開発といったオーソドックスなシステム畑を広く浅く歩んできました。
				当ウェブサイトも
				{links.map((link, idx) => (
					<StyledLink key={idx} href={link.href}>
						{link.text}
					</StyledLink>
				))}
				によって構築しており、この優れたライブラリ群のおかげで怠惰にコーディングできています。
			</div>
			<div className={styles.paragraph}>
				モデラーやアニメーターといったクリエイター屋のスキルに興味を抱いたそもそものきっかけは、私が関わっているマイナースポーツ「カバディ」の振興・普及に寄与したいという思いからでした。
				ルールを分かりやすく説明する3DCG動画を作り、それを公開したいという個人的な企画が原点です。
				しかしながら、30歳になって初めてHoudiniを触り、脳のメモリを大量に持っていかれながら生活を送っています。
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
