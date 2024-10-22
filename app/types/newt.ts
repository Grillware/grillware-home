type NewtMeta = {
	createdAt: string
}
export type Tag = {
	_id: string
	slug: string
	name: string
}
export type News = {
	_id: string
	_sys: NewtMeta
	lang: string
	title: string
	slug: string
	body: string
	tag: Tag
}
