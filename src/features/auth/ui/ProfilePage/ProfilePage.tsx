import { useGetMeQuery } from '@/features/auth/api/authApi.ts'
import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi.ts'
import { PlaylistList } from '@/features/playlists/ui/PlaylistsPage/PlaylistList/PlaylistList.tsx'
import { CreatePlaylistForm } from '@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm.tsx'
import s from './ProfilePage.module.css'
import { Skeleton } from '@/common/components/Skeletons/SkeletonTheme/Skeleton.tsx'
import { Navigate } from 'react-router'
import { Path } from '@/common/routing'

export const ProfilePage = () => {
  const { data: meResponse, isLoading: isMeLoading } = useGetMeQuery()

  const {
    data: playlistsResponse,
    isLoading,
  } = useFetchPlaylistsQuery({ userId: meResponse?.userId }, { skip: !meResponse?.userId })

  if (isLoading || isMeLoading) return <Skeleton />
  if (!isMeLoading && !meResponse) return <Navigate to={Path.Playlists} />

  return (
    <div>
      <h1>{meResponse?.login} page</h1>
      <div className={s.container}>
        <CreatePlaylistForm />
        <PlaylistList playlists={playlistsResponse?.data || []} isPlaylistsLoading={isLoading} />
      </div>
    </div>
  )
}
