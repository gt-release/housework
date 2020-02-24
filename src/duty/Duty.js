import React, {useEffect} from 'react';
import { useDispatch, useAPIDeleteDuty, useUsersState } from '../hooks'
import UserAvatar from '../parts/UserAvatar'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Duty({ dutyId, userName, contents, price}) {
  const dispatch = useDispatch()
  const users = useUsersState()
  const [ duty, deleteDuty ] = useAPIDeleteDuty()

  useEffect(() => {
    if (duty && duty.data === dutyId) {
      dispatch({ type: 'DELETE_DUTY', dutyId })
      dispatch({ type: 'DELETE_SUCCESS'})
    }
  }, [dispatch, duty, dutyId])

  function handleClick() {
    deleteDuty(dutyId)
  }
  const thisUser = users.find(item => item.userName === userName)
  return (
    <Grid item xs={6}>
        <Card>
            <CardContent>
                <UserAvatar {...thisUser} />
              <Typography component="h2" variant="h5">
                {contents}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {price}
              </Typography>
            </CardContent>
            <CardActions>
            <IconButton onClick={handleClick}>
              <DeleteIcon/>
            </IconButton>
            </CardActions>
        </Card>
    </Grid>
  );
}