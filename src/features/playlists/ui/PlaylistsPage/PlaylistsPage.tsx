import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi.ts'
import s from './PlaylistsPage.module.css'
import { CreatePlaylistForm } from '@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm.tsx'
import { type ChangeEvent, useEffect, useState } from 'react'
import { useDebounceValue } from '@/common/hooks'
import { Pagination } from '@/common/components/Pagination/Pagination.tsx'
import { PlaylistList } from '@/features/playlists/ui/PlaylistsPage/PlaylistList/PlaylistList.tsx'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonCard } from '@/common/components/Skeletons/SkeletonCard/SkeletonCard.tsx'
import { toast } from 'react-toastify'
import { Skeleton } from '@/common/components/Skeletons/SkeletonTheme/Skeleton.tsx'

export const PlaylistsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(4)
  const [search, setSearch] = useState('')

  const debounceSearch = useDebounceValue(search)

  const { data, isLoading, error } = useFetchPlaylistsQuery({
    search: debounceSearch,
    pageNumber: currentPage,
    pageSize,
  })



  const changePageSizeHandler = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
    setCurrentPage(1)
  }

  if (isLoading) return <Skeleton/>
  return (
    <div className={s.container}>
      <h1>Playlists page</h1>


      <input type="search" placeholder={'Search playlist by title'} onChange={searchPlaylistHandler} />

      <PlaylistList playlists={data?.data || []} isPlaylistsLoading={isLoading} />
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
