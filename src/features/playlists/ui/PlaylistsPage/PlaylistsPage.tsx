import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi.ts'
import s from './PlaylistsPage.module.css'
import { CreatePlaylistForm } from '@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm.tsx'
import { type ChangeEvent, useState } from 'react'
import { useDebounceValue } from '@/common/hooks'
import { Pagination } from '@/common/components/Pagination/Pagination.tsx'
import { PlaylistList } from '@/features/playlists/ui/PlaylistsPage/PlaylistList/PlaylistList.tsx'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import CardListSkeleton, {
  SkeletonCard
} from '@/features/playlists/ui/PlaylistsPage/SkeletonCard/SkeletonCard.tsx'
import { LinearProgress } from '@/common/components/LinearProgress/LinearProgress.tsx'


export const PlaylistsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(2)
  const [search, setSearch] = useState('')

  const debounceSearch = useDebounceValue(search)

  const { data, isLoading, isFetching } = useFetchPlaylistsQuery(
    {
      search: debounceSearch,
      pageNumber: currentPage,
      pageSize,
    },
  )

  console.log({ isLoading, isFetching })

  const changePageSizeHandler = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
    setCurrentPage(1)
  }

  if (isLoading)   return (
    <SkeletonTheme baseColor="#ddd" highlightColor="#eee">
      <div style={{ display: "flex", gap: 20 , marginTop: 40, marginLeft: 20}}>
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </SkeletonTheme>
  );


  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />

      <input type="search" placeholder={'Search playlist by title'} onChange={searchPlaylistHandler} />

      <PlaylistList playlists={data?.data || []} isPlaylistsLoading={isLoading} />
      {isFetching && <LinearProgress />}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.meta.pagesCount || 1}
        pageSize={pageSize}
        changePageSize={changePageSizeHandler}
      />
    </div>
  )
}
