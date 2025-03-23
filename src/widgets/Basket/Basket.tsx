import classes from '../Wrapper/Wrapper.module.scss'
import { LocalProductType } from '../../shared/hooks/useLocalStorage'
import Wrapper from '../Wrapper/Wrapper'

interface IBasket {
  onClose: () => void
  products: LocalProductType[]
  deleteProductLocalStorage: (id: number) => void
  addLocalStorage: (product: LocalProductType) => void
  clearLocalStorage: () => void
  totalPrice: number
}

const Basket = ({
  products,
  deleteProductLocalStorage,
  addLocalStorage,
  clearLocalStorage,
  totalPrice,
  onClose,
}: IBasket) => {
  const product = products.map((ware) => (
    <li key={ware.id} className={classes.card}>
      <img src={ware.image} alt="Photo" className={classes.cardImage} />
      <div className={classes.cardDescription}>
        <p className={classes.cardTitle}>{ware.title}</p>
        <div className={classes.cardOrder}>
          <p className={classes.cardPrice}>{`${ware.price} $`}</p>
          <div className={classes.cardQuantity}>
            <button className={classes.addQuantity} onClick={() => addLocalStorage(ware)}>
              +
            </button>
            <p>{ware.quantity}</p>
            <button className={classes.delQuantity} onClick={() => deleteProductLocalStorage(ware.id)}>
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
        <button
          className={`button ${classes.basketFooterOrder}`}
          onClick={clearLocalStorage}
          disabled={products.length ? false : true}
        >
          {products.length ? 'Заказать' : 'Корзина пустая'}
        </button>
      </div>
    </Wrapper>
  )
}

export default Basket
