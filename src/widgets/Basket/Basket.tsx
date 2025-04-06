import { Link } from 'react-router-dom'

import classes from '../Wrapper/Wrapper.module.scss'
import Wrapper from '../Wrapper/Wrapper'
import { IBasket } from './Types'
import { imageVerification } from '../../shared/lib/imageVerification'
import { Route } from '../../app/router/route'

const Basket = ({ products, deleteProductBaskets, addBaskets, totalPrice, onClose }: IBasket) => {
  const product = products.map((ware) => (
    <li key={ware.id} className={classes.card}>
      <img src={imageVerification(ware.image)} alt="Photo" className={classes.cardImage} />
      <div className={classes.cardDescription}>
        <p className={classes.cardTitle}>{ware.title}</p>
        <div className={classes.cardOrder}>
          <p className={classes.cardPrice}>{`${ware.price} $`}</p>
          <div className={classes.cardQuantity}>
            <button className={classes.addQuantity} onClick={() => addBaskets(ware)}>
              +
            </button>
            <p>{ware.quantity}</p>
            <button className={classes.delQuantity} onClick={() => deleteProductBaskets(ware.id)}>
              -
            </button>
          </div>
        </div>
      </div>
    </li>
  ))

  return (
    <Wrapper title="Корзина" onClose={onClose}>
      <div className={classes.contentMain}>
        <ul className={classes.cardList}>{products && product}</ul>
      </div>
      <div className={classes.basketFooter}>
        <div className={classes.basketFooterPrice}>
          <p className={classes.basketFooterPriceTitle}>Итого</p>
          <p className={classes.basketFooterPriceAll}>{`${totalPrice} $`}</p>
        </div>
        <Link to={Route.Order}>
          <button className={`button ${classes.basketFooterOrder}`} disabled={products.length ? false : true}>
            {products.length ? 'Оформить заказ' : 'Корзина пустая'}
          </button>
        </Link>
      </div>
    </Wrapper>
  )
}

export default Basket
