import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Error404: NextPage = () => {
  return (
    <main className="h-screen container mx-auto flex flex-col items-center justify-center p-4 gap-4">
      <Head>
        <title>Not Found | Pollossal</title>
      </Head>
      <div className="flex items-center">
        <h2 className="text-3xl">404</h2>
        <div className="divider divider-horizontal"></div>
        <p className="text-xl">This page does not exist.</p>
      </div>
      <Link href="/">
        <a className="btn btn-ghost">Back to home</a>
      </Link>
    </main>
  )
}

export default Error404
