import { useMemo, useCallback } from 'react'

import { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { Link, useLoaderData, useSearchParams } from '@remix-run/react'

import { formatDate } from '~/components/utils/formatDate'
import { getNewsList } from '~/newt.server'
import { styles } from '~/styles/newsStyles'
import { News } from '~/types/newt'

const ITEMS_PER_PAGE = 6

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
	const { lang } = params
	const spaceUid = context.cloudflare.env.NEWT_SPACE_UID
	const appUid = context.cloudflare.env.NEWT_APP_UID
	const token = context.cloudflare.env.NEWT_CDN_API_TOKEN
	const newsList = await getNewsList(spaceUid, appUid, token, lang!)
	const sortedNewsList = newsList.sort((a, b) => {
		return (
			new Date(b._sys.createdAt).getTime() -
			new Date(a._sys.createdAt).getTime()
		)
	})
	return Response.json({ news: sortedNewsList, lang })
}

export default function NewsPage() {
	const { news, lang } = useLoaderData<typeof loader>()
	const [searchParams, setSearchParams] = useSearchParams()
	const currentPage = useMemo(
		() => parseInt(searchParams.get('page') || '1', 10),
		[searchParams]
	)
	const paginatedNewsList = useMemo(
		() =>
			news.slice(
				(currentPage - 1) * ITEMS_PER_PAGE,
				currentPage * ITEMS_PER_PAGE
			),
		[news, currentPage]
	)
	const totalPages = useMemo(
		() => Math.ceil(news.length / ITEMS_PER_PAGE),
		[news]
	)

	const handlePageChange = useCallback(
		(page: number) => () => setSearchParams({ page: String(page) }),
		[setSearchParams]
	)

	return (
		<section className={styles.section}>
			<h1 className={styles.title}>News</h1>
			{news.length === 0 ? (
				<p className={styles.noNewsMessage}>
					There are currently no news articles available.
				</p>
			) : (
				<>
					<ul className={styles.list}>
						{paginatedNewsList.map((news: News) => (
							<Link
								key={news._id}
								to={`/${lang}/post/${news.slug}`}
								className={styles.link}
							>
								<li className={styles.listItem}>
									<div className={styles.categoryDate}>
										<span className={styles.tag}>
											{news.tag.name}
										</span>
										{formatDate(news._sys.createdAt)}
									</div>
									{news.title}
								</li>
							</Link>
						))}
					</ul>

					{/* ページネーション */}
					<div className={styles.pagination}>
						{Array.from(
							{ length: totalPages },
							(_, i) => i + 1
						).map((page) => (
							<button
								key={page}
								className={styles.paginationButton}
								onClick={handlePageChange(page)}
								disabled={page === currentPage}
								aria-label={`Go to page ${page}`}
							>
								{page}
							</button>
						))}
					</div>
				</>
			)}
		</section>
	)
}
