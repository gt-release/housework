import React from 'react';
import {useDutiesState} from '../hooks'
import Duty from './Duty';
import Grid from '@material-ui/core/Grid';

export default function DutyList() {
    const duties = useDutiesState()
  return (
    <Grid container spacing={4}>
            {duties.map((duty, i) => (
              <Duty key={i} {...duty} />
            ))}
    </Grid>
  );
}