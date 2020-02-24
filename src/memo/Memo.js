import React, {useEffect} from 'react';
import { useDispatch, useAPIDeleteMemo, useUsersState } from '../hooks'
import UserAvatar from '../parts/UserAvatar'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    whiteSpace: 'pre-line'
  }
}));

export default function Memo({ memoId, userId, contents, insertTime}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const users = useUsersState()
  const [ memo, deleteMemo ] = useAPIDeleteMemo()

  useEffect(() => {
    if (memo && memo.data === memoId) {
      dispatch({ type: 'DELETE_MEMO', memoId })
      dispatch({ type: 'DELETE_SUCCESS'})
    }
  }, [dispatch, memo, memoId])

  function handleClick() {
    deleteMemo(memoId)
  }
  const thisUser = users.find(item => item.userId === userId)
  return (
        <>
        <ListItem alignItems="flex-start" className={classes.root}>
          <ListItemAvatar>
            <UserAvatar {...thisUser}/>
          </ListItemAvatar>
          <ListItemText
          primary={contents}
          secondary={insertTime}
        />
        <ListItemSecondaryAction>
            <IconButton edge="end" onClick={handleClick} className={classes.title}>
              <DeleteIcon/>
            </IconButton>
        </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="inset" component="li" />
        </>
  );
}