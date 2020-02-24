import React, { useEffect, Fragment } from 'react'
import PostDuty from '../duty/PostDuty'
import DutyList from '../duty/DutyList'
import { useAPIGetDuty, useDispatch } from '../hooks'

export default function DutyPage() {
    const dispatch = useDispatch()
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
            <PostDuty/>
            <DutyList/>
        </Fragment>
    )
}
