import * as React from 'react'
import { useAppContext } from '../../../../context/appContext'
import { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import './style.css'
import axios from 'axios'

const VideoPage = () => {
  const [users, setUsers] = useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value)
    setPage(0)
  }
  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/user/active')
      setUsers(res.data.users)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                  First Name
                </TableCell>
                <TableCell sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                  Last Name
                </TableCell>
                <TableCell sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                  Email
                </TableCell>
                <TableCell
                  align='right'
                  sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}
                >
                  Currently
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      component='th'
                      scope='row'
                      style={{ width: '20%' }}
                    >
                      {row.firstName}
                    </TableCell>
                    <TableCell style={{ width: '20%' }}>
                      {row.lastName}
                    </TableCell>
                    <TableCell style={{ width: '40%' }}>{row.email}</TableCell>
                    <TableCell align='right' style={{ width: '20%' }}>
                      {row.active ? 'active' : 'inactive'}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15]}
          component='div'
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  )
}

export default VideoPage
