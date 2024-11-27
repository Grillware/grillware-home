import {
	MetaFunction,
	LoaderFunctionArgs,
	ActionFunction,
	ActionFunctionArgs,
} from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { SubmitButton } from '~/components/utils/SubmitButton'
import { TextField } from '~/components/utils/TextField'
import { useForm } from '~/hooks/useForm'
import { styles } from '~/styles/contactStyles'
import { Lang } from '~/types/lang'

export const meta: MetaFunction = () => [
	{
		title: 'Grillware - Contact',
	},
	{
		name: 'description',
		content: 'This is a contact form',
	},
]

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
	const lang = params.lang === 'ja' ? Lang.JA : Lang.EN
	const siteKey = context.cloudflare.env.TURNSTILE_SITE_KEY
	return { lang, siteKey }
}

const postmarkApiUrl = 'https://api.postmarkapp.com/email'

const verifyTurnstileToken = async (
	token: string,
	secretKey: string
): Promise<boolean> => {
	const response = await fetch(
		'https://challenges.cloudflare.com/turnstile/v0/siteverify',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `secret=${secretKey}&response=${token}`,
		}
	)
	const result: { success: boolean; [key: string]: unknown } =
		await response.json()
	return result.success
}

const sendEmail = async (url: string, token: string, payload: object) => {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'X-Postmark-Server-Token': token,
		},
		body: JSON.stringify(payload),
	})
	if (!response.ok) {
		const error: { ErrorCode: number; Message: string } =
			await response.json()
		throw new Error(error?.Message)
	}
	return response
}

export const action: ActionFunction = async ({
	request,
	context,
}: ActionFunctionArgs) => {
	const formData = new URLSearchParams(await request.text())
	const name = formData.get('name') || ''
	const email = formData.get('email') || ''
	const message = formData.get('message') || ''
	const turnstileResponse = formData.get('cf-turnstile-response') || ''
	const { POSTMARK_API_TOKEN, TURNSTILE_SECRET_KEY } = context.cloudflare.env

	if (!name || !email || !message) {
		return new Response(JSON.stringify({ error: 'Invalid input' }), {
			status: 400,
		})
	}

	// Turnstileのトークンを検証
	const isHuman = await verifyTurnstileToken(
		turnstileResponse,
		TURNSTILE_SECRET_KEY!
	)
	if (!isHuman) {
		return new Response(
			JSON.stringify({ error: 'Verification failed. Please try again.' }),
			{ status: 400 }
		)
	}

	const emailPayloadToGrillware = {
		From: 'info@grill-ware.com',
		To: 'tokunaga@grill-ware.com',
		Subject: `New Contact Form Submission from ${name}`,
		HtmlBody: `
			<strong>Name:</strong> ${name}<br/>
			<strong>Email:</strong> ${email}<br/>
			<strong>Message:</strong><br/>${message}`,
		MessageStream: 'outbound',
	}

	const emailPayloadToUser = {
		From: 'info@grill-ware.com',
		To: email,
		Subject: 'Thank you for contacting us',
		HtmlBody: `
			<p>Dear ${name},</p>
			<p>Thank you for reaching out to Grillware. Your message has been sent successfully, and we will get back to you shortly.</p>
			<p>Best regards, <br/>The Grillware Team</p>`,
		MessageStream: 'outbound',
	}

	return sendEmail(
		postmarkApiUrl,
		POSTMARK_API_TOKEN!,
		emailPayloadToGrillware
	)
		.then(async () => {
			return sendEmail(
				postmarkApiUrl,
				POSTMARK_API_TOKEN!,
				emailPayloadToUser
			)
				.then(() => {
					return new Response(JSON.stringify({ success: true }), {
						status: 200,
					})
				})
				.catch((error) => {
					return new Response(
						JSON.stringify({
							error: 'Failed to send confirmation email to user',
							details: error,
						}),
						{ status: 500 }
					)
				})
		})
		.catch((error) => {
			return new Response(
				JSON.stringify({
					error: 'Failed to send email to Grillware',
					details: error,
				}),
				{ status: 500 }
			)
		})
}

export default function Contact() {
	const { lang, siteKey } = useLoaderData<typeof loader>()
	const { formData, errors, handleChange, isSubmitting } = useForm({
		name: '',
		email: '',
		message: '',
	})

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
					<div
						className="cf-turnstile"
						data-sitekey={siteKey}
						data-callback="javascriptCallback"
					></div>
					<script
						src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
						defer
					></script>
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
