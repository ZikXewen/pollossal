import type { NextPage } from 'next'
import Head from 'next/head'

import { prisma } from '../utils/db'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(['getPolls'])
  if (isLoading || !data) return <div>Loading...</div>
  console.log(data)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="font-bold text-xl">This is working.</h1>
        <p>{data[0]?.question}</p>
      </main>
    </div>
  )
}

export default Home
