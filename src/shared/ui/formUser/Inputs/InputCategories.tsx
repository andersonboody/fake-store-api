import classes from './Inputs.module.scss'
import { IInputForm } from '../Types'
import { useGetCategoryQuery } from '@/shared/services/api/endpoints/categories/categories'
import { SkeletonInput } from '../../skeletons/skeletonInput/skeletonInput'
import { FieldValues } from 'react-hook-form'

export const InputCategories = <TFromValues extends FieldValues>({
  name,
  label,
  register,
}: IInputForm<TFromValues>) => {
  const { data, isFetching } = useGetCategoryQuery({ limit: 50 })

  if (isFetching) {
    return <SkeletonInput />
  }

  return (
    <div className={classes.formElement}>
      {label && <label className={classes.formLabel}>{label}</label>}
      <select className={classes.formInput} {...register(name, { required: 'The field must be filled in' })}>
        <option value="">Выберите категорию...</option>
        {data &&
          data.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
      </select>
    </div>
  )
}
