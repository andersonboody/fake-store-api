import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DownOutlined, HeartOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps, Space } from 'antd'

import classes from './Header.module.scss'
import UserIcon from '../../shared/assets/image/user.jpg'
import { Input } from '../../shared/ui/input/Input'
import { Logo } from '../../shared/ui/logo/logo'
import { Route } from '../../app/router/route'

interface IHeader {
  basket: () => void
}

export const Header = ({ basket }: IHeader) => {
  const [userRole, setUserRole] = useState('')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const role = localStorage.getItem('role')
    const name = localStorage.getItem('name')
    if (role && name) {
      setUserRole(role)
      setUserName(name)
    }
  }, [userRole, userName])

  const logOutUser = () => {
    localStorage.removeItem('role')
    localStorage.removeItem('name')
    localStorage.removeItem('token')
    setUserRole('')
    setUserName('')
  }

  const items: MenuProps['items'] = [
    {
      label: <Link to={Route.Profile}>Profile</Link>,
      key: '0',
    },
    {
      label: (
        <button onClick={logOutUser} className="ant-dropdown-menu-item">
          Log Out
        </button>
      ),
      key: '1',
    },
  ]

  return (
    <header className={classes.header}>
      <Logo />
      <div className={classes.blockUser}>
        {userRole && userName ? (
          <>
            <img src={UserIcon} alt="User" className={classes.userImage} />
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <span className={classes.userName}>
                    {userName} <DownOutlined className={classes.userNameDown} />
                  </span>
                </Space>
              </a>
            </Dropdown>
          </>
        ) : (
          <>
            <Link to={Route.SignIn} className="button">
              Sign-In
            </Link>
            <Link to={Route.SignUp} className="button">
              Sign-Up
            </Link>
          </>
        )}
      </div>
      <Input />
      <div className={classes.btnGroupHeader}>
        <button className={classes.btnHeader}>
          <HeartOutlined />
        </button>
        <button className={classes.btnHeader} onClick={basket}>
          <ShoppingOutlined />
        </button>
      </div>
    </header>
  )
}
