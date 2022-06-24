import type { NextPage } from 'next'
import Head from 'next/head'

import { prisma } from '../utils/db'

const Home: NextPage<{ questions: string }> = ({ questions }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="font-bold text-xl">This is working.</h1>
        <p>{questions}</p>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const questions = await prisma.poll.findMany()
  return {
    props: {
      questions: JSON.stringify(questions),
    },
  }
}
