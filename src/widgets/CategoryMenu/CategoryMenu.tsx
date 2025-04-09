import { Link } from 'react-router-dom'
import { memo, useMemo } from 'react'

import classes from './CategoryMenu.module.scss'
import { useGetCategoryQuery } from '@/shared/services/api/endpoints/categories/categories'
import Loading from '@/shared/ui/spin/Spin'

export const CategoryMenu = memo(() => {
  const { isLoading, data } = useGetCategoryQuery({ limit: 5 })

  const categories = useMemo(
    () =>
      data?.map((category) => (
        <li className={classes.categoryItem} key={category.id}>
          <Link to={`/${category.slug}`} className={classes.categoryLink}>
            {category.slug}
          </Link>
        </li>
      )),
    [data]
  )

  return (
    <div className={classes.category}>
      Categories:
      {isLoading && <Loading />}
      <ul className={classes.categoryList}>{categories}</ul>
    </div>
  )
})
