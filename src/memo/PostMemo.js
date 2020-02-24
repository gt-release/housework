import React, { useEffect, Fragment } from 'react'
import { useInput } from 'react-hookedup'
import { useDispatch, useAPIPostMemo, useUsersState, useLoginState } from '../hooks'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

export default function PostMemo () {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    initialize()
    setOpen(false)
  };

  const dispatch = useDispatch()
  const users = useUsersState()
  const login = useLoginState()
  const {setValue:setUserName } = useInput(login.userName)
  const {value:userId, bindToInput: bindUserId, setValue:setUserId } = useInput(login.userId)
  const {value:contents, bindToInput: bindContents, setValue:setContents } = useInput('')
  const [ memo, createMemo ] = useAPIPostMemo()

  useEffect(() => {
    if (memo && !memo.isLoading && memo.data) {
      dispatch({ type: 'CREATE_MEMO', ...memo.data })
      dispatch({ type: 'CREATE_SUCCESS'})
    }
  }, [dispatch, memo])

  function handleAdd () {
    if (userId && contents) {
      createMemo({userId, contents})
      initialize()
    }
    handleClose();
  }

  function initialize() {
    setUserName(login.userName)
    setUserId(login.userId)
    setContents('')
  }

  return (
    <Fragment>
    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        メモの追加
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">追加</DialogTitle>
        <DialogContent>
          <DialogContentText>
            メモ
          </DialogContentText>
      <Divider variant="middle"/>
      <FormControl>
        <InputLabel id="post-name">名前</InputLabel>
        <Select id="post-name" {...bindUserId}>
          { users.map( (d, i) => <MenuItem key={i} value={d.userId}>{d.userName}</MenuItem>)}
        </Select>
      </FormControl>
      <TextField
        id="post-content" 
        label="内容"
        placeholder="メモ"
        fullWidth
        multiline
        rows="4"
        {...bindContents}
      />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={handleAdd} color="primary">
          追加
        </Button>
      </DialogActions>
    </Dialog>
    </Fragment>
  )
}