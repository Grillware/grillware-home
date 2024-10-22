import katex from 'katex'

interface KaTeXProps {
	expression: string
	isFormula?: boolean
}

export const KaTeX = ({ expression, isFormula = false }: KaTeXProps) => {
	const html = katex.renderToString(expression)

	return (
		<span
			className={isFormula ? 'katex-block' : 'katex-inline'}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	)
}
