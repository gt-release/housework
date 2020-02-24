import React, { useContext } from 'react'
import { useDispatch } from '../hooks'
import { StateContext } from '../contexts'
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  }
}));

const Header = ({ text }) => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const { state } = useContext(StateContext)
  function handleClick() {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT'})
  }
  function linkMemo() {
    history.push('/memo')
  }
  return (
    <div className={classes.grow}>
        <AppBar position='static'>
          <Toolbar>
            <Typography type='title' className={classes.title}>
              {text}
            </Typography>
            {state.login.isAuthenticated && 
            <>
            <Button color="inherit" onClick={handleClick}>Logout</Button>
            <IconButton color="inherit" onClick={linkMemo}>
              <Badge variant="dot" color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            </>
            }
          </Toolbar>
        </AppBar>
    </div>
  )
}

export default Header
