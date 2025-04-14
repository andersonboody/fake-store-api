import classes from './Inputs.module.scss'
import { IInputForm } from '../Types'
import { FieldValues } from 'react-hook-form'

export const InputDescription = <TFormValues extends FieldValues>({
  name,
  register,
  label,
}: IInputForm<TFormValues>) => {
  return (
    <div className={classes.formElement}>
      {label && <label className={classes.formLabel}>Фото</label>}
      <textarea rows={4} className={classes.formInputDescription} placeholder="Описание..." {...register(name)} />
    </div>
  )
}
