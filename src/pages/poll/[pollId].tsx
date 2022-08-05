import { NextPage } from 'next'
import Head from 'next/head'
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
      <h2 className="text-3xl mt-12 mb-4">{data.question}</h2>
      <p className="text-secondary-content ">
        Poll started at {data.createdAt.toLocaleString()}
      </p>
      {data.endsAt && (
        <p className="text-secondary-content">
          Ends at {data.endsAt.toLocaleString()}
        </p>
      )}
      <div className="w-full gap-4 mt-4">
        {data.choices.map((choice) =>
          data.currentVote ? (
            <div
              className={`h-12 p-4 rounded-full flex items-center w-full ${
                data.currentVote?.choiceId == choice.id &&
                'bg-secondary-content'
              }`}
            >
              <p className="flex-1">{choice.name}</p>
              <progress
                className="progress progress-primary w-1/5"
                max={data.voteCount}
                value={choice._count.votes}
              ></progress>
            </div>
          ) : (
            <button
              key={choice.id}
              className="btn btn-ghost normal-case w-full"
              onClick={() => mutate({ pollId, choiceId: choice.id })}
              disabled={isMutating || mutateData !== undefined}
            >
              {choice.name}
            </button>
          )
        )}
      </div>
    </main>
  )
}

export default Poll
