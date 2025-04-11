import { TableCell } from '@mui/material'

import classes from '../AdminTable.module.scss'
import { AdminProductType } from './Types'
import { AdminDeleteProduct } from './AdminDeleteProduct'
import { AdminEditProduct } from './AdminEditProduct'

export const AdminProductListItem = ({ product }: AdminProductType) => {
  return (
    <>
      <TableCell className={classes.tableCell}>{product.id}</TableCell>
      <TableCell className={classes.tableCellImg}>
        <img src={product.images[0]} alt="Image" />
      </TableCell>
      <TableCell className={classes.tableCell}>{product.title}</TableCell>
      <TableCell className={classes.tableCell}>{`${product.price}$`}</TableCell>
      <TableCell className={classes.tableCellBtn}>
        <AdminEditProduct />
      </TableCell>
      <TableCell className={classes.tableCellBtn}>
        <AdminDeleteProduct />
      </TableCell>
    </>
  )
}
