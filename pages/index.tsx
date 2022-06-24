import type { NextComponentType, NextPage } from 'next'
import Head from 'next/head'

import { trpc } from '@/trpc'
import { useRef } from 'react'

const QuestionCreator: NextComponentType = () => {
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
      <main className="flex flex-col">
        <h1 className="text-2xl font-bold">Questions</h1>
        <ul>
          {data.map((data) => (
            <li className="text-xl" key={`${data.id}`}>
              {data.question}
            </li>
          ))}
        </ul>
        <QuestionCreator />
      </main>
    </div>
  )
}

export default Home
