import Loading from '@/shared/ui/spin/Spin'
import { useGetProductsQuery } from '@/shared/services/api/endpoints/products/products'
import { AdminProductList } from '@/widgets/Admin/AdminProduct/AdminProductList'

const AdminProducts = () => {
  const { data, isFetching } = useGetProductsQuery({ limit: 100, offset: 0 })

  return (
    <>
      {isFetching && <Loading />}
      {data && <AdminProductList products={data} />}
    </>
  )
}

export default AdminProducts
