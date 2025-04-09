import { memo, useCallback, useState } from 'react'

import classes from '../main.module.scss'
import Loading from '@/shared/ui/spin/Spin'
import { useGetProductsToSlugQuery } from '@services/api/endpoints/products/products'
import { CategoryMenu } from '@/widgets/CategoryMenu/CategoryMenu'
import ProductsSlug from '@/widgets/Products/ProductsSlug/ProductsSlug'
import { IProductListProps } from '@/widgets/Products/Types'
import { Filter } from '@/widgets/Filter/Filter'

type FilterMainContentProps = IProductListProps & {
  categorySlug: string
}

const FilterMainContent = memo(
  ({ categorySlug, addBaskets, favorites, manageFavorite, productsBasket }: FilterMainContentProps) => {
    const [priceFilter, setPriceFilter] = useState({ minPrice: 0, maxPrice: 0 })
    const { data, isFetching } = useGetProductsToSlugQuery({
      categorySlug,
      price_min: priceFilter.minPrice,
      price_max: priceFilter.maxPrice,
    })

    const handlePriceChange = useCallback(
      (newMinPrice: number, newMaxPrice: number) => {
        setPriceFilter({ minPrice: newMinPrice, maxPrice: newMaxPrice })
      },
      [setPriceFilter]
    )

    return (
      <section className={classes.filteredBlock}>
        <div className={classes.category}>
          <CategoryMenu />
        </div>
        <div className={classes.filter}>
          <Filter onPriceChange={handlePriceChange} />
        </div>
        <div>
          <div className={classes.filtered}>
            <div className={classes.filteredProduct}>
              {isFetching && <Loading />}
              {data && (
                <ProductsSlug
                  product={data}
                  productsBasket={productsBasket}
                  addBaskets={addBaskets}
                  favorites={favorites}
                  manageFavorite={manageFavorite}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }
)

export default FilterMainContent
