import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DownOutlined, HeartOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps, Space } from 'antd'

import classes from './Header.module.scss'
import { Input } from '../../shared/ui/input/Input'
import { Logo } from '../../shared/ui/logo/logo'
import { Route } from '../../app/router/route'

interface IHeader {
  basket: () => void
  favorite: () => void
}
type userData = {
  name: string
  avatar: string
  role: string
}

export const Header = ({ basket, favorite }: IHeader) => {
  const [userData, setUserData] = useState<userData | null>(null)
  const [menuItem, setMenuItem] = useState<MenuProps['items']>([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData')!)
    if (data) setUserData(data)
  }, [setUserData])

  const logOutUser = () => {
    localStorage.removeItem('userData')
    localStorage.removeItem('token')
    setUserData(null)
  }

  const baseMenuItem: MenuProps['items'] = useMemo(
    () => [
      {
        label: <Link to={Route.Profile}>Profile</Link>,
        key: '1',
      },
      {
        label: (
          <button onClick={logOutUser} className="ant-dropdown-menu-item">
            Log Out
          </button>
        ),
        key: '2',
      },
    ],
    []
  )
  useEffect(() => {
    if (userData?.role === 'admin') {
      setMenuItem([
        {
          label: <Link to={'/'}>Admin</Link>,
          key: '0',
        },
        ...baseMenuItem,
      ])
    } else {
      setMenuItem(baseMenuItem)
    }
  }, [baseMenuItem, userData])

  return (
    <header className={classes.header}>
      <Logo />
      <div className={classes.blockUser}>
        {userData ? (
          <>
            <img src={userData.avatar} alt="User" className={classes.userImage} />
            <Dropdown menu={{ items: menuItem }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <span className={classes.userName}>
                    {userData.name} <DownOutlined className={classes.userNameDown} />
                  </span>
                </Space>
              </a>
            </Dropdown>
          </>
        ) : (
          <>
            <Link to={Route.SignIn} className={`button ${classes.btnUser}`}>
              Sign-In
            </Link>
            <Link to={Route.SignUp} className={`button ${classes.btnUser}`}>
              Sign-Up
            </Link>
          </>
        )}
      </div>
      <Input />
      <div className={classes.btnGroupHeader}>
        <button className={classes.btnHeader} onClick={favorite}>
          <HeartOutlined />
        </button>
        <button className={classes.btnHeader} onClick={basket}>
          <ShoppingOutlined />
        </button>
      </div>
    </header>
  )
}
