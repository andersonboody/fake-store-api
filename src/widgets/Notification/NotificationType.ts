export enum NotificationType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}
export interface INotification {
  types: NotificationType
  message: string
}

export const AUTH_ERROR_MESSAGE = 'Ошибка авторизации, проверьте логин и пароль!'
export const AUTH_LOADING_MESSAGE = 'Подождите, проверка данных займет не более 10 секунд!'
export const AUTH_SUCCESS_MESSAGE = 'Вы успешно авторизовались!'
export const REGISTER_ERROR_MESSAGE = 'Ошибка при регистрации, проверьте введенные данные!'
export const REGISTER_LOADING_MESSAGE = 'Подождите, происходит регистрация - это займет не более 10 секунд!'
export const REGISTER_SUCCESS_MESSAGE = 'Регистрации прошла успешно!'
