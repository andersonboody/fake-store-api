import { FC } from 'react'
import { Link } from 'react-router-dom'

import classes from './CategoryMenu.module.scss'
import { useGetCategoryQuery } from '../../shared/services/api/endpoints/categories/categories'

export const CategoryMenu: FC = () => {
  const { isLoading, data } = useGetCategoryQuery({ limit: 5 })

  const categories = data?.map((category) => (
    <li className={classes.categoryItem} key={category.id}>
      <Link to={`/${category.slug}`} className={classes.categoryLink}>
        {category.slug}
      </Link>
    </li>
  ))

  return (
    <div className={classes.category}>
      Categories:
      {isLoading && <div>Loading...</div>}
      <ul className={classes.categoryList}>{categories}</ul>
    </div>
  )
}
