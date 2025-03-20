import { HeartOutlined } from '@ant-design/icons'

import { ProductType } from '../../../shared/services/api/endpoints/products/productsDTO'
import classes from './Product.module.scss'
import { truncateText } from '../../../shared/lib/truncateText'
import { LocalProductType } from '../../../shared/hooks/useLocalStorage'
import { memo } from 'react'

export interface IProduct {
  product: ProductType
  productsLocal?: LocalProductType[]
  addLocalStorage: () => void
}

export const Product = memo(({ product, productsLocal, addLocalStorage }: IProduct) => {
  const productButton = productsLocal?.some((ware) => ware.id === product.id)

  return (
    <div className={classes.card}>
      <img src={product.images[0]} alt="Photo" className={classes.cardImage} />
      <div className={classes.cardDescription}>
        <button className={classes.cardFavorites}>
          <HeartOutlined />
        </button>
        <p className={classes.cardTitle}>{product.title}</p>
        <p className={classes.cardDescribe}>{truncateText(product.description, 24)}</p>
        <div className={classes.cardOrder}>
          <p>{`${product.price} $`}</p>

          <button className="button" onClick={addLocalStorage}>
            {productButton ? <span className={classes.addProduct}>+</span> : 'Add to Basket'}
          </button>
        </div>
      </div>
    </div>
  )
})
