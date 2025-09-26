import { type SubmitHandler, useForm } from 'react-hook-form'
import type { CreatePlaylistArgs } from '@/features/playlists/api/playlistsApi.types.ts'

export const CreatePlaylistForm = () => {
  const { register, handleSubmit } = useForm<CreatePlaylistArgs>()

  const onSubmit: SubmitHandler<CreatePlaylistArgs> = data => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new playlist</h2>
      <div>
        <input {...register('title')} placeholder={'title'} />
      </div>
      <div>
        <input {...register('description')} placeholder={'description'} />
      </div>
      <button>create playlist</button>
    </form>
  )
}