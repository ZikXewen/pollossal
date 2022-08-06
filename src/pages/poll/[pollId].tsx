import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { trpc } from '../../utils/trpc'
import Error404 from '../404'

const Poll: NextPage = () => {
  const router = useRouter()
  const { pollId } = router.query
  const { data, isLoading, isError } = trpc.useQuery([
    'poll.getById',
    pollId as string,
  ])
  const {
    mutate,
    isLoading: isMutating,
    data: mutateData,
  } = trpc.useMutation('poll.vote', {
    onSuccess: () => window.location.reload(),
  })
  if (isLoading)
    return (
      <main className="h-screen container mx-auto flex items-center p-4">
        <Head>
          <title>Poll | Pollossal</title>
        </Head>
        <progress className="progress progress-primary"></progress>
      </main>
    )
  if (isError || !data || typeof pollId !== 'string') return <Error404 />
  return (
    <main className="min-h-screen container mx-auto p-4 flex flex-col items-center">
      <Head>
        <title>{data.question} | Pollossal</title>
      </Head>
      <Link href="/">
        <h2 className="mt-8 btn btn-ghost btn-xl text-4xl w-full">Pollossal</h2>
      </Link>
      <div className="divider"></div>
      <h2 className="text-3xl mb-4">{data.question}</h2>
      <p className="text-secondary-content mb-4">
        Poll started at {data.createdAt.toLocaleString()}
      </p>
      {data.endsAt && (
        <p className="text-secondary-content mb-4">
          Ends at {data.endsAt.toLocaleString()}
        </p>
      )}
      {data.currentVote ||
      (data.endsAt && data.endsAt.getTime() < new Date().getTime()) ? (
        <table className="table w-full">
          <thead>
            <tr>
              <th className="w-2/5 lg:w-1/2">Choice</th>
              <th className="w-16 text-center">Votes</th>
              <th className="w-16 text-center">%</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.choices.map((choice) => (
              <tr
                key={choice.id}
                className={
                  data.currentVote?.choiceId == choice.id ? 'active' : ''
                }
              >
                <td className="whitespace-normal">{choice.name}</td>
                <td className="text-center">{choice._count.votes}</td>
                <td className="text-center">
                  {(
                    (choice._count.votes / data.voteCount) * 100 || 0
                  ).toFixed()}
                </td>
                <td>
                  <progress
                    className="progress progress-primary"
                    max={data.voteCount}
                    value={choice._count.votes}
                  ></progress>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="w-full gap-4 mt-4">
          {data.choices.map((choice) => (
            <button
              key={choice.id}
              className="btn btn-ghost normal-case w-full"
              onClick={() => mutate({ pollId, choiceId: choice.id })}
              disabled={isMutating || mutateData !== undefined}
            >
              {choice.name}
            </button>
          ))}
        </div>
      )}
    </main>
  )
}

export default Poll
