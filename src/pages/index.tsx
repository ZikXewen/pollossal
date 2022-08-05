import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import PollCard from '../components/PollCard'
import { env } from '../env/client.mjs'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const polls = trpc.useQuery(['poll.getMyPolls'])
  const url = env.NEXT_PUBLIC_URL
    ? `https://${env.NEXT_PUBLIC_URL}`
    : 'http://localhost:3000'
  // Possibly better with React.useCallback
  const copyUrl = (id: string) => {
    navigator.clipboard.writeText(`${url}/poll/${id}`)
  }

  return (
    <main className="min-h-screen container mx-auto items-center p-4">
      <Head>
        <title>Home | Pollossal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="text-center text-4xl py-12">Pollossal</h2>
      <Link href="create">
        <a className="btn btn-block btn-primary">Create new poll</a>
      </Link>
      {polls.data?.map((poll) => (
        <PollCard poll={poll} key={poll.id} copyUrl={copyUrl} />
      ))}
    </main>
  )
}

export default Home
