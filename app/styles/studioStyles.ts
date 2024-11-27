import { css } from 'styled-system/css'

export const styles = {
	sectionTitle: css({
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
		fontSize: '1.5rem',
		fontWeight: 'medium',
		mt: '1.5rem',
		mb: '1rem',
	}),
	list: css({
		listStyleType: 'none',
		padding: 0,
		fontSize: '1.125rem',
		marginLeft: '1.5rem',
	}),
	listItem: css({ marginBottom: '0.5rem' }),
	link: css({
		color: 'slate.500',
		textDecoration: 'none',
		_hover: { textDecoration: 'underline', color: 'slate.300' },
	}),
	iconOpen: css({
		marginRight: '0.5rem',
		fontSize: '0.8rem',
		transform: 'rotate(90deg)',
		transition: 'transform 0.3s ease',
	}),
	iconClose: css({
		marginRight: '0.5rem',
		fontSize: '0.8rem',
		transform: 'rotate(0deg)',
		transition: 'transform 0.3s ease',
	}),
}
