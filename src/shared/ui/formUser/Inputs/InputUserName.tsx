import classes from './Inputs.module.scss'
import { InputType } from '../Types'

export const InputUserName = ({ register, errors, defaultValue = '', label }: InputType) => {
  return (
    <div className={classes.formElement}>
      {label && <label className={classes.formLabel}>{label}</label>}
      <input
        type="text"
        className={classes.formInput}
        placeholder="Имя"
        defaultValue={defaultValue}
        {...register('name', {
          required: 'The field must be filled in',
          minLength: {
            value: 4,
            message: 'Your name needs to be at least 4 characters.',
          },
        })}
      />
      {errors?.name && <span className={classes.errors}>{String(errors?.name?.message)}</span>}
    </div>
  )
}
