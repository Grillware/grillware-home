import { useLang } from '~/hooks/useLang'
import { Lang } from '~/types/lang'

import { center, gridItem } from 'styled-system/patterns'

const styles = {
	langSwitch: gridItem({
		colSpan: { base: 1, sm: 6 },
		display: 'flex',
		justifyContent: 'end',
		gap: 4,
	}),
	langButton: center({
		cursor: 'pointer',
		color: 'slate.800',
		fontSize: '18px',
		transition: 'color 0.3s ease',
		_hover: {
			color: 'violet.500',
		},
	}),
}

export const LangSwitch = () => {
	const { currentLang, setLang } = useLang()

	const handleLanguageSwitch = (newLang: Lang) => {
		if (newLang === currentLang) return // 現在の言語なら処理しない
		setLang(newLang)
		const currentPathWithoutLang = window.location.pathname.replace(
			/^\/(en|ja)/,
			''
		) // 言語部分を削除
		window.location.href = `/${newLang}${currentPathWithoutLang}`
	}
	return (
		<div className={styles.langSwitch}>
			<button
				onClick={() => handleLanguageSwitch(Lang.JA)}
				className={styles.langButton}
				aria-label="switch to Japanese"
				hidden={currentLang === Lang.JA}
			>
				<img
					src="/japan.svg"
					alt="switch to Japanese Icon"
					width="48"
					height="48"
				/>
			</button>
			<button
				onClick={() => handleLanguageSwitch(Lang.EN)}
				className={styles.langButton}
				aria-label="switch to English"
				hidden={currentLang === Lang.EN}
			>
				<img
					src="/earth.svg"
					alt="switch to English Icon"
					width="48"
					height="48"
				/>
			</button>
		</div>
	)
}
