import React, { useState, useEffect, Fragment } from 'react'
import { useInput } from 'react-hookedup'
import { useDispatch, useAPIPostUsed, useUsersState, useLoginState } from '../hooks'
import format from 'date-fns/format';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {KeyboardDatePicker} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function PostUsed () {
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
  const {value:userName, bindToInput: bindUserName, setValue:setUserName } = useInput(login.userName)
  const {value:contents, bindToInput: bindContents, setValue:setContents } = useInput('')
  const {value:price, bindToInput: bindPrice, setValue:setPrice} = useInput('')
  const [usedDate, handleDateChange] = useState(format(new Date(), 'yyyy/MM/dd'));
  const [ used, createUsed ] = useAPIPostUsed()

  useEffect(() => {
    if (used && !used.isLoading && used.data) {
      dispatch({ type: 'CREATE_USED', ...used.data })
      dispatch({ type: 'CREATE_SUCCESS'})
    }
  }, [dispatch, used])

  function handleAdd () {
    if (userName && contents && price && usedDate) {
      createUsed({userName, contents, price, usedDate})
      initialize()
    }
    handleClose();
  }


  function initialize() {
    setUserName(login.userName)
    setContents('')
    setPrice('')
    handleDateChange(format(new Date(), 'yyyy/MM/dd'))
  }

  return (
    <Fragment>
    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
       お小遣いの記録をつける
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">追加</DialogTitle>
        <DialogContent>
          <DialogContentText>
            何に使いましたか？
          </DialogContentText>
      <FormControl>
        <InputLabel id="post-name">名前</InputLabel>
        <Select id="post-name" {...bindUserName} >
          { users.map( (d, i) => <MenuItem key={i} value={d.userName}>{d.userName}</MenuItem>)}
        </Select>
      </FormControl>
      <TextField
        id="post-content" 
        label="内容"
        placeholder="風呂掃除"
        fullWidth
        {...bindContents}
      />
      <TextField
        placeholder="300"
        label="金額"
        id="post-money"
        fullWidth
        {...bindPrice}
      />
      <KeyboardDatePicker
        autoOk
        label="日付"
        variant="inline"
        id="post-date"
        format="yyyy/MM/dd"
        fullWidth
        value={usedDate}
        onChange={e => handleDateChange(format(e, 'yyyy/MM/dd'))}
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