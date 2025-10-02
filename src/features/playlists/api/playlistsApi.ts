import type {
  CreatePlaylistArgs,
  FetchPlaylistsArgs,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArgs
} from './playlistsApi.types'
import { baseApi } from '@/app/api/baseApi.ts'
import type { Images } from '@/common/types'

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
      query: (params) => {
        return {
          url: 'playlists',
          params
        }
      },
      providesTags: ['Playlist'],
    }),
    createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
      query: (body) => ({
        url: 'playlists',
        method: 'post',
        body,
      }),
      invalidatesTags: ['Playlist'],
    }),
    deletePlaylist: build.mutation<void, string>({
      query: (playlistId) => ({
        url: `playlists/${playlistId}`,
        method: 'delete',
      }),
      invalidatesTags: ['Playlist'],
    }),
    updatePlaylist: build.mutation<void, { playlistId: string; body: UpdatePlaylistArgs }>({
      query: ({ playlistId, body }) => ({
        url: `playlists/${playlistId}`,
        method: 'put',
        body,
      }),
      async onQueryStarted({ playlistId, body }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          playlistsApi.util.updateQueryData(
            // название эндпоинта, в котором нужно обновить кэш
            'fetchPlaylists',
            // аргументы для эндпоинта
            { pageNumber: 1, pageSize: 4, search: '' },
            // `updateRecipe` - коллбэк для обновления закэшированного стейта мутабельным образом
            state => {
              const index = state.data.findIndex(playlist => playlist.id === playlistId)
              if (index !== -1) {
                state.data[index].attributes = { ...state.data[index].attributes, ...body }
              }
            }
          )
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: ['Playlist'],
    }),
    uploadPlaylistCover: build.mutation<Images, { playlistId: string; file: File }>({
      query: ({ playlistId, file }) => {
        const formData = new FormData()
        formData.append('file', file)

        return {
          url: `playlists/${playlistId}/images/main`,
          method: 'post',
          body: formData,
        }
      },
      invalidatesTags: ['Playlist'],
    }),
    deletePlaylistCover: build.mutation<void, { playlistId: string }>({
      query: ({ playlistId }) => {
        return {
          url: `playlists/${playlistId}/images/main`,
          method: 'delete',
        }
      },
      invalidatesTags: ['Playlist'],
    }),
  }),
})

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
useUploadPlaylistCoverMutation,
  useDeletePlaylistCoverMutation
} = playlistsApi