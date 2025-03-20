import classes from './Inputs.module.scss'
import { IInputForm } from './Types'

export const InputValid = ({ label, placeholder, name, register, validation, type = 'text' }: IInputForm) => {
  return (
    <div className={classes.formElement}>
      <label className={classes.formLabel}>{label}</label>
      <input type={type} className={classes.formInput} placeholder={placeholder} {...register(name, validation)} />
    </div>
  )
}
