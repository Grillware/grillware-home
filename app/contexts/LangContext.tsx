import { createContext, ReactNode, useState, useEffect } from 'react'

import { Lang } from '~/types/lang'

type LangContextType = {
	currentLang: Lang
	setLang: (lang: Lang) => void
}

export const LangContext = createContext<LangContextType | undefined>(undefined)

export const LangProvider = ({ children }: { children: ReactNode }) => {
	const [currentLang, setCurrentLang] = useState<Lang>(Lang.EN) // 初期値はLang.ENに設定

	useEffect(() => {
		const langFromPath = window.location.pathname.split('/')[1]
		if (langFromPath === 'ja' || langFromPath === 'en') {
			setCurrentLang(langFromPath as Lang)
		}
	}, [])

	const setLang = (lang: Lang) => setCurrentLang(lang)

	return (
		<LangContext.Provider value={{ currentLang, setLang }}>
			{children}
		</LangContext.Provider>
	)
}
