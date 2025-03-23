import { CloseOutlined } from '@ant-design/icons'
import classes from './Favorites.module.scss'
import { FavoriteProductType } from '../../shared/hooks/useFavorites'

interface IFavorites {
  onClose: () => void
  favorites: FavoriteProductType[]
}

const Favorites = ({ onClose, favorites }: IFavorites) => {
  const favorite = favorites.map((ware) => (
    <li key={ware.id} className={classes.basketCard}>
      <img src={ware.image} alt="Photo" className={classes.basketCardImage} />
      <div className={classes.basketCardDescription}>
        <p className={classes.basketCardTitle}>{ware.title}</p>
        <div className={classes.basketCardOrder}>
          <p className={classes.basketCardPrice}>{`${ware.price} $`}</p>
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
          <h3 className={classes.basketTitle}>Избранное:</h3>
        </div>
        <div className={classes.basketMain}>
          <ul className={classes.basketProductList}>{favorites && favorite}</ul>
        </div>
      </div>
    </section>
  )
}
export default Favorites
