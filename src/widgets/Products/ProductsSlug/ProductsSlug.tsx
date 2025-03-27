import classes from './ProductsSlug.module.scss'
import ProductSlug from '../ProductSlug/ProductSlug'
import { IProductSlugProps } from '../Types'

const ProductsSlug = ({ product, addLocalStorage, favorites, manageFavorite, productsLocal }: IProductSlugProps) => {
  return (
    <ul className={classes.filteredProductList}>
      {product &&
        product.map((ware) => (
          <li key={ware.id}>
            <ProductSlug
              product={ware}
              productsLocal={productsLocal}
              addLocalStorage={() =>
                addLocalStorage({
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
        ))}
    </ul>
  )
}

export default ProductsSlug
