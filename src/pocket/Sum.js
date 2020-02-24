import React, {useState, useEffect, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import {useAPISumPocket} from '../hooks'
import {useUsedState} from '../hooks'

export default function Sum() {
  const [sum, sumPocket ] = useAPISumPocket()
  const [state, setState] = useState([])
  const useds = useUsedState()
  useEffect(() => sumPocket(), [sumPocket, useds])
  useEffect(() => {
    if(sum && sum.data) {
      setState(sum.data)
    }
  }, [sum])
    return (
      <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        現在のお小遣い
      </Typography>
      {state.map((p, i) => (
        <Fragment key={"sum-" + i}>
          <Typography component="p" variant="h4">
            {`${p.totalPrice.toLocaleString()}円`}
          </Typography>
          <Typography color="textSecondary" >
            {p.userName}
          </Typography>
        </Fragment>
      ))}
    </React.Fragment>
    );
}