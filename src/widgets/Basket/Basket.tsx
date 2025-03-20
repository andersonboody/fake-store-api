import { CloseOutlined } from '@ant-design/icons'
import { useEffect } from 'react'

import classes from './Basket.module.scss'
import useLocalStorage from '../../shared/hooks/useLocalStorage'

interface IBasket {
  onClose: () => void
}

const Basket = ({ onClose }: IBasket) => {
  const { products, totalPrice, clearLocalStorage, deleteProductLocalStorage, addLocalStorage } = useLocalStorage()

  useEffect(() => {
    document.body.classList.add(classes.overflowHidden)
    return () => document.body.classList.remove(classes.overflowHidden)
  }, [])

  const product = products.map((ware) => (
    <li key={ware.id} className={classes.basketCard}>
      <img src={ware.image} alt="Photo" className={classes.basketCardImage} />
      <div className={classes.basketCardDescription}>
        <p className={classes.basketCardTitle}>{ware.title}</p>
        <div className={classes.basketCardOrder}>
          <p className={classes.basketCardPrice}>{`${ware.price} $`}</p>
          <div className={classes.blockQuantity}>
            <button className={classes.addQuantity} onClick={() => addLocalStorage(ware)}>
              +
            </button>
            <p className={classes.basketCardQuantity}>{ware.quantity}</p>
            <button className={classes.delQuantity} onClick={() => deleteProductLocalStorage(ware.id)}>
              -
            </button>
          </div>
        </div>
      </div>
    </li>
  ))

  return (
    <section className={classes.basketWrapper}>
      <div className={classes.basket}>
        <div className={classes.basketHeader}>
          <button className={classes.basketClose} onClick={onClose}>
            <CloseOutlined />
          </button>
          <h3 className={classes.basketTitle}>Корзина:</h3>
        </div>
        <div className={classes.basketMain}>
          <ul className={classes.basketProductList}>{products && product}</ul>
        </div>
        <div className={classes.basketFooter}>
          <div className={classes.basketFooterPrice}>
            <p className={classes.basketFooterPriceTitle}>Итого</p>
            <p className={classes.basketFooterPriceAll}>{`${totalPrice} $`}</p>
          </div>
          <div className={classes.basketFooterPrice}>
            <p className={classes.basketFooterPriceTitle}>Скидка</p>
            <p className={classes.basketFooterPriceAll}>1000р</p>
          </div>
          <button
            className={`button ${classes.basketFooterOrder}`}
            onClick={clearLocalStorage}
            disabled={products.length ? false : true}
          >
            {products.length ? 'Заказать' : 'Корзина пустая'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Basket
