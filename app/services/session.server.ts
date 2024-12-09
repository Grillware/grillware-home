import { createCookieSessionStorage } from '@remix-run/cloudflare'

// セッションストレージを設定
export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: '__session',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24, // 1日
	},
})

// セッションを取得
export async function getSession(request: {
	headers: { get: (arg0: string) => string | null | undefined }
}) {
	return sessionStorage.getSession(request.headers.get('Cookie'))
}

// セッションを保存
export async function commitSession(session) {
	return sessionStorage.commitSession(session)
}

// セッションを削除
export async function destroySession(session) {
	return sessionStorage.destroySession(session)
}
