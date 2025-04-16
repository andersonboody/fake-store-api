import { TableCell } from '@mui/material'

import classes from '../AdminTable.module.scss'
import { IAdminCategory } from './Types'
import { AdminEditCategory } from './AdminEditCategory'
import { AdminDeleteCategory } from './AdminDeleteCategory'

export const AdminCategoryListItem = ({ category }: IAdminCategory) => {
  return (
    <>
      <TableCell className={classes.tableCell}>{category.id}</TableCell>
      <TableCell className={classes.tableCellImg}>
        <img src={category.image} alt="Photo" />
      </TableCell>
      <TableCell className={classes.tableCell}>{category.name}</TableCell>
      <TableCell className={classes.tableCell}>{category.slug}</TableCell>
      <TableCell className={classes.tableCellBtn}>
        <AdminEditCategory category={category} />
      </TableCell>
      <TableCell className={classes.tableCellBtn}>
        <AdminDeleteCategory category={category} />
      </TableCell>
    </>
  )
}
