import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons'

import classes from './AdminHeader.module.scss'
import { Logo } from '@/shared/ui/logo/logo'
import { useGetProfileQuery } from '@services/api/endpoints/users/users'
import { getAccessToken } from '@/shared/lib/getAccessToken'
import { Route } from '@/app/router/route'
import { SkeletonIcon } from '@/shared/ui/skeletons/skeletonIcon/skeletonIcon'

export const AdminHeader = () => {
  const { data: profile, isFetching: getProfile } = useGetProfileQuery(getAccessToken())

  return (
    <header className={classes.adminHeader}>
      <Logo />

      <div className={classes.adminProfile}>
        {getProfile && <SkeletonIcon />}
        {profile && (
          <Menu
            mode="horizontal"
            className={classes.menu}
            overflowedIndicator={<img src={profile.avatar} alt="photo" className={classes.avatar} />}
          >
            <Menu.Item key="profile">
              <Link to={Route.Profile} className={classes.link}>
                Profile
              </Link>
            </Menu.Item>
            <Menu.Item key="site" icon={<HomeOutlined />}>
              <Link to="/">Site</Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
              Logout
            </Menu.Item>
          </Menu>
        )}
      </div>
    </header>
  )
}
