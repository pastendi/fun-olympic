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
  const [action, setAction] = useState(true)
  const [users, setUsers] = useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const block = async (id) => {
    try {
      await axios.patch(`/api/user/block-unblock/${id}`, { command: true })
      setAction(!action)
    } catch (error) {
      console.log(error)
    }
  }
  const unblock = async (id) => {
    try {
      await axios.patch(`/api/user/block-unblock/${id}`, { command: false })
      setAction(!action)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value)
    setPage(0)
  }
  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/user')
      setUsers(res.data.users)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [action])
  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                  User
                </TableCell>
                <TableCell sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                  Status
                </TableCell>
                <TableCell
                  align='right'
                  sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}
                >
                  Action
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
                      style={{ width: '25%' }}
                    >
                      {row.firstName + ' ' + row.lastName}
                    </TableCell>
                    <TableCell style={{ width: '35%' }}>{row.email}</TableCell>
                    <TableCell style={{ width: '25%' }}>
                      {row.blocked ? 'blocked' : 'member'}
                    </TableCell>
                    <TableCell align='right' style={{ width: '15%' }}>
                      {row.blocked ? (
                        <button
                          className='btn btn-update'
                          onClick={() => {
                            unblock(row._id)
                          }}
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          className='btn btn-delete'
                          onClick={() => {
                            block(row._id)
                          }}
                        >
                          Block
                        </button>
                      )}
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
