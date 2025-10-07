import { Path } from '@/common/routing'
import { Link, NavLink } from 'react-router'
import s from './Header.module.css'
import { useGetMeQuery, useLogoutMutation } from '@/features/auth/api/authApi.ts'
import { Login } from '@/features/auth/ui/ProfilePage/Login/Login.tsx'
import type { FC } from 'react'

// const navItems = [
//   { to: Path.Main, label: 'Main' },
//   { to: Path.Playlists, label: 'Playlists' },
//   { to: Path.Tracks, label: 'Tracks' },
//   //{ to: Path.Profile, label: 'Profile' },
// ]

type PropsType = {
  handleOpen: () => void
}

export const Header: FC<PropsType> = ({handleOpen}) => {
  const { data } = useGetMeQuery()
  const [logout] = useLogoutMutation()

  const logoutHandler = () => logout()

  return (
    <header className={s.container}>
      <img
        src={''}
        id={'hw5-burger-menu'}
        className={s.burgerMenuIcon}
        onClick={handleOpen}
        alt={'open menu'}
      />
      {data && (
        <div className={s.loginContainer}>
          <Link to={Path.Profile}>{data.login}</Link>
          <button onClick={logoutHandler}>logout</button>
        </div>
      )}
      {!data && <Login />}
    </header>
  )
}
