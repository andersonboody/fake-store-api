import { useState } from 'react'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

import classes from './Inputs.module.scss'
import { InputType } from '../Types'

export const InputPassword = ({ register, errors, label }: InputType) => {
  const [password, setPassword] = useState(false)

  const eyeIcon = password ? (
    <EyeOutlined onClick={() => setPassword(!password)} className={classes.eyes} />
  ) : (
    <EyeInvisibleOutlined onClick={() => setPassword(!password)} className={classes.eyes} />
  )

  return (
    <div className={classes.formElement}>
      {label && <label className={classes.formLabel}>{label}</label>}
      <div className={classes.inputWrapper}>
        <input
          type={password ? 'text' : 'password'}
          className={classes.formInput}
          placeholder="Введите пароль..."
          {...register('password', {
            required: 'The field must be filled in',
            minLength: {
              value: 4,
              message: 'Your password needs to be at least 4 characters.',
            },
            validate: {
              mixed: (value) => {
                const onlyDigits = /^\d+$/.test(value)
                const onlyLetters = /^[a-zA-Z]+$/.test(value)

                if (onlyDigits) return "Password can't be only digits"
                if (onlyLetters) return "Password can't be only letters"

                return true
              },
            },
          })}
        />
        {eyeIcon}
      </div>
      {errors?.password && <span className={classes.errors}>{String(errors?.password?.message)}</span>}
    </div>
  )
}
