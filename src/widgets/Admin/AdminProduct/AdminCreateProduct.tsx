import { UserAddOutlined } from '@ant-design/icons'

import classes from '../AdminTable.module.scss'

export const AdminCreateProduct = () => {
  return (
    <>
      <button className={classes.tableButton}>
        <UserAddOutlined />
      </button>
    </>
  )
}
