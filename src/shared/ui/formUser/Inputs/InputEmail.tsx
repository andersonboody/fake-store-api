import debounce from 'lodash.debounce'
import { CheckOutlined, ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

import classes from './Inputs.module.scss'
import { InputType } from '../Types'
import { usePostIsAvailableMutation } from '../../../services/api/endpoints/users/users'
import { EMAIL_ERROR_MESSAGE, INotification, NotificationType } from '../../../../widgets/Notification/NotificationType'
import { Notification } from '../../../../widgets/Notification/Notification'

export const InputEmail = ({ register, errors, defaultValue = '', label }: InputType) => {
  const [notification, setNotification] = useState<INotification | null>(null)
  const [check, { data, isLoading, isError }] = usePostIsAvailableMutation()

  useEffect(() => {
    if (isError) setNotification({ types: NotificationType.ERROR, message: EMAIL_ERROR_MESSAGE })
  }, [isError])

  const debounceCheckEmail = debounce(async (email) => {
    await check({ email })
    setNotification(null)
  }, 2000)

  return (
    <div className={classes.formElement}>
      {label && <label className={classes.formLabel}>{label}</label>}
      <input
        type="text"
        className={classes.formInput}
        defaultValue={defaultValue}
        placeholder="Укажите емайл..."
        {...register('email', {
          required: 'The field must be filled in.',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email address',
          },
          onChange: (e) => debounceCheckEmail(e.target.value),
        })}
      />
      {isLoading && (
        <div className={classes.loading}>
          <LoadingOutlined />
        </div>
      )}
      {data?.isAvailable === true ||
        (isError && (
          <div className={`${classes.loading} ${classes.loadingError}`}>
            <ExclamationCircleOutlined />
          </div>
        ))}
      {data?.isAvailable === false && (
        <div className={`${classes.loading} ${classes.loadingSuccess}`}>
          <CheckOutlined />
        </div>
      )}
      {errors?.email && <span className={classes.errors}>{String(errors?.email?.message)}</span>}
      {notification && <Notification types={notification.types} message={notification.message} />}
    </div>
  )
}
