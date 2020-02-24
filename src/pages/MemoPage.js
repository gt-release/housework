import React, { useEffect, Fragment } from 'react'
import MemoList from '../memo/MemoList'
import { useAPIGetMemo, useDispatch } from '../hooks'

export default function MemoPage() {
    const dispatch = useDispatch()
    const [ memo, getMemo ] = useAPIGetMemo()
    useEffect(getMemo, [])
    useEffect(() => {
        if (memo && memo.error) {
            dispatch({ type: 'MEMO_ERROR' })
        }
        if (memo && memo.data) {
            dispatch({ type: 'FETCH_MEMO', memo: memo.data })
        }
    }, [dispatch, memo])

    return (
        <Fragment>
            <MemoList/>
        </Fragment>
    )
}
