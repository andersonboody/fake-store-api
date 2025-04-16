import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import classes from '../AdminTable.module.scss'
import { AdminCategoryListItem } from './AdminCategoryListItem'
import { IAdminCategories } from './Types'
import { AdminCreateCategory } from './AdminCreateCategory'

export const AdminCategoryList = ({ categories }: IAdminCategories) => {
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table size="small">
        <TableHead className={classes.tableHead}>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>Id</TableCell>
            <TableCell className={classes.tableCell}>Image</TableCell>
            <TableCell className={classes.tableCell}>Name</TableCell>
            <TableCell className={classes.tableCell}>Slug</TableCell>
            <TableCell className={classes.tableCellBtn}>
              <AdminCreateCategory />
            </TableCell>
            <TableCell className={classes.tableCell}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories &&
            categories.map((category) => (
              <TableRow key={category.id} className={classes.tableRow}>
                <AdminCategoryListItem category={category} />
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
