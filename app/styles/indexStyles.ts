import { css } from 'styled-system/css'
import { grid, gridItem } from 'styled-system/patterns'

export const styles = {
	container: grid({
		columns: 12,
		gap: 4,
		mb: 8,
		justifyItems: 'center',
	}),
	message: gridItem({
		colSpan: 12,
		color: 'slate.200',
		textAlign: 'center',
		bg: 'slate.900',
		w: '100%',
	}),
	heading: css({
		fontSize: { base: '3xl', sm: '5xl' },
		fontWeight: 'bold',
		py: 8,
	}),
	paragraph: css({
		fontSize: { base: 'lg', sm: 'xl' },
		lineHeight: 'tall',
		paddingBottom: 4,
	}),
	projectItem: gridItem({
		colSpan: { base: 12, sm: 6 },
		w: '92%',
		p: 4,
		rounded: 'lg',
		boxShadow:
			'-12px 12px 18px rgba(0, 0, 0, 0.3), inset 6px -6px 9px rgba(0, 0, 0, 0.3), inset -6px 6px 9px rgba(255, 255, 255, 0.6)',
		transition: 'transform 0.3s ease',
		_hover: {
			transform: 'scale(1.05)',
		},
	}),
	projectHeading: css({
		fontSize: 'xl',
		fontWeight: 'bold',
		mb: 2,
	}),
	projectDescription: css({
		fontSize: 'md',
	}),
}
