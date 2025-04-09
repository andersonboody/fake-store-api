import classes from './Inputs.module.scss'
import { InputType } from '../Types'

export const InputRole = ({ register, errors, label }: InputType) => {
  return (
    <div className={classes.formElement}>
      {label && <label className={classes.formLabel}>{label}</label>}
      <select className={classes.formInput} {...register('role', { required: 'The field must be filled in' })}>
        <option value="">Выберите роль...</option>
        <option value={'customer'}>Customer</option>
        <option value={'admin'}>Admin</option>
      </select>
      {errors?.role && <span className={classes.errors}>{String(errors?.role?.message)}</span>}
    </div>
  )
}
