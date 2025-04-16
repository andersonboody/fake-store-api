import Loading from '@/shared/ui/spin/Spin'
import { useGetProductsQuery, useLazyGetProductTitleQuery } from '@/shared/services/api/endpoints/products/products'
import { AdminProductList } from '@/widgets/Admin/AdminProduct/AdminProductList'
import { useState } from 'react'

const AdminProducts = () => {
  const [isSearching, setIsSearching] = useState(false)
  const { data, isFetching } = useGetProductsQuery({ limit: 100, offset: 0 })
  const [search, { data: dataSearch, isFetching: fetchSearch }] = useLazyGetProductTitleQuery()

  return (
    <>
      {(isFetching || fetchSearch) && <Loading />}
      {isSearching
        ? dataSearch && <AdminProductList products={dataSearch} search={search} onSearch={setIsSearching} />
        : data && <AdminProductList products={data} search={search} onSearch={setIsSearching} />}
    </>
  )
}

export default AdminProducts
