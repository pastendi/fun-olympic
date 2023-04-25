import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import axios from 'axios'
import './style.css'

const headCells = ['User', 'Chat', 'Action']

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
            align='left'
            sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}
          >
            {headCell}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default function ViewChat({ id, setViewChat }) {
  const [chats, setChats] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [selected, setSelected] = React.useState('')
  const [confirm, setConfirm] = React.useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - chats.length) : 0

  const getChats = async () => {
    try {
      const res = await axios.get(`/api/chats/${id}`)
      setChats(res.data.chats)
    } catch (error) {
      console.log(error)
    }
  }
  const selectedChat = async (id) => {
    setSelected(id)
    setConfirm(true)
  }
  const yesCondition = async () => {
    try {
      const res = await axios.delete(`/api/chats/${selected}`)
      setConfirm(false)
      getChats()
    } catch (err) {
      console.error('Failed to delete file', err)
    }
  }
  const noCondition = () => {
    setConfirm(false)
  }
  React.useEffect(() => {
    getChats()
  }, [])
  return (
    <div className='back'>
      <div className='wrap'>
        <span className='close_btn' onClick={() => setViewChat(false)}>
          <i className='fa-solid fa-xmark'></i>
        </span>
        <h1 className='topic'>Comments</h1>
        <Box sx={{ width: '100%', height: '70vh' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TablePagination
              rowsPerPageOptions={[5]}
              component='div'
              count={chats.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <TableContainer>
              <Table
                sx={{ minWidth: 600 }}
                size='small'
                aria-label='a dense table'
              >
                <EnhancedTableHead />
                <TableBody>
                  {chats
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          tabIndex={-1}
                          key={row._id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell
                            component='th'
                            scope='row'
                            style={{ width: '25%' }}
                          >
                            {row.user}
                          </TableCell>
                          <TableCell align='left' style={{ width: '65%' }}>
                            {row.message}
                          </TableCell>
                          <TableCell align='right' style={{ width: '15%' }}>
                            <button onClick={() => selectedChat(row._id)}>
                              Delete
                            </button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 1 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </div>
      {confirm && (
        <div className='confirmation'>
          <h1>Are you sure you want to delete this message?</h1>
          <div className='delete-option'>
            <button className='btn btn-upload' onClick={() => yesCondition()}>
              Yes
            </button>
            <button className='btn btn-delete' onClick={() => noCondition()}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
