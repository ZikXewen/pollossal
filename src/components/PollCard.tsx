import type { Poll } from '@prisma/client'

const PollCard = ({ poll }: { poll: Poll }) => {
  console.log(poll)
  return <p>{poll.id}</p>
}

export default PollCard
