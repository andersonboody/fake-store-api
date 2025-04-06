import classes from './Inputs.module.scss'
import { InputType } from '../Types'

export const InputAvatar = ({ register, errors, label }: InputType) => {
  return (
    <div className={classes.formElement}>
      {label && <label className={classes.formLabel}>Фото</label>}
      <input
        type="text"
        className={classes.formInput}
        placeholder="Укажите ссылку на фото..."
        {...register('avatar', {
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
