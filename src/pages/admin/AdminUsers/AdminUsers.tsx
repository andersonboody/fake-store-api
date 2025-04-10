import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import classes from './AdminUsers.module.scss'
import { useGetUsersQuery } from '@/shared/services/api/endpoints/users/users'
import Loading from '@/shared/ui/spin/Spin'
import { AdminUserDelete } from '@/widgets/Admin/AdminUser/AdminUserDelete'
import { AdminUserEdit } from '@/widgets/Admin/AdminUser/AdminUserEdit'
import { AdminUserCreate } from '@/widgets/Admin/AdminUser/AdminUserCreate'
import { AdminUserSearch } from '@/widgets/Admin/AdminUser/AdminUserSearch'

const AdminUsers = () => {
  const { data, isFetching } = useGetUsersQuery()

  return (
    <>
      {isFetching && <Loading />}
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
                <AdminUserSearch />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((user) => (
                <TableRow key={user.id} className={classes.tableRow}>
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
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default AdminUsers
