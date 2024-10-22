import { useEffect, useState } from 'react'

import { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { formatDate } from '~/components/utils/formatDate'
import { getNewsBySlug } from '~/newt.server'

import { css } from 'styled-system/css'

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
	const { lang, slug } = params
	const spaceUid = context.cloudflare.env.NEWT_SPACE_UID
	const appUid = context.cloudflare.env.NEWT_APP_UID
	const token = context.cloudflare.env.NEWT_CDN_API_TOKEN
	const news = await getNewsBySlug(spaceUid, appUid, token, slug!, lang!)

	if (!news) {
		throw new Response('Not Found', { status: 404 })
	}

	return Response.json({ news })
}

// ニュース記事詳細ページコンポーネント
export default function NewsDetailPage() {
	const { news } = useLoaderData<typeof loader>()
	const [isVisible, setIsVisible] = useState(false)

	// コンポーネントがマウントされたときにフェードインを開始
	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 0)
		return () => clearTimeout(timer)
	}, [])

	const styles = {
		container: css({
			m: '2rem auto',
			maxW: '6xl',
			px: 8,
		}),
		heading: css({
			mb: '16',
			fontSize: '3xl',
			fontWeight: 'bold',
			textAlign: 'center',
			pos: 'relative',
			letterSpacing: 'wide',
			color: 'slate.800',
			textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
			_after: {
				content: '""',
				display: 'block',
				w: '[100px]',
				h: '[3px]',
				bg: 'slate.700',
				m: '0 auto',
				pos: 'absolute',
				bottom: '[-16px]',
				left: '50%',
				transform: 'translateX(-50%)',
				rounded: 'lg',
			},
		}),
		articleBody: css.raw({
			opacity: 0,
			transition: 'opacity 0.5s ease-in',

			'&.fadeIn': {
				opacity: 1,
			},
			'& p': {
				fontSize: '1rem',
				lineHeight: '1.8',
				mb: '1.5rem',
				textAlign: 'justify',
			},
			'& ol': {
				pl: '1.5rem',
				mb: '1.5rem',
			},
			'& ol > li': {
				fontSize: '1rem',
				lineHeight: '1.8',
				mb: '0.75rem',
				'&::marker': {
					fontWeight: 'bold',
				},
			},
			'& h2': {
				fontSize: '1.75rem',
				fontWeight: 'bold',
				borderBottom: '1px solid',
				borderColor: 'slate.800',
				pb: '0.5rem',
				m: '2rem 0 1rem',
			},
			'& pre': {
				bg: 'slate.800',
				p: '4',
				rounded: '8',
				overflowX: 'auto',
				fontFamily: 'Consolas, "Courier New", monospace',
				lineHeight: '1.6',
				mb: '1.5rem',
				fontSize: '0.8rem',
			},
			'& pre code': {
				color: 'teal.200',
			},
		}),
		signature: css({
			textAlign: 'right',
			fontStyle: 'italic',
			color: 'slate.600',
			mt: '32',
		}),
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>{news.title}</h1>
			<article
				className={`${css(styles.articleBody)} ${isVisible ? 'fadeIn' : ''}`}
				dangerouslySetInnerHTML={{
					__html: `${news.body}`,
				}}
			/>
			<div className={styles.signature}>
				{formatDate(news._sys.createdAt)}
				<br />
				Grillware
			</div>
		</div>
	)
}
