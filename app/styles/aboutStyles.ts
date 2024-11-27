import { css } from 'styled-system/css'
import { grid, gridItem } from 'styled-system/patterns'

export const styles = {
	container: grid({ columns: 12, gap: 4, p: 4 }),
	heading: gridItem({
		colStart: { base: 2, sm: 4 },
		colEnd: { base: 12, sm: 10 },
		fontSize: '2xl',
		fontWeight: 'bold',
		mb: 8,
	}),
	paragraph: gridItem({
		colStart: { base: 2, sm: 4 },
		colEnd: { base: 12, sm: 10 },
		mb: 4,
	}),
	signature: gridItem({
		colStart: { base: 2, sm: 4 },
		colEnd: { base: 12, sm: 10 },
		textAlign: 'right',
		fontStyle: 'italic',
		color: 'slate.600',
		mt: 24,
	}),
	link: css({
		textDecoration: 'underline',
		px: 1,
		color: 'slate.600',
		_hover: { color: 'slate.400' },
	}),
}
