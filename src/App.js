import React, { useReducer, useEffect, useState} from 'react'
import appReducer from './reducers'
import { StateContext } from './contexts'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { useAPIGetUsers, useAPIGetUserInfo } from './hooks'
import SimpleRoute from './pages/SimpleRoute'

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
  }));

export default function App () {
    const classes = useStyles();
    const [ state, dispatch ] = useReducer(
        appReducer,
         { 
            login: {isAutheticated: false, userId:'', userName:''},
            users: [],
            memo: [],
            works: [],
            duties: [],
            notice: { text: '', level: 'info', open: false },
            used: []
         })
    const [ users, getUsers ] = useAPIGetUsers()
    const [ login, getUserInfo ] = useAPIGetUserInfo()
    const [loading, setLoading] = useState(true)
    useEffect(() => {if(localStorage.token){ getUserInfo()}
  }, [getUserInfo])
    useEffect(() =>{
      if(localStorage.token) {
        if(login && login.data) {
          console.log('success')
          dispatch({ type: 'LOGIN', login: login.data})
          setLoading(false)
        } else if(login && login.error){
          console.log('error')
          console.log(JSON.stringify(login.error))
          dispatch({ type: 'LOGOUT'})
          setLoading(false)
        }
      } else {
        dispatch({ type: 'LOGOUT'})
        setLoading(false)
      }
    }, [dispatch, login])
    useEffect(() =>{
      if(!localStorage.token) {
        dispatch({ type: 'LOGOUT'})
        setLoading(false)
      }
    }, [localStorage.token])
    useEffect(getUsers, [])
    useEffect(() => {
        if (users && users.error) {
            dispatch({ type: 'USERS_ERROR' })
        }
        if (users && users.data) {
            dispatch({ type: 'FETCH_USERS', users: users.data })
        }
    }, [dispatch, users])
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <StateContext.Provider value={{ state, dispatch }}>
            <div className={classes.root}>
                <CssBaseline />
              {!loading && 
                <SimpleRoute/>
              }
            </div>
            </StateContext.Provider>
        </MuiPickersUtilsProvider>
    )
}
