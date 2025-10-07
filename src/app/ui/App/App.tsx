import { Header } from '@/common/components'
import { Routing } from '@/common/routing'
import s from './App.module.css'
import { ToastContainer } from 'react-toastify'
import { LinearProgress } from '@/common/components/LinearProgress/LinearProgress.tsx'
import { useGlobalLoading } from '@/common/hooks'
import { Sidebar } from '@/common/components/Sidebar/Sidebar.tsx'
import { useEffect, useState } from 'react'

export const App = () => {

  const isGlobalLoading =  useGlobalLoading()

  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  useEffect(() => {
    open && (document.body.style.overflow = 'hidden')
    !open && (document.body.style.overflow = 'unset')
  }, [open]) // отключает прокрутку при открытом меню

  return (
    <>
      <Header handleOpen={handleOpen}/>
      <Sidebar open={open} handleClose={handleClose} />
      {isGlobalLoading && <LinearProgress/>}
      <div className={s.layout}>
        <Routing />
      </div>
      <ToastContainer />
    </>
  )
}
