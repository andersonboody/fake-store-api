import { useCallback, useEffect, useState } from 'react'
import { ProductType } from '@services/api/endpoints/products/productsDTO'

export type LocalProductType = Pick<ProductType, 'id' | 'title' | 'price'> & {
  quantity: number
  image: string
}

export const useBaskets = () => {
  const [products, setProducts] = useState<LocalProductType[]>(() => {
    const storedProduct = localStorage.getItem('products')
    return storedProduct ? JSON.parse(storedProduct) : []
  })

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products))
  }, [products])

  const totalPrice = products.reduce((acc, ware) => (acc += ware.price * ware.quantity), 0)

  const addBaskets = useCallback((product: LocalProductType) => {
    setProducts((prevProducts) => {
      const isProductInProductArray = prevProducts.some((ware: LocalProductType) => ware.id === product.id)

      if (!isProductInProductArray) {
        return [...prevProducts, product]
      } else {
        const updateProductArray = prevProducts.map((ware: LocalProductType) => {
          if (ware.id === product.id) {
            return { ...ware, quantity: ware.quantity + 1 }
          }
          return ware
        })
        return updateProductArray
      }
    })
  }, [])

  const clearBaskets = useCallback(() => {
    localStorage.removeItem('products')
    setProducts([])
  }, [])

  const deleteProductBaskets = useCallback((id: number) => {
    setProducts((prevProducts) => {
      const quantityProduct = prevProducts.some((ware: LocalProductType) => ware.id === id && ware.quantity > 1)

      if (quantityProduct) {
        const newProductsArray = prevProducts.map((ware: LocalProductType) => {
          if (id === ware.id) return { ...ware, quantity: ware.quantity - 1 }
          return ware
        })
        return newProductsArray
      } else {
        const newProductsArray = prevProducts.filter((ware: LocalProductType) => id !== ware.id)
        return newProductsArray
      }
    })
  }, [])

  return { products, totalPrice, addBaskets, clearBaskets, deleteProductBaskets }
}
