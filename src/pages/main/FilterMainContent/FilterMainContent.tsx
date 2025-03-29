import { memo, useCallback, useState } from 'react'

import classes from '../main.module.scss'
import { CategoryMenu } from '../../../widgets/CategoryMenu/CategoryMenu'
import ProductsSlug from '../../../widgets/Products/ProductsSlug/ProductsSlug'
import { IProductListProps } from '../../../widgets/Products/Types'
import { Filter } from '../../../widgets/Filter/Filter'
import { useGetProductsToSlugQuery } from '../../../shared/services/api/endpoints/products/products'
import Loading from '../../../shared/ui/spin/Spin'

type FilterMainContentProps = IProductListProps & {
  categorySlug: string
}

const FilterMainContent = memo(
  ({ categorySlug, addBaskets, favorites, manageFavorite, productsBasket }: FilterMainContentProps) => {
    const [priceFilter, setPriceFilter] = useState({ minPrice: 0, maxPrice: 0 })
    const { data, isLoading } = useGetProductsToSlugQuery({
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
              {isLoading && (
                <div className={classes.filteredProductLoading}>
                  <Loading />
                </div>
              )}
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
