import { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import frontMatter from 'front-matter'

import { css } from 'styled-system/css'
import { container } from 'styled-system/patterns'

type TopicSlugType = {
	[key: string]: string
}

const TopicSlug: Record<'ja' | 'en', TopicSlugType> = {
	ja: {
		stats: '統計解析特論',
		alog: 'アルゴリズムとデータ構造',
		pkl: 'PKLにおける戦術的アプローチの定量的評価と競技的意義',
	},
	en: {
		stats: 'Advanced Statistics',
		alog: 'Algorithms and Data Structures',
		pkl: 'Quantitative Evaluation of Tactical Approaches in the Pro Kabaddi League and Their Competitive Significance',
	},
}

type GitHubFile = {
	name: string
	download_url: string
}

type FrontMatterAttributes = {
	title?: string
}

type LoaderData = {
	pages: { title: string; slug: string }[]
	lang: 'ja' | 'en'
	error?: string
}

export const meta: MetaFunction = () => [
	{ title: 'Lab - Grillware Studio' },
	{ name: 'description', content: 'Grillware Studio - Lab Section' },
]

const fetchMDXFiles = async (lang: string) => {
	const response = await fetch(
		`https://api.github.com/repos/grillware/grillware-home/contents/app/routes/`,
		{
			headers: {
				'User-Agent': 'Grillware-Home',
			},
		}
	)
	if (!response.ok)
		throw new Error(`GitHub API request failed: ${response.status}`)
	const files: GitHubFile[] = await response.json()
	return files.filter(
		(file) => file.name.endsWith('.mdx') && file.name.startsWith(`${lang}.`)
	)
}

// MDXファイルのタイトルを抽出
const extractTitle = async (file: GitHubFile) => {
	const res = await fetch(file.download_url)
	const mdxContent = await res.text()

	try {
		const { attributes } = frontMatter(mdxContent)
		const slug = file.name.replace('.mdx', '')
		return {
			slug,
			title:
				(attributes as FrontMatterAttributes).title ||
				slug.replace(/-/g, ' '),
		}
	} catch (_) {
		const slug = file.name.replace('.mdx', '')
		return {
			slug,
			title: slug.replace(/-/g, ' '), // Use the filename as fallback
		}
	}
}

export const loader = async ({
	params,
}: LoaderFunctionArgs): Promise<LoaderData> => {
	const { lang } = params
	if (!lang || (lang !== 'ja' && lang !== 'en'))
		throw new Response('Not Found', { status: 404 })

	try {
		const files = await fetchMDXFiles(lang)
		const pages = await Promise.all(files.map(extractTitle))
		return { pages, lang }
	} catch (error: unknown) {
		if (error instanceof Error) {
			return { pages: [], lang, error: error.message }
		}
		return { pages: [], lang }
	}
}

// ページをトピックとチャプターごとにグループ化
const groupPagesByTopic = (pages: { title: string; slug: string }[]) => {
	return pages.reduce(
		(acc, { title, slug }) => {
			const [_, __, topic, chapter] = slug.split('.')
			const chapterNumber = chapter.replace('chapter', '')
			if (!acc[topic]) acc[topic] = []
			acc[topic].push({ title, chapter: chapterNumber })
			return acc
		},
		{} as Record<string, { title: string; chapter: string }[]>
	)
}

const TopicTree = ({
	pages,
	lang,
}: {
	pages: { title: string; slug: string }[]
	lang: 'ja' | 'en'
}) => {
	const groupedPages = groupPagesByTopic(pages)

	return (
		<div>
			{Object.entries(groupedPages).map(([topic, items]) => {
				const topicName = TopicSlug[lang][topic] || topic
				return (
					<section key={topic}>
						<h2
							className={css({
								fontSize: '1.75rem',
								fontWeight: 'bold',
								mb: '1rem',
								color: 'slate.700',
							})}
						>
							{topicName}
						</h2>
						<ul>
							{items.map(({ title, chapter }) => (
								<li
									key={chapter}
									className={css({ mb: '0.5rem' })}
								>
									<Link
										to={`/${lang}/lab/${topic}/chapter${chapter}`}
										className={css({
											color: 'slate.500',
											textDecoration: 'none',
											_hover: {
												textDecoration: 'underline',
											},
										})}
									>
										Chapter {chapter}: {title}
									</Link>
								</li>
							))}
						</ul>
					</section>
				)
			})}
		</div>
	)
}

export default function Lab() {
	const { pages, lang, error } = useLoaderData<typeof loader>()

	if (error) {
		return (
			<div className={container({ maxW: '4xl', mx: 'auto' })}>
				<h1>Error loading data</h1>
				<p>{error}</p>
			</div>
		)
	}

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
					mb: '2rem',
					textAlign: 'center',
				})}
			>
				Documents - Grillware Lab
			</h1>
			<TopicTree pages={pages} lang={lang} />
		</section>
	)
}
