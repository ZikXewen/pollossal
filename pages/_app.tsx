import { withTRPC } from '@trpc/next'
import { AppType } from 'next/dist/shared/lib/utils'
import superjson from 'superjson'

import '../styles/globals.css'
import { AppRouter } from './api/trpc/[trpc]'

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default withTRPC<AppRouter>({
  config: () => ({ url: '/api/trpc', transformer: superjson }),
})(MyApp)
