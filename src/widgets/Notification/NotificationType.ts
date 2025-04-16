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

export const AUTH_LOADING_MESSAGE = 'Подождите, проверка данных займет не более 10 секунд!'
export const AUTH_SUCCESS_MESSAGE = 'Вы успешно авторизовались!'
export const AUTH_ERROR_MESSAGE = 'Ошибка авторизации, проверьте логин и пароль!'

export const REGISTER_LOADING_MESSAGE = 'Подождите, происходит регистрация - это займет не более 10 секунд!'
export const REGISTER_SUCCESS_MESSAGE = 'Регистрации прошла успешно!'
export const REGISTER_ERROR_MESSAGE = 'Ошибка при регистрации, мы уже ее исправляем!'

export const EMAIL_ERROR_MESSAGE = 'Укажите валидную почту!'

export const UPDATE_LOADING_USER = 'Подождите меняем данные профиля!'
export const UPDATE_SUCCESS_USER = 'Данные профиля успешно изменены!'
export const UPDATE_ERRORS_USER = 'При изменении данных профиля произошла ошибка, попробуйте чуть позже!'

export const DELETE_LOADING_USER = (userName: string) => `Пользователя ${userName} вы отправили на удаление!`
export const DELETE_SUCCESS_USER = (userName: string) => `Вы успешно удалил пользователя ${userName}!`
export const DELETE_ERRORS_USER = (userName: string) => `У пользователя ${userName} иммунитет, его нельзя удалить!`

export const EDIT_ROLE_LOADING_USER = (userName: string) => `Вы отправили изменение роли для пользователя ${userName}!`
export const EDIT_ROLE_SUCCESS_USER = (userName: string, role: string) =>
  `Роль у пользователя ${userName} изменена на ${role}!`
export const EDIT_ROLE_ERROR_USER = (userName: string) => `Пользователя ${userName} нельзя изменить роль!`

export const DELETE_SUCCESS_PRODUCT = (title: string) => `Товар ${title} был удален!`
export const DELETE_ERROR_PRODUCT = (title: string) => `Товар ${title} нельзя удалить!`

export const CREATE_SUCCESS_PRODUCT = 'Товар успешно добавлен!'
export const CREATE_ERROR_PRODUCT = 'При добавлении товара произошла ошибка!'

export const CREATE_SUCCESS_CATEGORY = 'Категория успешно создана!'
export const CREATE_ERROR_CATEGORY = 'Ошибка при создании категории!'

export const DELETE_SUCCESS_CATEGORY = 'Категория была удалена!'
export const DELETE_ERROR_CATEGORY = 'Нельзя удалить категорию!'

export const EDIT_SUCCESS_CATEGORY = 'Категория была изменена!'
export const EDIT_ERROR_CATEGORY = 'Нельзя изменить категорию!'
