import React, {useEffect} from 'react'
import { useDispatch, useAPIDeleteWork } from '../hooks'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Work ({ workId, userName, contents, price, workDate }) {
  const dispatch = useDispatch()
  const [ work, deleteWork ] = useAPIDeleteWork()

  useEffect(() => {
    if (work && work.data === workId) {
      dispatch({ type: 'DELETE_WORK', workId })
      dispatch({ type: 'DELETE_SUCCESS'})
    }
  }, [dispatch, work, workId])

  function handleClick() {
    deleteWork(workId)
  }
  return (
    <TableRow>
        <TableCell component="th" scope="row">{userName}</TableCell>
        <TableCell>{contents}</TableCell>
        <TableCell>{price}</TableCell>
        <TableCell>{workDate}</TableCell>
        <TableCell>
        <IconButton onClick={handleClick}>
          <DeleteIcon/>
        </IconButton>
        </TableCell>
    </TableRow>
  )
}
