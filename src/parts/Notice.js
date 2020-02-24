import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useNoticeState, useDispatch } from '../hooks'

export default function Notice() {
    const notice = useNoticeState()
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch({type: 'CLOSE_NOTICE'})
    }
    return(
    <Snackbar open={notice.open} autoHideDuration={2000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" severity={notice.level}>
            {notice.text}
        </MuiAlert>
    </Snackbar>
    )
}