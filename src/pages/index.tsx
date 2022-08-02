import type { NextPage } from 'next'
import Head from 'next/head'
import PollCard from '../components/PollCard'
import { trpc } from '../utils/trpc'

type TechnologyCardProps = {
  name: string
  description: string
  documentation: string
}

const Home: NextPage = () => {
  const hello = trpc.useQuery(['poll.getMyPolls'])

  return (
    <>
      <Head>
        <title>Pollossal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen container mx-auto items-center py-16">
        <h2 className="text-center text-4xl">Pollossal</h2>
        {hello.data?.map((poll) => (
          <PollCard poll={poll} key={poll.id} />
        ))}
      </main>
    </>
  )
}

export default Home
