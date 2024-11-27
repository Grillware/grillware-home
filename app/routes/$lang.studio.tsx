import { useState } from 'react'

import { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'

import { getArticleList } from '~/newt.server'
import { styles } from '~/styles/studioStyles'

import { css } from 'styled-system/css'
import { container, flex } from 'styled-system/patterns'

export const meta: MetaFunction = () => [
	{ title: 'Grillware - Studio' },
	{ name: 'description', content: 'Here is Grillware Studio.' },
]

export const loader = async ({
	params,
	context,
	request,
}: LoaderFunctionArgs) => {
	const { lang } = params
	const domain = request.headers.get('host')
	const defaultData = {
		films: [
			{
				name: lang === 'ja' ? 'ANCIENTS' : 'ANCIENTS',
				description:
					lang === 'ja'
						? 'カバディを題材にした3DCGアニメーション'
						: 'A 3DCG animation based on the sport of Kabaddi.',
				url: 'https://www.youtube.com/channel/UCbHgL6VQB5vmFkExQkTJ4Bw',
			},
		],
		games: [
			{
				name: 'Surguess',
				description:
					lang === 'ja'
						? 'どの物体が一番表面積が大きいかを予想するミニゲーム'
						: 'A mini-game where players guess which object has the largest surface area.',
				url: 'https://apps.apple.com/jp/app/surguess/id6736586676',
			},
			{
				name: 'Bakery Text',
				description:
					lang === 'ja'
						? 'テキストベースのディフェンスゲーム'
						: 'A text-based defense game.',
				url: 'https://apps.apple.com/jp/app/bakery-text/id6535655350',
			},
		],
		oss: [
			{
				name: 'Digman',
				description:
					lang === 'ja'
						? '一人開発者向けのチケット管理TUIアプリケーション'
						: 'Ticket management TUI application for single developers.',
				url: 'https://github.com/grillware/digman',
			},
		],
		lab: [
			{
				name:
					lang === 'ja'
						? '多変量解析特論'
						: 'Introduction to Multivariate Analysis',
				description:
					lang === 'ja'
						? '基礎理論を抑えつつ、実践ではPythonやRを使わず、Rustで臨んだ特製テキストです'
						: 'A specially crafted text covering fundamental theories while using Rust, instead of Python or R.',
				url: `https://${domain}/${lang}/lab/stats`,
			},
		],
	}

	const { NEWT_SPACE_UID, NEWT_APP_UID, NEWT_CDN_API_TOKEN } =
		context.cloudflare.env
	const articles = await getArticleList(
		NEWT_SPACE_UID,
		NEWT_APP_UID,
		NEWT_CDN_API_TOKEN,
		lang!
	)
	const sortedArticles = articles.sort(
		(a, b) =>
			new Date(b._sys.createdAt).getTime() -
			new Date(a._sys.createdAt).getTime()
	)

	return Response.json({ ...defaultData, articles: sortedArticles, lang })
}

function JudarLink({ lang }: { lang: string }) {
	const styles = {
		linkContainer: flex({
			align: 'center',
			cursor: 'pointer',
			fontSize: '1.5rem',
			fontWeight: 'medium',
			mt: '1.5rem',
		}),
		link: css({
			color: 'slate.500',
			textDecoration: 'none',
			_hover: { textDecoration: 'underline', color: 'slate.300' },
		}),
		icon: css({
			marginRight: '0.5rem',
			fontSize: '0.8rem',
		}),
	}

	return (
		<div className={styles.linkContainer}>
			<span className={styles.icon}>▶</span>
			<Link
				to={`/${lang}/judar`}
				className={styles.link}
				rel="noopener noreferrer"
			>
				Judar
			</Link>
		</div>
	)
}

function Accordion({
	title,
	items,
	isOpen,
	toggle,
}: {
	title: string
	items: { name: string; description?: string; url?: string }[]
	isOpen: boolean
	toggle: () => void
}) {
	return (
		<>
			<button
				className={styles.sectionTitle}
				onClick={toggle}
				aria-expanded={isOpen}
			>
				<span
					className={`${isOpen ? styles.iconOpen : styles.iconClose}`}
				>
					▶
				</span>
				{title}
			</button>
			{isOpen && (
				<ul className={styles.list}>
					{items.map(({ name, description, url }) => (
						<li key={url || name} className={styles.listItem}>
							<a
								href={url}
								className={styles.link}
								rel="noopener noreferrer"
							>
								{name} {description ? ` - ${description}` : ''}
							</a>
						</li>
					))}
				</ul>
			)}
		</>
	)
}

// メインコンポーネント
export default function Index() {
	const { games, films, articles, oss, lang } = useLoaderData<typeof loader>()
	const [openSections, setOpenSections] = useState({
		films: true,
		games: false,
		articles: false,
		oss: false,
	})

	const toggleSection = (section: keyof typeof openSections) =>
		setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))

	return (
		<section
			className={container({
				maxW: '4xl',
				mx: 'auto',
				px: '1.5rem',
				py: '3rem',
			})}
		>
			<h1
				className={css({
					fontSize: '2rem',
					fontWeight: 'bold',
					marginBottom: '2rem',
					textAlign: 'center',
				})}
			>
				{lang === 'ja'
					? 'Grillware Studio の最新情報'
					: 'Latest from Grillware Studio'}
			</h1>
			<JudarLink lang={lang} />
			<Accordion
				title="Films"
				items={films}
				isOpen={openSections.films}
				toggle={() => toggleSection('films')}
			/>
			<Accordion
				title="Games"
				items={games}
				isOpen={openSections.games}
				toggle={() => toggleSection('games')}
			/>
			<Accordion
				title="Articles"
				items={articles.map((article) => ({
					name: article.title,
					url: `/${lang}/post/${article.slug}`,
				}))}
				isOpen={openSections.articles}
				toggle={() => toggleSection('articles')}
			/>
			<Accordion
				title="OSS"
				items={oss}
				isOpen={openSections.oss}
				toggle={() => toggleSection('oss')}
			/>
		</section>
	)
}
