import { memo } from 'react'
import { useForm } from 'react-hook-form'

import classes from './Filter.module.scss'

interface IFilter {
  onPriceChange: (newMinPrice: number, newMaxPrice: number) => void
}
type DataType = {
  minPrice: number
  maxPrice: number
}

export const Filter = memo(({ onPriceChange }: IFilter) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataType>({ mode: 'onBlur' })

  const submitHandle = (data: DataType) => {
    onPriceChange(data.minPrice, data.maxPrice)
  }

  const options = {
    valueAsNumber: true,
    min: { value: 1, message: "We don't have any free products!" },
    validate: {
      mixed: (value: number) => {
        return !isNaN(value) ? true : 'Specify the price in numbers'
      },
    },
  }

  return (
    <div className={classes.filter}>
      <p className={classes.filterName}>Filters:</p>
      <form className={classes.filterForm} onSubmit={handleSubmit(submitHandle)}>
        <div className={classes.filterField}>
          <label className={classes.filterLabel}>Min price</label>
          <input className={classes.filterInput} placeholder="Min price..." {...register('minPrice', options)} />
          {errors?.minPrice && (
            <span className={classes.filterError}>{String(errors?.minPrice?.message) || 'Error!'}</span>
          )}
        </div>
        <div className={classes.filterField}>
          <label className={classes.filterLabel}>Max price</label>
          <input className={classes.filterInput} placeholder="Max price..." {...register('maxPrice', options)} />
          {errors?.maxPrice && (
            <span className={classes.filterError}>{String(errors?.maxPrice?.message) || 'Error!'}</span>
          )}
        </div>
        <button className={`button ${classes.filterButton}`}>Send</button>
      </form>
    </div>
  )
})
