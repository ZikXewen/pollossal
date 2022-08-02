import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createPollInputType,
  createPollValidator,
} from '../utils/sharedValidators'
import { trpc } from '../utils/trpc'

const Create: NextPage = () => {
  const router = useRouter()
  const { control, register, handleSubmit, formState } =
    useForm<createPollInputType>({
      defaultValues: { choices: [] },
      resolver: zodResolver(createPollValidator),
    })
  const { fields, append, remove } = useFieldArray<createPollInputType>({
    name: 'choices',
    control,
  })
  const { mutate, isLoading, data } = trpc.useMutation('poll.create', {
    onSuccess: ({ id }) => router.push(`poll/${id}`),
  })
  if (isLoading || data)
    return (
      <div className="h-screen container mx-auto flex items-center p-4">
        <progress className="progress progress-primary"></progress>
      </div>
    )
  return (
    <main className="h-screen container mx-auto items-center p-4">
      <Head>
        <title>Create Poll | Pollossal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="text-center text-4xl py-12">Create Poll</h2>
      <form onSubmit={handleSubmit((data) => mutate(data))}>
        <label className="label">
          <span className="label-text">Topic</span>
          <span className="label-text-alt text-error">
            {formState.errors.question?.message}
          </span>
        </label>
        <input
          type="text"
          className="input input-bordered rounded-md w-full mb-4"
          placeholder="Are you ok, Annie?"
          {...register('question')}
        />
        <label className="label">
          <span className="label-text">Choices</span>
          <span className="label-text-alt text-error">
            {formState.errors.choices?.message ||
              formState.errors.choices?.find?.((i) => i)?.name?.message}
          </span>
        </label>
        <table className="table table-zebra w-full mb-4">
          <thead>
            <th>No.</th>
            <th>Name</th>
            <th></th>
          </thead>
          <tbody>
            {fields.map((data, index) => (
              <tr key={data.id}>
                <th>{index + 1}</th>
                <td>
                  <input
                    placeholder="Name"
                    {...register(`choices.${index}.name`, {
                      required: true,
                    })}
                    className="input input-bordered w-full"
                  />
                </td>
                <th>
                  <button
                    type="button"
                    className="btn btn-error btn-outline w-full"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          className="btn btn-outline w-full mb-8"
          onClick={() => append({ name: '' })}
        >
          Add New Choice
        </button>
        <input type="submit" className="btn btn-primary w-full" />
      </form>
    </main>
  )
}

export default Create
