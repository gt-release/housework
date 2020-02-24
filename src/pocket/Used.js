import React, {useEffect} from 'react'
import { useDispatch, useAPIDeleteUsed } from '../hooks'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Used ({ usedId, userName, contents, price, usedDate }) {
  const dispatch = useDispatch()
  const [ used, deleteUsed ] = useAPIDeleteUsed()

  useEffect(() => {
    if (used && used.data === usedId) {
      dispatch({ type: 'DELETE_USED', usedId: usedId })
      dispatch({ type: 'DELETE_SUCCESS'})
    }
  }, [dispatch, used, usedId])

  function handleClick() {
    deleteUsed(usedId)
  }
  return (
    <TableRow>
        <TableCell component="th" scope="row">{userName}</TableCell>
        <TableCell>{contents}</TableCell>
        <TableCell>{price}</TableCell>
        <TableCell>{usedDate}</TableCell>
        <TableCell>
        <IconButton onClick={handleClick}>
          <DeleteIcon/>
        </IconButton>
        </TableCell>
    </TableRow>
  )
}
