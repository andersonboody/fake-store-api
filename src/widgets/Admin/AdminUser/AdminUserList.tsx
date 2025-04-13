import { memo } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import classes from '../AdminTable.module.scss'
import { AdminUserCreate } from './AdminUserCreate'
import { AdminUserSearch } from './AdminUserSearch'
import { AdminUserListItem } from './AdminUserListItem'
import { IAdminUser } from './TypesDTO'

export const AdminUserList = memo(({ users, searchUser }: IAdminUser) => {
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table size="small">
        <TableHead className={classes.tableRow}>
          <TableRow>
            <TableCell className={classes.tableCell}>Id</TableCell>
            <TableCell className={classes.tableCell}>Name</TableCell>
            <TableCell className={classes.tableCell}>Email</TableCell>
            <TableCell className={classes.tableCell}>Role</TableCell>
            <TableCell className={classes.tableCellBtn}>
              <AdminUserCreate />
            </TableCell>
            <TableCell className={classes.tableCellBtn}>
              <AdminUserSearch searchUser={searchUser} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.map((user) => (
              <TableRow key={user.id} className={classes.tableRow}>
                <AdminUserListItem user={user} />
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
})
