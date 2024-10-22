import {
	MetaFunction,
	ActionFunction,
	LoaderFunctionArgs,
} from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { SubmitButton } from '~/components/utils/SubmitButton'
import { TextField } from '~/components/utils/TextField'
import { useForm } from '~/hooks/useForm'
import { Lang } from '~/types/lang'

import { css } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

export const meta: MetaFunction = () => [
	{
		title: 'Grillware - Contact',
	},
	{
		name: 'description',
		content: 'This is a contact form',
	},
]

// loader関数で言語設定を取得
export const loader = async ({ params }: LoaderFunctionArgs) => {
	const lang = params.lang === 'ja' ? Lang.JA : Lang.EN
	return { lang }
}

// action関数はそのままですが、レスポンスの文言も言語に応じて調整可能です
export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData()
	const name = formData.get('name')
	const email = formData.get('email')
	const message = formData.get('message')

	// フォームデータのバリデーション処理
	if (
		typeof name !== 'string' ||
		typeof email !== 'string' ||
		typeof message !== 'string'
	) {
		return Response.json(
			{ error: 'Invalid form submission' },
			{ status: 400 }
		)
	}

	// フォームデータの処理
	try {
		return Response.json({ success: true })
	} catch (_) {
		return Response.json({ error: 'Submission failed' }, { status: 500 })
	}
}

export default function Contact() {
	const { lang } = useLoaderData<typeof loader>()
	const { formData, errors, handleChange, isSubmitting } = useForm({
		name: '',
		email: '',
		message: '',
	})

	const styles = {
		container: flex({
			direction: 'column',
			align: 'center',
			minH: '100vh',
			bg: 'slate.100',
			p: '2rem',
		}),
		form: css({
			w: '100%',
			maxW: '500px',
			bg: 'slate.50',
			p: '2rem',
			rounded: '8px',
			boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
		}),
		title: css({
			fontSize: '2rem',
			marginBottom: '1.5rem',
			textAlign: 'center',
			color: 'slate.700',
		}),
		field: css({
			marginBottom: '1.5rem',
		}),
		buttonContainer: flex({
			direction: 'column',
			align: 'center',
		}),
	}

	// 言語に応じたフォームタイトルや説明
	const title = lang === Lang.EN ? 'Contact Us' : 'お問い合わせ'
	const nameLabel = lang === Lang.EN ? 'Name' : 'お名前'
	const emailLabel = lang === Lang.EN ? 'Email Address' : 'メールアドレス'
	const messageLabel = lang === Lang.EN ? 'Message' : 'メッセージ'
	const submitButtonText = lang === Lang.EN ? 'Submit' : '送信'

	return (
		<section className={styles.container}>
			<h1 className={styles.title}>{title}</h1>
			<form className={styles.form} method="post">
				<div className={styles.field}>
					<TextField
						id="name"
						label={nameLabel}
						name="name"
						value={formData.name}
						onChange={handleChange}
						error={errors.name}
						required
					/>
				</div>
				<div className={styles.field}>
					<TextField
						id="email"
						label={emailLabel}
						name="email"
						type="email"
						value={formData.email}
						onChange={handleChange}
						error={errors.email}
						required
					/>
				</div>
				<div className={styles.field}>
					<TextField
						id="message"
						label={messageLabel}
						name="message"
						value={formData.message}
						onChange={handleChange}
						error={errors.message}
						required
						isTextArea
					/>
				</div>
				<div className={styles.buttonContainer}>
					<SubmitButton
						isSubmitting={isSubmitting}
						disabled={
							isSubmitting || Object.keys(errors).length > 0
						}
					>
						{submitButtonText}
					</SubmitButton>
				</div>
			</form>
		</section>
	)
}
