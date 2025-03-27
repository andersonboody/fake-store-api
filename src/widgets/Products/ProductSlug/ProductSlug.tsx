import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

import classes from './ProductSlug.module.scss'
import { IProductProps } from '../Types'
import { imageVerification } from '../../../shared/lib/imageVerification'

const ProductSlug = ({ product, addLocalStorage, upFavorites, productsLocal, favorites }: IProductProps) => {
  const productButton = productsLocal?.some((ware) => ware.id === product.id)
  const favoriteButton = favorites?.some((ware) => ware.id === product.id)

  return (
    <div className={classes.card}>
      <img src={imageVerification(product.images[0])} alt="Photo" className={classes.cardImage} />
      <div className={classes.cardDescription}>
        <p className={classes.cardTitle}>{product.title}</p>
        <p className={classes.cardPrice}>{`${product.price}$`}</p>
      </div>
      <ButtonGroup size="small" aria-label="Small button group" className={classes.cardButtons}>
        <Button className={classes.cardButton} onClick={upFavorites}>
          {favoriteButton ? '' : 'Favorite'}
        </Button>
        <Button className={classes.cardButton} onClick={addLocalStorage}>
          {productButton ? <span className={classes.addProduct}>+</span> : 'Basket'}
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default ProductSlug
