import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useRouteError,
} from '@remix-run/react'
import katexStyles from 'katex/dist/katex.min.css?url'

import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { LangProvider } from './contexts/LangContext'
import styles from './index.css?url'

import type { LinksFunction } from '@remix-run/cloudflare'

import { css } from 'styled-system/css'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: katexStyles },
	{ rel: 'stylesheet', href: styles },
	{
		rel: 'preconnect',
		href: 'https://fonts.googleapis.com',
	},
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		href: 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap',
		rel: 'stylesheet',
	},
]

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<LangProvider>
			<html lang="en">
				<head>
					<meta charSet="utf-8" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1"
					/>
					<Meta />
					<Links />
				</head>
				<body>
					<div
						className={css({
							display: 'flex',
							flexDirection: 'column',
							minH: '100vh',
							maxW: { base: '100vw', sm: '90vw' },
							m: 'auto',
						})}
					>
						<Header />
						<main
							className={css({
								flex: 1,
							})}
						>
							{children}
						</main>
						<Footer />
					</div>
					<ScrollRestoration />
					<Scripts />
				</body>
			</html>
		</LangProvider>
	)
}

export default function App() {
	return <Outlet />
}

export function ErrorBoundary() {
	const error = useRouteError()

	// エラーが4xxや5xxのHTTPレスポンスであれば
	if (isRouteErrorResponse(error)) {
		return (
			<div>
				<h1>
					{error.status} {error.statusText}
				</h1>
				<p>{error.data}</p> {/* Responseからのエラーデータを表示 */}
			</div>
		)
	}
	// エラーが通常のJavaScriptエラーであれば
	else if (error instanceof Error) {
		return (
			<div>
				<h1>Error</h1>
				<p>{error.message}</p> {/* エラーメッセージを表示 */}
				<p>The stack trace is:</p>
				<pre>{error.stack}</pre>{' '}
				{/* デバッグ用にスタックトレースを表示 */}
			</div>
		)
	}
	// エラーが認識できない場合
	else {
		return <h1>Unknown Error</h1>
	}
}
