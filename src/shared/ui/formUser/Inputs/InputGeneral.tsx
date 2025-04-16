import classes from './Inputs.module.scss'
import { IInputForm } from '../Types'
import { FieldValues } from 'react-hook-form'

export const InputGeneral = <TFormValues extends FieldValues>({
  label,
  placeholder,
  name,
  register,
  validation,
  type = 'text',
  defaultValue,
}: IInputForm<TFormValues>) => {
  return (
    <div className={classes.formElement}>
      {label && <label className={classes.formLabel}>{label}</label>}
      <input
        type={type}
        className={classes.formInput}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name, validation)}
      />
    </div>
  )
}
