import { notification } from 'antd'
import { useCallback, useEffect } from 'react'
import { INotification } from './NotificationType'

export const Notification = ({ types, message }: INotification) => {
  const openNotificationWithIcon = useCallback(({ types, message }: INotification) => {
    notification[types]({
      message: message,
      duration: 3,
    })
  }, [])

  useEffect(() => {
    openNotificationWithIcon({ types, message })
  }, [openNotificationWithIcon, types, message])

  return null
}
