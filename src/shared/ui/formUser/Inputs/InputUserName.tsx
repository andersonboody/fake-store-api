import classes from './Inputs.module.scss'
import { InputType } from '../Types'

export const InputUserName = ({ register, errors }: InputType) => {
  return (
    <div className={classes.formElement}>
      <label className={classes.formLabel}>Имя</label>
      <input
        type="text"
        className={classes.formInput}
        placeholder="Имя"
        {...register('userName', {
          required: 'The field must be filled in',
          minLength: {
            value: 4,
            message: 'Your name needs to be at least 4 characters.',
          },
        })}
      />
      {errors?.userName && <span className={classes.errors}>{String(errors?.userName?.message)}</span>}
    </div>
  )
}
