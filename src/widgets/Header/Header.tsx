import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, MenuProps, Space } from 'antd'

import classes from './Header.module.scss'
import { Input } from '../../shared/ui/input/Input'
import { Logo } from '../../shared/ui/logo/logo'
import { IHeader, userData } from './Types'
import {
  MemoizedDownOutlined,
  MemoizedHeartOutlined,
  MemoizedProfileLink,
  MemoizedShoppingOutlined,
  MemoizedSignInLink,
  MemoizedSingUpLink,
} from './Memoized'

export const Header = ({ basket, favorite }: IHeader) => {
  const [userData, setUserData] = useState<userData | null>(null)
  const [menuItem, setMenuItem] = useState<MenuProps['items']>([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData')!)
    if (data) setUserData(data)
  }, [setUserData])

  const logOutUser = useCallback(() => {
    localStorage.removeItem('userData')
    localStorage.removeItem('token')
    setUserData(null)
  }, [])

  const baseMenuItem: MenuProps['items'] = useMemo(
    () => [
      {
        label: <MemoizedProfileLink />,
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
    [logOutUser]
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
                    {userData.name} <MemoizedDownOutlined className={classes.userNameDown} />
                  </span>
                </Space>
              </a>
            </Dropdown>
          </>
        ) : (
          <>
            <MemoizedSignInLink />
            <MemoizedSingUpLink />
          </>
        )}
      </div>
      <Input />
      <div className={classes.btnGroupHeader}>
        <button className={classes.btnHeader} onClick={favorite}>
          <MemoizedHeartOutlined />
        </button>
        <button className={classes.btnHeader} onClick={basket}>
          <MemoizedShoppingOutlined />
        </button>
      </div>
    </header>
  )
}
