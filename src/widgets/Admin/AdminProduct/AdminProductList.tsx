import { Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material'

import classes from '../AdminTable.module.scss'
import { AdminProductsType } from './Types'
import { AdminProductListItem } from './AdminProductListItem'
import { AdminSearchProduct } from './AdminSearchProduct'
import { AdminCreateProduct } from './AdminCreateProduct'
import { AdminBackProducts } from './AdminBackProdcuts'

export const AdminProductList = ({ products, search, onSearch }: AdminProductsType) => {
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table size="small">
        <TableHead className={classes.tableHead}>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>Id</TableCell>
            <TableCell className={classes.tableCell}>Title</TableCell>
            <TableCell className={classes.tableCell}>Image</TableCell>
            <TableCell className={classes.tableCell}>Price</TableCell>
            <TableCell className={classes.tableCellBtn}>
              <AdminCreateProduct />
            </TableCell>
            <TableCell className={classes.tableCellBtn}>
              <AdminSearchProduct search={search} onSearch={onSearch} />
            </TableCell>
            {products.length <= 1 && (
              <TableCell className={classes.tableCellBtn}>
                <AdminBackProducts onSearch={onSearch} />
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length > 0 ? (
            products.map((ware) => (
              <TableRow key={ware.id} className={classes.tableRow}>
                <AdminProductListItem product={ware} />
              </TableRow>
            ))
          ) : (
            <TableRow className={classes.tableRow}>
              <TableCell className={classes.tableCell} colSpan={4}>
                Данного товара не было найдено!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
