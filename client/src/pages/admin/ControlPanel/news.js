import * as React from 'react'
import { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import AddNews from './components/AddNews'
import UpdateNews from './components/UpdateNews'
import DeleteNews from './components/DeleteNews'
import { BASE_URL } from '../../constant'
import './components/style.css'
import axios from 'axios'

const News = () => {
  const [news, setNews] = useState([])
  const [addNews, setAddNews] = useState(false)
  const [newsId, setNewsId] = useState('')
  const [updateNews, setUpdateNews] = useState(false)
  const [deleteNews, setDeleteNews] = useState(false)
  const [page, setPage] = React.useState(0)
  const [newsPerPage, setNewsPerPage] = React.useState(5)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const updating = (id) => {
    setNewsId(id)
    setUpdateNews(true)
  }
  const deleting = (id) => {
    setNewsId(id)
    setDeleteNews(true)
  }

  const handleChangeNewsPerPage = (event) => {
    setNewsPerPage(+event.target.value)
    setPage(0)
  }
  const getNews = async () => {
    const res = await axios.get('/api/news')
    setNews(res.data.news)
  }
  useEffect(() => {
    getNews()
  }, [addNews, updateNews, deleteNews])
  return (
    <div className='news'>
      {addNews && <AddNews setAddNews={setAddNews} />}
      {updateNews && <UpdateNews setUpdateNews={setUpdateNews} id={newsId} />}
      {deleteNews && <DeleteNews setDeleteNews={setDeleteNews} id={newsId} />}
      <button className='add-video' onClick={() => setAddNews(true)}>
        Add News
      </button>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}
                  style={{ width: '30%' }}
                  align='right'
                >
                  News
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}
                  style={{ width: '20%' }}
                ></TableCell>
                <TableCell
                  align='right'
                  sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}
                  style={{ width: '40%' }}
                >
                  Description
                </TableCell>
                <TableCell
                  align='right'
                  sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}
                  style={{ width: '10%' }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {news
                .slice(page * newsPerPage, page * newsPerPage + newsPerPage)
                .map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      <div className='news-image'>
                        <img
                          src={`${BASE_URL + '/' + row.image}`}
                          alt='news-pic'
                        />
                      </div>
                    </TableCell>
                    <TableCell align='justify'>
                      <div className='title'>{row.title}</div>
                    </TableCell>
                    <TableCell align='justify'>{row.desc}</TableCell>
                    <TableCell align='right'>
                      <button
                        className='btn btn-update'
                        onClick={() => {
                          updating(row._id)
                        }}
                      >
                        update
                      </button>
                      <button
                        className='btn btn-delete'
                        onClick={() => {
                          deleting(row._id)
                        }}
                      >
                        delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component='div'
          count={news.length}
          rowsPerPage={newsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeNewsPerPage}
        />
      </Paper>
    </div>
  )
}

export default News
