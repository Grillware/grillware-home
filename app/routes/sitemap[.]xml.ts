import { generateSitemap } from '@nasa-gcn/remix-seo'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line import/no-unresolved
import { routes } from 'virtual:remix/server-build'

import type { LoaderFunctionArgs } from '@remix-run/cloudflare'

export function loader({ request }: LoaderFunctionArgs) {
	return generateSitemap(request, routes, {
		siteUrl: 'https://grill-ware.com',
	})
}
