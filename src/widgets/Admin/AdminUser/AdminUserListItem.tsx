import { TableCell } from '@mui/material'

import classes from '../AdminTable.module.scss'
import { AdminUserEdit } from './AdminUserEdit'
import { AdminUserDelete } from './AdminUserDelete'
import { AdminUserProps } from './TypesDTO'

export const AdminUserListItem = ({ user }: AdminUserProps) => {
  if (!user) return

  return (
    <>
      <TableCell className={classes.tableCell}>{user.id}</TableCell>
      <TableCell className={classes.tableCell}>{user.name}</TableCell>
      <TableCell className={classes.tableCell}>{user.email}</TableCell>
      <TableCell className={classes.tableCell}>{user.role}</TableCell>
      <TableCell className={classes.tableCellBtn}>
        <AdminUserEdit user={user} />
      </TableCell>
      <TableCell className={classes.tableCellBtn}>
        <AdminUserDelete user={user} />
      </TableCell>
    </>
  )
}
