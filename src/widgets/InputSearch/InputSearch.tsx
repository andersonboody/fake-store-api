import { ChangeEvent, memo, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import debounce from 'lodash.debounce'

import classes from './InputSearch.module.scss'
import { useGetProductTitleQuery } from '../../shared/services/api/endpoints/products/products'
import { Link } from 'react-router-dom'

export const InputSearch = memo(() => {
  const [search, setSearch] = useState('')
  const { data } = useGetProductTitleQuery({ title: search }, { skip: !search })

  const handleSearch = (title: string) => {
    setSearch(title)
  }

  const debounceSearch = debounce(handleSearch, 1000)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    debounceSearch(event.target.value)
  }

  const productSearch = data?.map((product) => (
    <li key={product.id} className={classes.elementProduct}>
      <img src={product.images[0]} alt="photo" className={classes.photoProduct} />
      <Link to={`/product/${product.slug}`} className={classes.titleProduct}>
        {product.title}
      </Link>
    </li>
  ))

  return (
    <div className={classes.blockInput}>
      <input type="text" className={classes.input} onChange={handleChange} />
      <p className={classes.button}>
        <SearchOutlined />
      </p>
      {data && (
        <ul className={classes.listProduct}>
          {data.length < 1 ? (
            <li>
              <span>Товаров не было найдено</span>
            </li>
          ) : (
            productSearch
          )}
        </ul>
      )}
    </div>
  )
})
