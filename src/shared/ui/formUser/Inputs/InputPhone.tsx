import { ChangeEvent } from 'react'

import classes from './Inputs.module.scss'
import { InputType } from '../Types'

export const InputPhone = ({ register, errors }: InputType) => {
  const getInputNumberValue = (value: string) => {
    return value.replace(/\D/g, '')
  }
  const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target
    const inputNumber = getInputNumberValue(input.value)
    const selectionStart = input.selectionStart
    let formatInput = ''

    if (!inputNumber) return (input.value = '')
    if (input.value.length !== selectionStart) return

    if (['7', '8', '9'].indexOf(inputNumber[0]) > -1) {
      const firstSymbol = inputNumber[0] === '8' ? '8' : '+7'
      formatInput += firstSymbol + ''

      if (inputNumber.length > 1) formatInput += ' (' + inputNumber.substring(1, 4)
      if (inputNumber.length >= 5) formatInput += ') ' + inputNumber.substring(4, 7)
      if (inputNumber.length >= 8) formatInput += '-' + inputNumber.substring(7, 9)
      if (inputNumber.length >= 10) formatInput += '-' + inputNumber.substring(9, 11)
    }

    input.value = formatInput
  }

  return (
    <div className={classes.formElement}>
      <label className={classes.formLabel}>Телефон</label>
      <input
        type="tel"
        className={classes.formInput}
        placeholder="+7 (***) *** - ** - ** "
        {...register('phone', {
          required: 'The field must be filled in',
          maxLength: 18,
        })}
        onInput={handlePhone}
      />
      {errors?.userName && <span className={classes.errors}>{String(errors?.userName?.message)}</span>}
    </div>
  )
}
