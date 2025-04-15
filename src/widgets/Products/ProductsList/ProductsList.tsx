import { useCallback, useEffect, useRef, useState } from 'react'

import classes from './ProductsList.module.scss'
import { useGetProductsObserverQuery } from '@services/api/endpoints/products/products'
import Loading from '@/shared/ui/spin/Spin'
import { Product } from '../Product/Product'
import { IProductListProps } from '../Types'

export const ProductList = ({ productsBasket, addBaskets, favorites, manageFavorite }: IProductListProps) => {
  const [offset, setOffset] = useState(0)
  const { data, isLoading, isFetching } = useGetProductsObserverQuery({ limit: 12, offset }, { skip: false })
  const lastProductRef = useRef<HTMLDivElement>(null)
  const [isObserving, setIsObserving] = useState(false)

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const firstEntry = entries[0]
      if (offset < 48) {
        if (firstEntry.isIntersecting && !isLoading && !isObserving && !isFetching) {
          setIsObserving(true)
          setOffset((prev) => prev + 12)
        }
      }
    },
    [isLoading, isObserving, isFetching, offset]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.5 })
    const currentRef = lastProductRef.current

    if (currentRef) {
      observer.observe(currentRef)
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [lastProductRef, handleObserver])

  useEffect(() => {
    if (!isLoading && !isFetching) setIsObserving(false)
  }, [isLoading, isFetching, data])

  const productItem = data?.map((ware, index) => {
    return (
      <div key={ware.id} ref={index === data.length - 1 ? lastProductRef : null}>
        <Product
          product={ware}
          productsBasket={productsBasket}
          addBaskets={() =>
            addBaskets({
              id: ware.id,
              image: ware.images[0],
              title: ware.title,
              price: ware.price,
              quantity: 1,
            })
          }
          favorites={favorites}
          upFavorites={() =>
            manageFavorite({
              id: ware.id,
              image: ware.images[0],
              title: ware.title,
              price: ware.price,
            })
          }
        />
      </div>
    )
  })

  return (
    <section className={classes.productList}>
      {isLoading && <Loading />}
      {productItem}
    </section>
  )
}
