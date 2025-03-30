import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { Carousel } from 'antd'

import classes from './ProductDetails.module.scss'
import { useGetProductSlugQuery } from '../../shared/services/api/endpoints/products/products'
import { Logo } from '../../shared/ui/logo/logo'
import Loading from '../../shared/ui/spin/Spin'
import useBaskets from '../../shared/hooks/useBaskets'
import { useFavorites } from '../../shared/hooks/useFavorites'

const ProductDetails = memo(() => {
  const { slug } = useParams()
  const { data, isLoading } = useGetProductSlugQuery({ slug })

  const { products, addBaskets } = useBaskets()
  const { favorites, manageFavorite } = useFavorites()

  const isBasket = products.some((product) => product.id === data?.id)
  const isFavorite = favorites.some((product) => product.id === data?.id)

  return (
    <section className={classes.details}>
      <header className={classes.detailsHeader}>
        <Logo />
      </header>
      <main className={classes.detailsContent}>
        {isLoading && (
          <div className={classes.detailsLoading}>
            <Loading />
          </div>
        )}
        {data && (
          <>
            <div className={classes.detailsImages}>
              <Carousel>
                {data.images.map((image, index) => (
                  <img src={image} alt="photo" key={index} />
                ))}
              </Carousel>
            </div>
            <div className={classes.detailsDescription}>
              <h2>{data.title}</h2>
              <p>{data.description}</p>

              <div className={classes.detailsGroup}>
                <p className={classes.detailsPrice}> {`${data.price}$`}</p>
                <div className={classes.detailsGroupBtn}>
                  <button
                    className={classes.detailsBtn}
                    onClick={() =>
                      manageFavorite({ id: data.id, title: data.title, price: data.price, image: data.images[0] })
                    }
                    disabled={isFavorite}
                  >
                    Favorite
                  </button>
                  <button
                    className={classes.detailsBtn}
                    onClick={() =>
                      addBaskets({
                        id: data.id,
                        title: data.title,
                        price: data.price,
                        image: data.images[0],
                        quantity: 1,
                      })
                    }
                    disabled={isBasket}
                  >
                    Basket
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </section>
  )
})

export default ProductDetails
