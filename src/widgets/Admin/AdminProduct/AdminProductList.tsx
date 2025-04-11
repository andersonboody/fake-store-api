import { Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material'

import classes from '../AdminTable.module.scss'
import { AdminProductsType } from './Types'
import { AdminProductListItem } from './AdminProductListItem'
import { AdminSearchProduct } from './AdminSearchProduct'
import { AdminCreateProduct } from './AdminCreateProduct'

export const AdminProductList = ({ products }: AdminProductsType) => {
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table size="small">
        <TableHead className={classes.tableRow}>
          <TableRow>
            <TableCell className={classes.tableCell}>Id</TableCell>
            <TableCell className={classes.tableCell}>Title</TableCell>
            <TableCell className={classes.tableCell}>Image</TableCell>
            <TableCell className={classes.tableCell}>Price</TableCell>
            <TableCell className={classes.tableCellBtn}>
              <AdminCreateProduct />
            </TableCell>
            <TableCell className={classes.tableCellBtn}>
              <AdminSearchProduct />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products &&
            products.map((ware) => (
              <TableRow key={ware.id} className={classes.tableRow}>
                <AdminProductListItem product={ware} />
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
