import { useGetProductsQuery } from '../../../shared/services/api/endpoints/products/products'
import { Product } from '../Product/Product'
import classes from './ProductList.module.scss'
import { LocalProductType } from '../../../shared/hooks/useLocalStorage'

interface IProductList {
  products: LocalProductType[]
  addLocalStorage: (product: LocalProductType) => void
}

export const ProductList = ({ products, addLocalStorage }: IProductList) => {
  const { data, isLoading } = useGetProductsQuery({ limit: 9, offset: 0 })

  const productItem = data?.map((elem) => (
    <div key={elem.id}>
      <Product
        product={elem}
        productsLocal={products}
        addLocalStorage={() =>
          addLocalStorage({
            id: elem.id,
            image: elem.images[0],
            title: elem.title,
            price: elem.price,
            quantity: 1,
          })
        }
      />
    </div>
  ))

  return (
    <section className={classes.productList}>
      {isLoading && <p>Loading...</p>}
      {productItem}
    </section>
  )
}
