import { SearchOutlined } from '@ant-design/icons'

import classes from '../AdminTable.module.scss'

export const AdminSearchProduct = () => {
  return (
    <>
      <button className={classes.tableButton}>
        <SearchOutlined />
      </button>
    </>
  )
}
