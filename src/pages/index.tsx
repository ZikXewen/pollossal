import type { NextPage } from 'next'
import Head from 'next/head'
import PollCard from '../components/PollCard'
import { env } from '../env/client.mjs'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const hello = trpc.useQuery(['poll.getMyPolls'])
  const url = env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'
  // Possibly better with React.useCallback
  const copyUrl = (id: string) => {
    navigator.clipboard.writeText(`${url}/poll/${id}`)
  }

  return (
    <>
      <Head>
        <title>Pollossal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen container mx-auto items-center p-4">
        <h2 className="text-center text-4xl py-12">Pollossal</h2>
        {hello.data?.map((poll) => (
          <PollCard poll={poll} key={poll.id} copyUrl={copyUrl} />
        ))}
      </main>
    </>
  )
}

export default Home
