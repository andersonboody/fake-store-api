import { RollbackOutlined } from '@ant-design/icons'

import classes from '../AdminTable.module.scss'
import { AdminProductsType } from './Types'

export const AdminBackProducts = ({ onSearch }: Pick<AdminProductsType, 'onSearch'>) => {
  return (
    <button className={classes.tableButton} onClick={() => onSearch(false)}>
      <RollbackOutlined />
    </button>
  )
}
