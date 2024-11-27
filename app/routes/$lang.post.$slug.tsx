import { useEffect, useState } from 'react'

import { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { formatDate } from '~/components/utils/formatDate'
import { getNewsBySlug } from '~/newt.server'
import { styles } from '~/styles/postStyles'

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
