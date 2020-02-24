import React, { useEffect } from 'react';
import { useInput } from 'react-hookedup'
import { useDispatch, useAPILogin } from '../hooks'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory, useLocation } from 'react-router-dom';

function useLoginEffect (login, dispatch, history, from) {
  return useEffect(() => {
    if (login && login.data) {
      localStorage.setItem("token", login.data.token)
      dispatch({ type: 'LOGIN', login: login.data})
      history.replace(from)
    }
    if (login && login.error) {
      localStorage.removeItem("token")
      dispatch({ type: 'LOGIN_ERROR'})
    }
  }, [dispatch, login, history, from])
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginPage() {

  const dispatch = useDispatch()
  
  const { value: userName, bindToInput: bindUserName } = useInput('')
  const { value: password, bindToInput: bindPassword } = useInput('')

  const [ login, loginApi ] = useAPILogin()
  const history = useHistory()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: "/" } };
  useLoginEffect(login, dispatch, history, from)
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate 
        onSubmit={e => { 
          e.preventDefault(); 
          if(userName && password) {
            loginApi(userName, password)
          }
        }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="userName"
            name="userName"
            autoComplete="userName"
            autoFocus
            value={userName}
            {...bindUserName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            {...bindPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}