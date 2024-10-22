import { createClient } from 'newt-client-js'

import { Tag, News } from './types/newt'

const generateClient = (spaceUid: string, token: string) => {
	return createClient({
		spaceUid,
		token,
		apiType: 'cdn',
	})
}

export const getNewsList = async (
	spaceUid: string,
	appUid: string,
	token: string,
	lang: string
) => {
	const client = generateClient(spaceUid, token)
	const { items: tag } = await client.getContents<Tag>({
		appUid: appUid,
		modelUid: 'tag',
		query: {
			slug: 'devlog',
		},
	})
	const { items } = await client.getContents<News>({
		appUid: appUid,
		modelUid: 'article',
		query: {
			tag: { ne: tag[0]._id },
			lang,
			select: ['_id', '_sys', 'title', 'slug', 'tag', 'lang'],
		},
	})

	return items
}

export const getArticleList = async (
	spaceUid: string,
	appUid: string,
	token: string,
	lang: string // 言語を引数として受け取る
) => {
	const client = generateClient(spaceUid, token)
	const { items: tag } = await client.getContents<Tag>({
		appUid: appUid,
		modelUid: 'tag',
		query: {
			slug: 'devlog',
		},
	})
	const { items } = await client.getContents<News>({
		appUid: appUid,
		modelUid: 'article',
		query: {
			tag: tag[0]._id,
			lang,
			select: ['_id', '_sys', 'title', 'slug', 'tag', 'lang'],
		},
	})
	return items
}

export const getNewsBySlug = async (
	spaceUid: string,
	appUid: string,
	token: string,
	slug: string,
	lang?: string
) => {
	const client = generateClient(spaceUid, token)
	const { items } = await client.getContents<News>({
		appUid: appUid,
		modelUid: 'article',
		query: {
			slug,
			lang,
		},
	})

	// items配列から1件を取得（slugはユニークなので1件のみ）
	return items.length > 0 ? items[0] : null
}
