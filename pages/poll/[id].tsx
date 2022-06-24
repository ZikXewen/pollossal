import { trpc } from '@/trpc'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const PollPageComponent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = trpc.useQuery(['getPollById', { id }])
  if (!isLoading && !data) return <div>Not found.</div>
  if (isLoading || !data) return <div>Loading...</div>
  return <div>{data.question}</div>
}

const PollPage: NextPage = () => {
  const { query } = useRouter()
  const { id } = query
  if (!id || typeof id !== 'string') return <div>No ID</div>
  return <PollPageComponent id={id} />
}

export default PollPage
