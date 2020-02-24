import React, { useEffect, Fragment } from 'react'
import WorkList from '../work/WorkList'
import Post from '../work/Post'
import PostMemo from '../memo/PostMemo'
import { useAPIGetWork, useAPIGetDuty, useDispatch } from '../hooks'

export default function HomePage () {
    const dispatch = useDispatch()
    const [ works, getWork ] = useAPIGetWork()
    useEffect(getWork, [])
    useEffect(() => {
        if (works && works.error) {
            dispatch({ type: 'WORKS_ERROR' })
        }
        if (works && works.data) {
            dispatch({ type: 'FETCH_WORKS', works: works.data })
        }
    }, [dispatch, works])
    const [ duties, getDuty ] = useAPIGetDuty()
    useEffect(getDuty, [])
    useEffect(() => {
        if (duties && duties.error) {
            dispatch({ type: 'DUTIES_ERROR' })
        }
        if (duties && duties.data) {
            dispatch({ type: 'FETCH_DUTIES', duties: duties.data })
        }
    }, [dispatch, duties])
    return (
        <Fragment>
            <Post/>
            <PostMemo/>
            <hr/>
            <WorkList />
        </Fragment>
    )
}
