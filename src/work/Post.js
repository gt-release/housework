import React, { useState, useEffect, Fragment } from 'react'
import { useInput } from 'react-hookedup'
import { useDispatch, useDutiesState, useAPIPostWork, useUsersState, useLoginState } from '../hooks'
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
import Divider from '@material-ui/core/Divider';

export default function Post () {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    initialize()
    setOpen(false)
  };

  const dispatch = useDispatch()
  const duties = useDutiesState()
  const users = useUsersState()
  const login = useLoginState()
  const [duty,setDuty] = useState('')
  const {value:userName, bindToInput: bindUserName, setValue:setUserName } = useInput(login.userName)
  const {value:contents, bindToInput: bindContents, setValue:setContents } = useInput('')
  const {value:price, bindToInput: bindPrice, setValue:setPrice} = useInput('')
  const [workDate, handleDateChange] = useState(format(new Date(), 'yyyy/MM/dd'));
  const [ work, createWork ] = useAPIPostWork()

  useEffect(() => {
    if (work && !work.isLoading && work.data) {
      dispatch({ type: 'CREATE_WORK', ...work.data })
      dispatch({ type: 'CREATE_SUCCESS'})
    }
  }, [dispatch, work])

  function handleAdd () {
    if (userName && contents && price && workDate) {
      createWork({userName, contents, price, workDate})
      initialize()
    }
    handleClose();
  }
  function onChangeDuty(event) {
    const duty = event.target.value
    setUserName(duty.userName)
    setContents(duty.contents)
    setPrice(duty.price)
    setDuty(duty)
  }

  function initialize() {
    setUserName(login.userName)
    setContents('')
    setPrice('')
    setDuty({})
    handleDateChange(format(new Date(), 'yyyy/MM/dd'))
  }

  return (
    <Fragment>
    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        家事の追加
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">追加</DialogTitle>
        <DialogContent>
          <DialogContentText>
            何をしましたか？
          </DialogContentText>
      <FormControl>
        <InputLabel id="post-name1">名前</InputLabel>
        <Select id="post-name1" {...bindUserName} >
          { users.map( (d, i) => <MenuItem key={i} value={d.userName}>{d.userName}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl fullWidth={true}>
        <InputLabel id="post-duty" >一覧から選ぶ</InputLabel>
        <Select id="post-duty" value={duty} onChange={onChangeDuty} >
          { duties
              .filter(d => d.userName === userName)
              .map( (d, i) => <MenuItem key={i} value={d}>{`${d.userName}: ${d.contents}`}</MenuItem>)}
        </Select>
      </FormControl>
      <Divider variant="middle"/>
      <FormControl>
        <InputLabel id="post-name2">名前</InputLabel>
        <Select id="post-name2" {...bindUserName}>
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
        value={workDate}
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