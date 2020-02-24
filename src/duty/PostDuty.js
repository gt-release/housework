import React, { Fragment, useEffect } from 'react'
import { useInput } from 'react-hookedup'
import { useDispatch, useAPIPostDuty, useUsersState, useLoginState } from '../hooks'
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

export default function PostDuty () {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    initialize()
    setOpen(false);
  };

  const [ duty, createDuty ] = useAPIPostDuty()

  const dispatch = useDispatch()
  const users = useUsersState()
  const login = useLoginState()
  const {value:userName, bindToInput: bindUserName, setValue: setUserName} = useInput(login.userName)
  const {value:contents, bindToInput: bindContents, setValue: setContents} = useInput('')
  const {value:price, bindToInput: bindPrice, setValue: setPrice} = useInput('')

  useEffect(() => {
    if (duty && !duty.isLoading && duty.data) {
      dispatch({ type: 'CREATE_DUTY', ...duty.data })
      dispatch({ type: 'CREATE_SUCCESS'})
    }
  }, [dispatch, duty])

  function handleAdd () {
    if (userName && contents && price ) {
      createDuty({userName, contents, price})
    }
    handleClose();
  }

  function initialize() {
    setUserName(login.userName)
    setContents('')
    setPrice('')
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
            お小遣いを決めましょう
          </DialogContentText>
      <Divider variant="middle"/>
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