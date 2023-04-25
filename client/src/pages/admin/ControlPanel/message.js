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
import ReadMessage from './components/ReadMessage'

const headCells = ['From', 'Subject', 'Message', 'Date']

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

export default function Message() {
  const [selected, setSelected] = React.useState(false)
  const [messages, setMessages] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(15)
  const [message, setMessage] = React.useState({})

  const handleClick = ({ row }) => {
    setMessage(row)
    setSelected(true)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - messages.length) : 0

  const fetchEmail = async () => {
    try {
      const res = await axios.get('/api/mail')
      setMessages(res.data.messages)
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    fetchEmail()
  }, [selected])
  return (
    <Box sx={{ width: '100%', height: '100vh' }}>
      {selected && <ReadMessage message={message} setSelected={setSelected} />}
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TablePagination
          rowsPerPageOptions={[15, 25]}
          component='div'
          count={messages.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 800 }}
            aria-labelledby='tableTitle'
            size='medium'
          >
            <EnhancedTableHead />
            <TableBody>
              {messages
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      onClick={() => handleClick({ row })}
                      tabIndex={-1}
                      key={row._id}
                    >
                      <TableCell
                        component='th'
                        scope='row'
                        style={{ width: '25%' }}
                      >
                        {row.from}
                      </TableCell>
                      <TableCell align='left' style={{ width: '25%' }}>
                        {row.subject.substring(0, 20) + '...'}
                      </TableCell>
                      <TableCell align='left' style={{ width: '35%' }}>
                        {row.message.substring(0, 35) + '.....'}
                      </TableCell>
                      <TableCell align='right' style={{ width: '15%' }}>
                        {row.createdAt.substring(0, 10)}
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
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
  )
}
