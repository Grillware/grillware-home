import { css } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

export const styles = {
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
