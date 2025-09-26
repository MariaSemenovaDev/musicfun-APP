import { useDeletePlaylistMutation, useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi.ts'
import s from './PlaylistsPage.module.css'
import { CreatePlaylistForm } from '@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm.tsx'
import { useUpdatePlaylistMutation } from '../../api/playlistsApi'

export const PlaylistsPage = () => {

  const { data } = useFetchPlaylistsQuery()
  const [deletePlaylist] = useDeletePlaylistMutation()
  const [updatePlaylist] = useUpdatePlaylistMutation()

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Are you sure you want to delete the playlist?')) {
      deletePlaylist(playlistId)
    }
  }

  const updatePlaylistHandler = (playlistId: string) => {
    updatePlaylist({
      playlistId,
      body: {
        title: 'update title',
        description: '2',
        tagIds: [],
      },
    })
  }

  return (
    <div>
      <h1>Playlists page</h1>
      <CreatePlaylistForm/>
      <div className={s.items}>
        {data?.data.map(playlist => {
          return (
            <div className={s.item} key={playlist.id}>
              <div>title: {playlist.attributes.title}</div>
              <div>description: {playlist.attributes.description}</div>
              <div>userName: {playlist.attributes.user.name}</div>
              <button onClick={() => deletePlaylistHandler(playlist.id)}>delete</button>
              <button onClick={() => updatePlaylistHandler(playlist.id)}>update</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}