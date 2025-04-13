import classes from './Inputs.module.scss'
import { IInputForm } from '../Types'
import { FieldValues } from 'react-hook-form'

export const InputRole = <TFormValues extends FieldValues>({
  name,
  register,
  errors,
  label,
}: IInputForm<TFormValues>) => {
  return (
    <div className={classes.formElement}>
      {label && <label className={classes.formLabel}>{label}</label>}
      <select className={classes.formInput} {...register(name, { required: 'The field must be filled in' })}>
        <option value="">Выберите роль...</option>
        <option value={'customer'}>Customer</option>
        <option value={'admin'}>Admin</option>
      </select>
      {errors?.role && <span className={classes.errors}>{String(errors?.role?.message)}</span>}
    </div>
  )
}
