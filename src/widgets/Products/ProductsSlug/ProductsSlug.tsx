import classes from './ProductsSlug.module.scss'
import ProductSlug from '../ProductSlug/ProductSlug'
import { IProductSlugProps } from '../Types'

const ProductsSlug = ({ product, addBaskets, favorites, manageFavorite, productsBasket }: IProductSlugProps) => {
  return (
    <ul className={classes.filteredProductList}>
      {product.length > 0 ? (
        product.map((ware) => (
          <li key={ware.id}>
            <ProductSlug
              product={ware}
              productsBasket={productsBasket}
              addBaskets={() =>
                addBaskets({
                  id: ware.id,
                  image: ware.images[0],
                  title: ware.title,
                  price: ware.price,
                  quantity: 1,
                })
              }
              favorites={favorites}
              upFavorites={() =>
                manageFavorite({
                  id: ware.id,
                  image: ware.images[0],
                  title: ware.title,
                  price: ware.price,
                })
              }
            />
          </li>
        ))
      ) : (
        <li className={classes.filteredProductListNull}>Не удалось найти товаров по вашим кретериям!</li>
      )}
    </ul>
  )
}

export default ProductsSlug
