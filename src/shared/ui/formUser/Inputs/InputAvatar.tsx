import classes from './Inputs.module.scss'
import { IInputForm } from '../Types'
import { FieldValues } from 'react-hook-form'

export const InputAvatar = <TFormValues extends FieldValues>({
  name,
  register,
  errors,
  label,
}: IInputForm<TFormValues>) => {
  return (
    <div className={classes.formElement}>
      {label && <label className={classes.formLabel}>Фото</label>}
      <input
        type="text"
        className={classes.formInput}
        placeholder="Укажите ссылку на фото..."
        {...register(name, {
          pattern: {
            value: /^(http|https):\/\/[a-zA-Z0-9._~!$&'()*+,;=@:%-]+(.*?)/i,
            message: `Provide a valid link starting with http or https`,
          },
        })}
      />
      {errors?.avatar && <span className={classes.errors}>{String(errors?.avatar?.message)}</span>}
    </div>
  )
}
