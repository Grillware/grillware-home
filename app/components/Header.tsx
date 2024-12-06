import { useState, useEffect } from 'react'

import { Link, useLocation } from '@remix-run/react'

import logo from '~/components/assets/our_logo.svg'
import { useLang } from '~/hooks/useLang'

import { LangSwitch } from './utils/LangSwitch'

import { css } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

const styles = {
	header: flex({
		pos: 'sticky',
		top: 0,
		p: '1rem 2rem',
		boxShadow: 'lg',
		backdropFilter: 'auto',
		backdropBlur: 'sm',
		zIndex: '999',
		bg: 'white',
		align: 'center',
		justify: 'space-between',
		transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
	}),
	headerHidden: css({
		transform: 'translateY(-100%)',
		opacity: 0,
	}),
	menuButton: css({
		fontSize: { base: '1.6rem', sm: '2rem' },
		cursor: 'pointer',
		bg: 'none',
		border: 'none',
		color: 'slate.800',
		transition: 'transform 0.3s ease',
		hideFrom: 'sm',
		zIndex: '999',
	}),
	menuButtonOpen: css({
		transform: 'rotate(90deg)',
	}),
	menu: flex({
		pos: { base: 'fixed', sm: 'static' },
		top: { base: 0, sm: 'auto' },
		right: { base: 0, sm: 'auto' },
		w: { base: '38%', sm: 'auto' },
		h: { base: '100vh', sm: 'auto' },
		bg: { base: 'white', sm: 'transparent' },
		boxShadow: { base: 'lg', sm: 'none' },
		transform: { base: 'translateX(100%)', sm: 'none' },
		transition: 'transform 0.3s ease-in-out',
		direction: { base: 'column', sm: 'row' },
		align: { base: 'end', sm: 'center' },
		p: { base: '4rem 2rem 2rem', sm: '0' },
		gap: { base: '1rem', sm: '2rem' },
		zIndex: '998',
	}),
	menuOpen: css({
		transform: 'translateX(0)',
	}),
	menuItem: css({
		fontWeight: 'medium',
		fontSize: { base: '1.2rem', sm: '1.6rem' },
		color: 'slate.800',
		textDecoration: 'none',
		_hover: { color: 'violet.500' },
		_active: { color: 'violet.500' },
	}),
	activeMenuItem: css({
		color: 'violet.500',
	}),
	overlay: css({
		pos: 'fixed',
		top: 0,
		left: 0,
		w: '100%',
		h: '100vh',
		bg: 'rgba(0, 0, 0, 0.3)',
		zIndex: '997',
		opacity: 0,
		hideFrom: 'sm',
	}),
	overlayVisible: css({
		opacity: 1,
	}),
}

export const Header = () => {
	const { currentLang } = useLang()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isHeaderHidden, setIsHeaderHidden] = useState(false)
	const location = useLocation()

	const toggleMenu = () => setIsMenuOpen((prev) => !prev)

	const handleOverlayKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			toggleMenu()
		}
	}

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				setIsHeaderHidden(true)
			} else {
				setIsHeaderHidden(false)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<header
			className={`${styles.header} ${isHeaderHidden ? styles.headerHidden : ''}`}
		>
			<Link
				to={`/${currentLang}`}
				aria-label="home"
				className={css({
					fontSize: '1.8rem',
					fontWeight: 'bold',
					cursor: 'pointer',
				})}
			>
				<img src={logo} alt="Menu Icon" width="144" />
			</Link>
			<button
				aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
				className={`${styles.menuButton} ${isMenuOpen ? styles.menuButtonOpen : ''}`}
				onClick={toggleMenu}
			>
				<img
					src={isMenuOpen ? '/arrow_forward.svg' : '/menu.svg'}
					alt="Menu Icon"
					width="24"
					height="24"
				/>
			</button>
			<nav
				className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}
				aria-hidden={!isMenuOpen}
			>
				{[
					{ path: `/about`, label: 'About' },
					{ path: `/news`, label: 'News' },
					{ path: `/studio`, label: 'Studio' },
					{ path: `/lab`, label: 'Lab' },
					{ path: `/contact`, label: 'Contact' },
				].map(({ path, label }) => (
					<Link
						key={path}
						to={`/${currentLang}${path}`}
						className={`${styles.menuItem} ${
							location.pathname === `/${currentLang}${path}`
								? styles.activeMenuItem
								: ''
						}`}
						onClick={toggleMenu}
					>
						{label}
					</Link>
				))}
				<LangSwitch />
			</nav>

			{isMenuOpen && (
				<div
					className={`${styles.overlay} ${styles.overlayVisible}`}
					role="button"
					tabIndex={0}
					onClick={toggleMenu}
					onKeyDown={handleOverlayKeyDown}
				/>
			)}
		</header>
	)
}
