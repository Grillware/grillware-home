import { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { commitSession, getSession } from '~/services/session.server'

import { css } from 'styled-system/css'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request)
	let userId = session.get('userId')

	// セッションIDがない場合は新規生成
	if (!userId) {
		userId = crypto.randomUUID()
		session.set('userId', userId)
	}

	const headers = new Headers({
		'Set-Cookie': await commitSession(session),
	})

	return Response.json({ userId }, { headers })
}

export default function GamePage() {
	const { userId } = useLoaderData<typeof loader>()

	const styles = {
		button: css({
			p: '0.75rem 1.5rem',
			bg: {
				base: 'slate.800',
				_disabled: 'slate.200',
				_hover: 'slate.500',
			},
			color: 'slate.50',
			border: 'none',
			rounded: '4px',
			cursor: { base: 'pointer', _disabled: 'not-allowed' },
			fontSize: '1rem',
			transition: 'background-color 0.3s',
		}),
	}

	const joinGame = async () => {
		const response = await fetch(
			'https://axum-workers-templates.tokunaga.workers.dev/',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user_id: userId, room: '1' }),
			}
		)

		if (!response.ok) {
			console.error(
				'Failed to join game:',
				response.status,
				response.statusText
			)
			return
		}

		const data = await response.json()
		console.log('Server response message:', data.message)
	}

	return (
		<div>
			<button className={styles.button} onClick={joinGame}>
				Join Game
			</button>
		</div>
	)
}
