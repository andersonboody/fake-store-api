import { CategoriesType } from '@/shared/services/api/endpoints/categories/categoriesDTO'

export interface IAdminCategories {
  categories: CategoriesType[]
}

export interface IAdminCategory {
  category: CategoriesType
}
