import { css } from 'styled-system/css'
import { flex, vstack, hstack } from 'styled-system/patterns'

export const styles = {
	section: flex({
		flexWrap: 'wrap',
		align: 'center',
		justify: 'center',
		px: 8,
		gap: 8,
		my: 8,
	}),
	card: vstack({
		borderBottom: '1px solid #ddd',
		pb: '1rem',
		transition: 'transform 0.3s ease',
		_hover: { transform: 'scale(1.01)' },
	}),
	thumbnail: css({
		w: '300px',
		h: 'auto',
		objectFit: 'cover',
	}),
	info: hstack({}),
	prefix: css({
		fontWeight: 'normal',
		fontSize: '1.0rem',
		mr: 1,
	}),
	title: css({
		fontWeight: 'bold',
		fontSize: '1.2rem',
	}),
	date: css({
		color: 'slate.500',
	}),
}
