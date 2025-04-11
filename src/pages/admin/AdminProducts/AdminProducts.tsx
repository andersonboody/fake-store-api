import { useGetProductsQuery } from '@/shared/services/api/endpoints/products/products'
import Loading from '@/shared/ui/spin/Spin'
import { AdminProductList } from '@/widgets/Admin/AdminProduct/AdminProductList'

const AdminProducts = () => {
  const { data, isLoading } = useGetProductsQuery({ limit: 100, offset: 0 })

  return (
    <>
      {isLoading && <Loading />}
      {data && <AdminProductList products={data} />}
    </>
  )
}

export default AdminProducts
