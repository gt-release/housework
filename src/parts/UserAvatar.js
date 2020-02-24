import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

export default function UserAvatar({userName, color}) {
    const useStyles = makeStyles(theme => ({
        avatarClass: {
          color: theme.palette.getContrastText(color),
          backgroundColor: color,
        },
      }));
    const classes = useStyles();
    return(
    <Avatar className={classes.avatarClass}>
        {userName.substring(0, 1)}
    </Avatar>
    )
}