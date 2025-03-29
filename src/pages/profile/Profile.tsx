import { useNavigate } from 'react-router-dom'
import { useGetProfileQuery } from '../../shared/services/api/endpoints/users/users'
import { Logo } from '../../shared/ui/logo/logo'
import classes from './Profile.module.scss'
import { Route } from '../../app/router/route'

const Profile = () => {
  const { data, isLoading } = useGetProfileQuery(localStorage.getItem('token') || '')
  const navigate = useNavigate()

  const role = localStorage.getItem('role')
  if (!role) navigate(Route.SignIn)

  return (
    <section className={classes.profile}>
      <header className={classes.profileHeader}>
        <Logo />
      </header>
      <main className={classes.profileMain}>
        {isLoading && <p>Loading...</p>}
        {data && (
          <section className={classes.profileData}>
            <div className={classes.profileBlockAvatar}>
              <img src={data.avatar} alt="Avatar" className={classes.profileAvatar} />
              <button className={classes.profileEdit}>загрузить фото</button>
              <button className={classes.profileDeleteAvatar}>удалить</button>
            </div>
            <div className={classes.profileInformation}>
              <ul className={classes.profileList}>
                <li className={classes.profileListElem}>
                  <p>Name:</p>
                  <p className={classes.profileItem}>{data.name}</p>
                </li>
                <li className={classes.profileListElem}>
                  <p>Email:</p>
                  <p className={classes.profileItem}>{data.email}</p>
                </li>
                <li className={classes.profileListElem}>
                  <p>ID:</p>
                  <p className={classes.profileItem}>{data.id}</p>
                </li>
                <li className={classes.profileListElem}>
                  <p>Role:</p>
                  <p className={classes.profileItem}>{data.role}</p>
                </li>
              </ul>
              <button className={classes.profileEdit}>обновить</button>
            </div>
          </section>
        )}

        <section className={classes.profileHistoryOrder}>
          <div className={classes.profileOrderList}>У вас еще не было заказов</div>
        </section>
      </main>
    </section>
  )
}

export default Profile
