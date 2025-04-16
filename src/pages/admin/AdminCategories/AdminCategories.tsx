import { useGetCategoryQuery } from '@/shared/services/api/endpoints/categories/categories'
import Loading from '@/shared/ui/spin/Spin'
import { AdminCategoryList } from '@/widgets/Admin/AdminCategory/AdminCategoryList'

const AdminCategories = () => {
  const { data, isFetching } = useGetCategoryQuery({ limit: 100 })
  return (
    <>
      {isFetching && <Loading />}
      {data && <AdminCategoryList categories={data} />}
    </>
  )
}

export default AdminCategories
