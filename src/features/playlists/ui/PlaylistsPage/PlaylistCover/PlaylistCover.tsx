import s from './PlaylistCover.module.css'
import defaultCover from '@/assets/images/default-playlist-cover.png'
import {
  useDeletePlaylistCoverMutation,
  useUploadPlaylistCoverMutation
} from '@/features/playlists/api/playlistsApi.ts'
import type { Images } from '@/common/types'
import { errorToast } from '@/common/utils'
import type { ChangeEvent } from 'react'

type Props = {
  playlistId: string,
images: Images
}

export const PlaylistCover = ({playlistId, images}: Props) => {

  const [uploadPlaylistCover] = useUploadPlaylistCoverMutation()
  const [deletePlaylistCover] = useDeletePlaylistCoverMutation()

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
  const maxSize = 1024 * 1024 // 1 MB
  const originalCover = images.main.find((img) => img.type === 'original')
  const src = originalCover ? originalCover.url : defaultCover

  const deleteCoverHandler = (playlistId: string) => deletePlaylistCover({ playlistId })

  const uploadPlaylistCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.length && event.target.files[0]

    if (!file) return
    if (!allowedTypes.includes(file.type)) {
      errorToast('Only JPEG, PNG or GIF images are allowed', { type: 'error', theme: 'colored' })
    }
    if (file.size > maxSize) {
      errorToast(`The file is too large (max. ${Math.round(maxSize / 1024)} KB)`, {
        type: 'error',
        theme: 'colored',
      })
    }
    uploadPlaylistCover({ playlistId: playlistId, file })
  }


  return (
    <>
      <img src={src} alt={'cover'} width={'240px'} className={s.cover} />
      <input type="file" accept={'image/jpeg,image/png,image/gif'} onChange={uploadPlaylistCoverHandler} />
      {originalCover && <button onClick={() => deleteCoverHandler(playlistId)}>delete cover</button>}
    </>
  )
}