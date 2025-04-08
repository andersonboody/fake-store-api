import { memo } from 'react'

import classes from '../main.module.scss'
import { CategoryMenu } from '@/widgets/CategoryMenu/CategoryMenu'
import { Banner } from '@/widgets/Banner/Banner'
import { ProductList } from '@/widgets/Products/ProductsList/ProductsList'
import { IProductListProps } from '@/widgets/Products/Types'

export const DefaultMainContent = memo(
  ({ productsBasket, addBaskets, favorites, manageFavorite }: IProductListProps) => {
    return (
      <>
        <div className={classes.categoryMenuAndBanner}>
          <CategoryMenu />
          <Banner />
        </div>
        <ProductList
          productsBasket={productsBasket}
          addBaskets={addBaskets}
          favorites={favorites}
          manageFavorite={manageFavorite}
        />
      </>
    )
  }
)
