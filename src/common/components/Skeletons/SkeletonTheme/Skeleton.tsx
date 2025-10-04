import React from 'react'
import { SkeletonCard } from '@/common/components/Skeletons/SkeletonCard/SkeletonCard.tsx'
import { SkeletonTheme } from 'react-loading-skeleton'

export const Skeleton = () => {
  return (
    <>
      <SkeletonTheme baseColor="#ddd" highlightColor="#eee">
        <div style={{ display: 'flex', gap: 20, marginTop: 40, marginLeft: 20 }}>
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </SkeletonTheme>
    </>
  )
}
