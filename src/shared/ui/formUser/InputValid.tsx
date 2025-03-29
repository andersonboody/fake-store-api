import { useState } from 'react'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'

import classes from './Inputs.module.scss'
import { IInputForm, IInputRole } from './Types'

export const InputValid = ({ label, placeholder, name, register, validation, type = 'text' }: IInputForm) => {
  const [password, setPassword] = useState(false)

  const eyeIcon = password ? (
    <EyeOutlined onClick={() => setPassword(!password)} className={classes.eyes} />
  ) : (
    <EyeInvisibleOutlined onClick={() => setPassword(!password)} className={classes.eyes} />
  )

  const inputType = name === 'password' ? (password ? 'text' : 'password') : type

  return (
    <div className={classes.formElement}>
      <label className={classes.formLabel}>{label}</label>
      <input type={inputType} className={classes.formInput} placeholder={placeholder} {...register(name, validation)} />
      {name === 'password' && eyeIcon}
    </div>
  )
}

export const InputRole = ({ label, register }: IInputRole) => {
  return (
    <div className={classes.formElement}>
      <label className={classes.formLabel}>{label}</label>
      <select className={classes.formInput} {...register('role')}>
        <option>Выберите роль...</option>
        <option value={'customer'}>Customer</option>
        <option value={'admin'}>Admin</option>
      </select>
    </div>
  )
}
