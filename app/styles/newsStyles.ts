import { css } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

export const styles = {
	section: css({ m: '3rem auto', maxW: '4xl', px: '1.5rem' }),
	title: css({
		fontSize: '2.5rem',
		fontWeight: 'bold',
		mb: '2rem',
		hideBelow: 'sm',
	}),
	list: css({ listStyleType: 'none', padding: 0 }),
	listItem: css({
		borderBottom: '1px solid #ddd',
		p: '1rem 0',
		_hover: {
			transform: 'scale(1.01)',
		},
		transition: 'transform 0.3s ease',
	}),
	categoryDate: flex({
		align: 'center',
		justify: 'space-between',
		mb: '4',
	}),
	link: css({
		textDecoration: 'none',
		transition: 'color 0.3s ease',
		_hover: { color: 'violet.700' },
	}),
	tag: css({
		display: 'inline-block',
		bg: 'slate.800',
		color: 'slate.50',
		px: '0.75rem',
		py: '0.25rem',
		rounded: 'lg',
		fontSize: '0.875rem',
		fontWeight: 'medium',
	}),
	pagination: flex({
		justify: 'center',
		align: 'center',
		gap: '1rem',
		mt: '2rem',
	}),
	paginationButton: css({
		bg: 'slate.400',
		color: 'slate.50',
		px: '1rem',
		py: '0.5rem',
		cursor: 'pointer',
		rounded: '8',
		_hover: { bg: 'violet.700' },
		_disabled: { bg: 'violet.900', cursor: 'not-allowed' },
	}),
	noNewsMessage: css({
		textAlign: 'center',
		color: 'gray.500',
		fontSize: '1.25rem',
		mt: '2rem',
	}),
}
