import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { memo } from 'react'

import classes from './Product.module.scss'
import { truncateText } from '../../../shared/lib/truncateText'
import { imageVerification } from '../../../shared/lib/imageVerification'
import { IProductProps } from '../Types'

export const Product = memo(({ product, productsBasket, addBaskets, favorites, upFavorites }: IProductProps) => {
  const productButton = productsBasket?.some((ware) => ware.id === product.id)
  const favoriteButton = favorites?.some((ware) => ware.id === product.id)

  return (
    <div className={classes.card}>
      <img src={imageVerification(product.images[0])} alt="Photo" className={classes.cardImage} />
      <div className={classes.cardDescription}>
        {favoriteButton ? (
          <button className={classes.buttonFavoritesActive} onClick={upFavorites}>
            <HeartFilled />
          </button>
        ) : (
          <button className={classes.buttonFavorites} onClick={upFavorites}>
            <HeartOutlined />
          </button>
        )}
        <p className={classes.cardTitle}>{product.title}</p>
        <p className={classes.cardDescribe}>{truncateText(product.description, 24)}</p>
        <div className={classes.cardOrder}>
          <p>{`${product.price} $`}</p>

          <button className="button" onClick={addBaskets}>
            {productButton ? <span className={classes.addProduct}>+</span> : 'Add to Basket'}
          </button>
        </div>
      </div>
    </div>
  )
})
