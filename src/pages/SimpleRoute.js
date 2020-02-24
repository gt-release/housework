import React, { useContext, Fragment} from 'react'
import Header from '../pages/Header'
import HomePage from '../pages/HomePage'
import DutyPage from '../pages/DutyPage'
import LoginPage from '../pages/LoginPage'
import MemoPage from '../pages/MemoPage'
import Footer from '../pages/Footer'
import Notice from '../parts/Notice'
import { StateContext } from '../contexts'
import PocketPage from '../pages/PocketPage'
import { makeStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    main: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(10),
    },
    footer: {
      position: "fixed",
      bottom: 0,
      width: "100%",
      height: theme.spacing(8)
    },
  }));

export default function SimpleRoute () {
    const classes = useStyles()
    const { state } = useContext(StateContext)
    return (
        <Fragment>
                <Router>
                <Header text="お小遣い帳" />
                <div className={classes.main}>
                    <Switch>
                    <Route path="/login" exact>
                        <LoginPage />
                    </Route>       
                    <PrivateRoute path="/" exact>
                        <HomePage />
                    </PrivateRoute>
                    <PrivateRoute path="/duty" exact>
                        <DutyPage />
                    </PrivateRoute> 
                    <PrivateRoute path="/pocket" exact>
                        <PocketPage />
                    </PrivateRoute>
                    <PrivateRoute path="/memo" exact>
                        <MemoPage />
                    </PrivateRoute>      
                    </Switch>
                    <Notice />
                </div>
                <div className={classes.footer}>
                  {state.login.isAuthenticated && <Footer/>}
                </div>
                </Router>
          </Fragment>
    )
}

function PrivateRoute({ children, ...rest }) {
  const { state } = useContext(StateContext)
    return (
      <Route
        {...rest}
        render={({ location }) =>
        state.login.isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
