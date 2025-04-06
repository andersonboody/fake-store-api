import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Modal } from 'antd'

import { getAccessToken } from '../../shared/lib/getAccessToken'
import { useGetProfileQuery, usePutProfileMutation } from '../../shared/services/api/endpoints/users/users'
import { Logo } from '../../shared/ui/logo/logo'
import classes from './Profile.module.scss'
import { InputAvatar } from '../../shared/ui/formUser/Inputs/InputAvatar'
import {
  INotification,
  NotificationType,
  UPDATE_ERRORS_AVATAR,
  UPDATE_LOADING_AVATAR,
  UPDATE_SUCCESS_AVATAR,
} from '../../widgets/Notification/NotificationType'
import { Notification } from '../../widgets/Notification/Notification'
import { SkeletonProfile } from '../../shared/ui/skeletons/skeletonProfile/skeletonProfile'

const Profile = () => {
  const { data: dataProfile, isLoading: loadingProfile } = useGetProfileQuery(getAccessToken())
  const [updataProfile, { isLoading: loadingAvatar, isSuccess: successAvatar, error: errorAvatar }] =
    usePutProfileMutation()
  const [isAvatarModal, setAvatarModal] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ avatar: string }>({ mode: 'onBlur' })
  const [notification, setNotification] = useState<INotification | null>(null)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (loadingAvatar) setNotification({ types: NotificationType.INFO, message: UPDATE_LOADING_AVATAR })
    if (successAvatar) {
      setNotification({ types: NotificationType.SUCCESS, message: UPDATE_SUCCESS_AVATAR })
      setDisabled(false)
    }
    if (errorAvatar) setNotification({ types: NotificationType.ERROR, message: UPDATE_ERRORS_AVATAR })
  }, [loadingAvatar, successAvatar, errorAvatar])

  const submitAvatar = (data: { avatar: string }) => {
    if (!dataProfile) return

    try {
      setAvatarModal(false)
      setDisabled(true)
      updataProfile({ ...dataProfile, avatar: data.avatar }).unwrap()
    } catch (e) {
      console.error(e)
    }
  }

  const deleteAvatar = () => {
    if (!dataProfile) return
    const dataUser = {
      ...dataProfile,
      avatar: 'https://avatars.mds.yandex.net/i?id=9feb996bf910b500a2da7acbcb7bb4a3_l-8474988-images-thumbs&n=13',
    }
    setDisabled(true)
    updataProfile(dataUser).unwrap()
  }

  return (
    <section className={classes.profile}>
      <header className={classes.profileHeader}>
        <Logo />
      </header>
      <main className={classes.profileMain}>
        {loadingProfile && <SkeletonProfile />}
        {dataProfile && (
          <section className={classes.profileData}>
            <div className={classes.profileBlockAvatar}>
              <img src={dataProfile.avatar} alt="Avatar" className={classes.profileAvatar} />
              <button className={classes.profileEdit} onClick={() => setAvatarModal(true)} disabled={disabled}>
                загрузить фото
              </button>
              <button className={classes.profileDeleteAvatar} onClick={deleteAvatar} disabled={disabled}>
                удалить
              </button>
            </div>
            <div className={classes.profileInformation}>
              <ul className={classes.profileList}>
                <li className={classes.profileListElem}>
                  <p>Name:</p>
                  <p className={classes.profileItem}>{dataProfile.name}</p>
                </li>
                <li className={classes.profileListElem}>
                  <p>Email:</p>
                  <p className={classes.profileItem}>{dataProfile.email}</p>
                </li>
                <li className={classes.profileListElem}>
                  <p>ID:</p>
                  <p className={classes.profileItem}>{dataProfile.id}</p>
                </li>
                <li className={classes.profileListElem}>
                  <p>Role:</p>
                  <p className={classes.profileItem}>{dataProfile.role}</p>
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
      <Modal
        open={isAvatarModal}
        onCancel={() => setAvatarModal(false)}
        closable={false}
        footer={null}
        className={classes.modalAvatar}
      >
        <form className={classes.formAvatar} onSubmit={handleSubmit(submitAvatar)}>
          <InputAvatar register={register} errors={errors} />
          <button className={classes.profileEdit}>изменить</button>
        </form>
      </Modal>
      {notification && <Notification types={notification.types} message={notification.message} />}
    </section>
  )
}

export default Profile
