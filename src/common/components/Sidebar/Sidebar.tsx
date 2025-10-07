import React, { FC, useEffect } from 'react'
import s from './Sidebar.module.css'
import { Path } from '@/common/routing'
import { NavLink } from 'react-router' // оставил как у тебя

const navItems = [
  { to: Path.Main, label: 'Main' },
  { to: Path.Playlists, label: 'All Playlists' },
  { to: Path.Tracks, label: 'All tracks' },
    { to: Path.Profile, label: 'My Profile' },
]

type PropsType = {
  open: boolean
  handleClose: () => void
}

export const Sidebar: FC<PropsType> = ({ open, handleClose }) => {

  return (
    <>
      {/* Затемнение — рендерим только когда open */}
      {open && <div className={s.background} onClick={handleClose} />}

      {/* Сам сайдбар — видимость управляется классом open */}
      <aside
        className={`${s.sidebar} ${open ? s.open : ''}`}
        aria-hidden={!open}
        aria-label="Sidebar"
      >
        <button className={s.close} onClick={handleClose} aria-label="Close menu">
          ✕
        </button>

        <nav className={s.nav} aria-label="Main navigation">
          <ul>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={handleClose}
                  className={({ isActive }) =>
                    isActive ? `${s.link ?? ''} ${s.active ?? ''}`.trim() : (s.link ?? '')
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}
