import classes from '../Wrapper/Wrapper.module.scss'
import { FavoriteProductType } from '../../shared/hooks/useFavorites'
import Wrapper from '../Wrapper/Wrapper'
import { HeartFilled } from '@ant-design/icons'

interface IFavorites {
  onClose: () => void
  favorites: FavoriteProductType[]
  manageFavorite: (product: FavoriteProductType) => void
}

const Favorites = ({ onClose, favorites, manageFavorite }: IFavorites) => {
  const favorite = favorites.map((ware) => (
    <li key={ware.id} className={classes.card}>
      <img src={ware.image} alt="Photo" className={classes.cardImage} />
      <div className={classes.cardDescription}>
        <p className={classes.cardTitle}>{ware.title}</p>
        <div className={classes.cardOrder}>
          <p className={classes.cardPrice}>{`${ware.price} $`}</p>
          <button className={classes.buttonFavorites} onClick={() => manageFavorite(ware)}>
            <HeartFilled />
          </button>
        </div>
      </div>
    </li>
  ))
  return (
    <Wrapper title="Избранное" onClose={onClose}>
      <div className={classes.contentMain}>
        <ul className={classes.cardList}>{favorites && favorite}</ul>
      </div>
    </Wrapper>
  )
}
export default Favorites
