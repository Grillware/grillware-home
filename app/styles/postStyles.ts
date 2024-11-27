import { css } from 'styled-system/css'

export const styles = {
	container: css({
		m: '2rem auto',
		maxW: '6xl',
		px: 8,
	}),
	heading: css({
		mb: '16',
		fontSize: '3xl',
		fontWeight: 'bold',
		textAlign: 'center',
		pos: 'relative',
		letterSpacing: 'wide',
		color: 'slate.800',
		textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
		_after: {
			content: '""',
			display: 'block',
			w: '[100px]',
			h: '[3px]',
			bg: 'slate.700',
			m: '0 auto',
			pos: 'absolute',
			bottom: '[-16px]',
			left: '50%',
			transform: 'translateX(-50%)',
			rounded: 'lg',
		},
	}),
	articleBody: css.raw({
		opacity: 0,
		transition: 'opacity 0.5s ease-in',

		'&.fadeIn': {
			opacity: 1,
		},
		'& p': {
			fontSize: '1rem',
			lineHeight: '1.8',
			mb: '1.5rem',
			textAlign: 'justify',
		},
		'& ol': {
			pl: '1.5rem',
			mb: '1.5rem',
		},
		'& ol > li': {
			fontSize: '1rem',
			lineHeight: '1.8',
			mb: '0.75rem',
			'&::marker': {
				fontWeight: 'bold',
			},
		},
		'& h2': {
			fontSize: '1.75rem',
			fontWeight: 'bold',
			borderBottom: '1px solid',
			borderColor: 'slate.800',
			pb: '0.5rem',
			m: '2rem 0 1rem',
		},
		'& pre': {
			bg: 'slate.800',
			p: '4',
			rounded: '8',
			overflowX: 'auto',
			fontFamily: 'Consolas, "Courier New", monospace',
			lineHeight: '1.6',
			mb: '1.5rem',
			fontSize: '0.8rem',
		},
		'& pre code': {
			color: 'teal.200',
		},
	}),
	signature: css({
		textAlign: 'right',
		fontStyle: 'italic',
		color: 'slate.600',
		mt: '32',
	}),
}
