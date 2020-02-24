import React, { useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pocket from '../pocket/Pocket'
import Sum from '../pocket/Sum'
import UsedList from '../pocket/UsedList'
import PostUsed from '../pocket/PostUsed'
import { useAPIGetUsed, useDispatch } from '../hooks'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
      },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paperFix: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      height: 240
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
  }));

export default function PocketPage() {
    const dispatch = useDispatch()
    const [ useds, getUsed ] = useAPIGetUsed()
    useEffect(getUsed, [])
    useEffect(() => {
      if (useds && useds.error) {
          dispatch({ type: 'USED_ERROR' })
      }
      if (useds && useds.data) {
          dispatch({ type: 'FETCH_USED', used: useds.data })
      }
    }, [dispatch, useds])
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <Paper className={classes.paperFix}>
                    <Pocket/>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={classes.paperFix}>
                    <Sum />
                </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                  <Typography component="h2" variant="h6" color="primary">
                    お小遣い使用履歴
                  </Typography>
                  <PostUsed />
                <UsedList />
              </Paper>
            </Grid>
            </Grid>
            </Container>
        </div>
    )
}
