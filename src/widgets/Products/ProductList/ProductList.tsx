import { useCallback, useEffect, useRef, useState } from 'react'

import { useGetProductsQuery } from '../../../shared/services/api/endpoints/products/products'
import { Product } from '../Product/Product'
import classes from './ProductList.module.scss'
import { LocalProductType } from '../../../shared/hooks/useLocalStorage'

interface IProductList {
  products: LocalProductType[]
  addLocalStorage: (product: LocalProductType) => void
}

export const ProductList = ({ products, addLocalStorage }: IProductList) => {
  const [offset, setOffset] = useState(0)
  const { data, isLoading, isFetching } = useGetProductsQuery({ limit: 12, offset }, { skip: false })
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

  const productItem = data?.map((elem, index) => {
    return (
      <div key={elem.id} ref={index === data.length - 1 ? lastProductRef : null}>
        <Product
          product={elem}
          productsLocal={products}
          addLocalStorage={() =>
            addLocalStorage({
              id: elem.id,
              image: elem.images[0],
              title: elem.title,
              price: elem.price,
              quantity: 1,
            })
          }
        />
      </div>
    )
  })

  return (
    <section className={classes.productList}>
      {isLoading && <p>Loading...</p>}
      {productItem}
    </section>
  )
}
