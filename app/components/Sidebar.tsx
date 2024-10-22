import { Link } from '@remix-run/react'

import { css } from 'styled-system/css'
import { container } from 'styled-system/patterns'

type SidebarProps = {
	pages: { title: string; slug: string }[]
}

export function Sidebar({ pages }: SidebarProps) {
	const styles = {
		container: container({
			w: '250px',
			bg: 'slate.100',
		}),
		title: css({
			fontSize: '1.25rem',
			mb: '1rem',
		}),
		list: css({
			listStyle: 'none',
			p: 0,
		}),
		listItem: css({
			mb: '0.5rem',
		}),
		link: css({
			textDecoration: 'none',
			color: 'lime.900',
			fontWeight: '500',
		}),
	}

	function getSlugFromFilename(filename: string): string {
		const parts = filename.split('.')
		return parts[parts.length - 1]
	}

	return (
		<aside className={styles.container}>
			<h2 className={styles.title}>Documentation</h2>
			<ul className={styles.list}>
				{pages.map((page) => (
					<li key={page.slug} className={styles.listItem}>
						<Link
							to={`./${getSlugFromFilename(page.slug)}`}
							className={styles.link}
						>
							{page.title}
						</Link>
					</li>
				))}
			</ul>
		</aside>
	)
}
