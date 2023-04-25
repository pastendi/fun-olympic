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
import AddVideo from './AddVideo'
import UpdateVideo from './UpdateVideo'
import DeleteVideo from './DeleteVideo'
import ViewComment from './ViewComment'
import { BASE_URL } from '../../../constant'
import './style.css'

const VideoPage = () => {
  const { videos, getVideos } = useAppContext()
  const [addVideo, setAddVideo] = useState(false)
  const [videoId, setVideoId] = useState('')
  const [updateVideo, setUpdateVideo] = useState(false)
  const [deleteVideo, setDeleteVideo] = useState(false)
  const [viewComment, setViewComment] = useState(false)
  const [page, setPage] = React.useState(0)
  const [videosPerPage, setVideosPerPage] = React.useState(10)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const updating = (id) => {
    setVideoId(id)
    setUpdateVideo(true)
  }
  const comments = (id) => {
    setVideoId(id)
    setViewComment(true)
  }
  const deleting = (id) => {
    setVideoId(id)
    setDeleteVideo(true)
  }

  const handleChangeVideosPerPage = (event) => {
    setVideosPerPage(+event.target.value)
    setPage(0)
  }
  useEffect(() => {
    getVideos()
  }, [addVideo, updateVideo, deleteVideo])
  return (
    <>
      {addVideo && <AddVideo setAddVideo={setAddVideo} />}
      {viewComment && (
        <ViewComment setViewComment={setViewComment} id={videoId} />
      )}
      {updateVideo && (
        <UpdateVideo setUpdateVideo={setUpdateVideo} id={videoId} />
      )}
      {deleteVideo && (
        <DeleteVideo setDeleteVideo={setDeleteVideo} id={videoId} />
      )}
      <button className='add-video' onClick={() => setAddVideo(true)}>
        Add video
      </button>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                  Video
                </TableCell>
                <TableCell
                  align='right'
                  sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}
                >
                  Views
                </TableCell>
                <TableCell
                  align='right'
                  sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}
                >
                  Likes
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
              {videos
                .slice(
                  page * videosPerPage,
                  page * videosPerPage + videosPerPage
                )
                .map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      <div className='video-part'>
                        <div className='thumbnail'>
                          <img
                            src={`${BASE_URL + '/' + row.thumbnail}`}
                            alt='video thumbnail'
                          />
                        </div>
                        <div className='title'>{row.title}</div>
                      </div>
                    </TableCell>
                    <TableCell align='right'>{row.views}</TableCell>
                    <TableCell align='right'>{row.likes}</TableCell>
                    <TableCell align='right'>
                      <button
                        className='btn btn-update'
                        onClick={() => {
                          comments(row._id)
                        }}
                      >
                        View comments
                      </button>
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
          rowsPerPageOptions={[10, 15]}
          component='div'
          count={videos.length}
          rowsPerPage={videosPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeVideosPerPage}
        />
      </Paper>
    </>
  )
}

export default VideoPage
