import { useState, useEffect } from 'react'

import { LoaderFunction, MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { formatDate } from '~/components/utils/formatDate'
import { styles } from '~/styles/judalStyles'

export const meta: MetaFunction = () => [
	{ title: 'Judar' },
	{
		name: 'description',
		content:
			'Every day, I endeavor to explore the expression of experience through Houdini. I extend my deepest respect, gratitude, and love to Houdini and its developers.',
	},
]

const checkImageExists = async (url: string) => {
	try {
		const response = await fetch(url, { method: 'HEAD' })
		return response.ok
	} catch {
		return false
	}
}

export const loader: LoaderFunction = async ({ context }) => {
	const { R2 } = context.cloudflare.env
	const objects = (await R2.list()).objects

	const modelData = await Promise.all(
		objects
			.filter(({ key }) => key.endsWith('.png'))
			.map(async ({ key, uploaded }) => {
				const title = key.replace('.png', '')
				const thumbnailUrl = `https://judar-bucket.grill-ware.com/${key}`
				const exists = await checkImageExists(thumbnailUrl)
				return {
					key,
					title,
					uploaded,
					thumbnailUrl: exists
						? thumbnailUrl
						: 'https://judar-bucket.grill-ware.com/alt-model-thumbnail.png',
				}
			})
	)

	// uploaded フィールドに基づいて降順（新しいものが上）にソート
	modelData.sort(
		(a, b) =>
			new Date(b.uploaded).getTime() - new Date(a.uploaded).getTime()
	)

	return Response.json(modelData)
}

export default function Index() {
	const modelData = useLoaderData<
		{
			key: string
			title: string
			uploaded: string
			thumbnailUrl: string
		}[]
	>()

	// modelDataの長さを基準に降順
	const [displayedModels, setDisplayedModels] = useState(
		modelData.slice(0, 6).map((model, index) => ({
			...model,
			displayIndex: modelData.length - index,
		}))
	)
	const [currentPage, setCurrentPage] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop !==
				document.documentElement.offsetHeight
			)
				return

			if (currentPage < Math.ceil(modelData.length / 6) - 1) {
				setCurrentPage((prev) => prev + 1)
				setDisplayedModels((prev) => [
					...prev,
					...modelData
						.slice((currentPage + 1) * 6, (currentPage + 2) * 6)
						.map((model, index) => ({
							...model,
							displayIndex:
								modelData.length - (prev.length + index),
						})),
				])
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [currentPage, modelData])

	return (
		<section className={styles.section}>
			{displayedModels.length > 0 ? (
				displayedModels.map(
					({ key, title, uploaded, thumbnailUrl, displayIndex }) => {
						const trimmedTitle = title.split('/')[0]
						return (
							<div key={key}>
								<img
									src={thumbnailUrl}
									alt={`Thumbnail for ${trimmedTitle}`}
									className={styles.thumbnail}
								/>
								<div className={styles.info}>
									<div className={styles.title}>
										<span className={styles.prefix}>
											{displayIndex}
										</span>
										{trimmedTitle}
									</div>
									<div className={styles.date}>
										{formatDate(uploaded)}
									</div>
								</div>
							</div>
						)
					}
				)
			) : (
				<div>No models available at the moment.</div>
			)}
		</section>
	)
}
