import { memo } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons'

import classes from './AdminHeader.module.scss'
import { Logo } from '@/shared/ui/logo/logo'
import { Route } from '@/app/router/route'
import { useGetProfileQuery } from '@services/api/endpoints/users/users'
import { getAccessToken } from '@/shared/lib/getAccessToken'
import { SkeletonIcon } from '@/shared/ui/skeletons/skeletonIcon/skeletonIcon'

export const AdminHeader = memo(() => {
  const { data: profile, isFetching: getProfile } = useGetProfileQuery(getAccessToken())

  const menuItems = [
    {
      key: 'profile',
      label: (
        <Link to={Route.Profile} className={classes.link}>
          Profile
        </Link>
      ),
    },
    {
      key: 'site',
      label: <Link to="/">Site</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
    },
  ]

  return (
    <header className={classes.adminHeader}>
      <Logo />

      <div className={classes.adminProfile}>
        {getProfile && <SkeletonIcon />}
        {profile && !getProfile && (
          <Menu
            mode="horizontal"
            items={menuItems}
            className={classes.menu}
            overflowedIndicator={<img src={profile.avatar} alt="photo" className={classes.avatar} />}
          ></Menu>
        )}
      </div>
    </header>
  )
})
