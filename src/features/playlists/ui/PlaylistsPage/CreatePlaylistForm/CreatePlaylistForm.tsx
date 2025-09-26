import { type SubmitHandler, useForm } from 'react-hook-form'
import type { CreatePlaylistArgs } from '@/features/playlists/api/playlistsApi.types.ts'
import { useCreatePlaylistMutation } from '@/features/playlists/api/playlistsApi.ts'

export const CreatePlaylistForm = () => {
  const { register, handleSubmit, reset } = useForm<CreatePlaylistArgs>()

  const [createPlaylist, {data}] = useCreatePlaylistMutation()

  const onSubmit: SubmitHandler<CreatePlaylistArgs> = data => {
    //в data - наши title и description
    // с помощью функции-триггера createPlaylist data летит в качестве аргументов в createPlaylist в api
    createPlaylist(data).unwrap().then(()=>reset())
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