import type { NextPage } from 'next'
import Head from 'next/head'

import { trpc } from '@/trpc'
import { useRef } from 'react'
import Link from 'next/link'

const PollCreator: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const client = trpc.useContext()
  const { mutate, isLoading } = trpc.useMutation('addPoll', {
    onSuccess: () => {
      client.invalidateQueries('getPolls')
      if (inputRef.current) inputRef.current.value = ''
    },
  })
  return (
    <input
      ref={inputRef}
      disabled={isLoading}
      onKeyDown={(e) => {
        if (e.key === 'Enter') mutate({ question: e.currentTarget.value })
      }}
    />
  )
}

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(['getPolls'])
  if (isLoading || !data) return <div>Loading...</div>

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col p-8">
        <h1 className="text-2xl font-bold">Ongoing Polls</h1>
        <div className="flex flex-col">
          {data.map((data) => (
            <Link href={`/poll/${data.id}`} key={data.id}>
              <a className="text-xl py-2">{data.question}</a>
            </Link>
          ))}
        </div>
        <PollCreator />
      </main>
    </div>
  )
}

export default Home
