import { DeleteOutlined } from '@ant-design/icons'

import classes from '../AdminTable.module.scss'

export const AdminDeleteProduct = () => {
  return (
    <>
      <button className={classes.tableButton}>
        <DeleteOutlined />
      </button>
    </>
  )
}
