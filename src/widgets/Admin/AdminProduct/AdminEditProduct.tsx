import { EditOutlined } from '@ant-design/icons'

import classes from '../AdminTable.module.scss'

export const AdminEditProduct = () => {
  return (
    <>
      <button className={classes.tableButton}>
        <EditOutlined />
      </button>
    </>
  )
}
