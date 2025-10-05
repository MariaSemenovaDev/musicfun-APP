// export type Tag = {
//   id: string
//   name: string
// }
//
// export type User = {
//   id: string
//   name: string
// }
//
// export type Images = {
//   main: Cover[]
// }
//
// export type Cover = {
//   type: 'original' | 'medium' | 'thumbnail'
//   width: number
//   height: number
//   fileSize: number
//   url: string
// }

import { coverSchema, currentUserReactionSchema, imagesSchema, type tagSchema, userSchema } from '@/common/schemas'
import z from 'zod'

export type Tag = z.infer<typeof tagSchema>
export type User = z.infer<typeof userSchema>
export type Cover = z.infer<typeof coverSchema>
export type Images = z.infer<typeof imagesSchema>
export type CurrentUserReaction = z.infer<typeof currentUserReactionSchema>