import React, { useState, useEffect } from 'react';
import { Fragment } from "react";
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import format from 'date-fns/format';
import { useUsedState, useAPIAggregatePocket, useUsersState } from '../hooks'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';

export default function Pocket() {
  const [ data, setData ] = useState([])
  const [ pockets, aggregatePocket ] = useAPIAggregatePocket()
  const [ pockets2, aggregatePocket2 ] = useAPIAggregatePocket()
  const useds = useUsedState()
  const users = useUsersState()
  const thisYearMonth = format(new Date(), 'yyyy/MM')
  useEffect(() => {
  if(!users[0]) return
  aggregatePocket({userName: users[0].userName, selectedMonth: thisYearMonth})
  }
  , [aggregatePocket, thisYearMonth, useds, users])
  useEffect(() => {
    if(!users[1]) return
    aggregatePocket2({userName: users[1].userName, selectedMonth: thisYearMonth})
    }
    , [aggregatePocket2, thisYearMonth, useds, users])
  useEffect(() => {
      if (pockets && pockets.data && 
          pockets2 && pockets2.data) {
              const baseLine = new Date(2020, 1)
              const result = 
              eachDayOfInterval({start: startOfMonth(baseLine), end: endOfMonth(baseLine)})
              .map(day => format(day, 'yyyy/MM/dd'))
              .map(day => {
                  const target1 = pockets.data.find(item => item.baseDate === day)
                  const target2 = pockets2.data.find(item => item.baseDate === day)
                  return {baseDate:day, [users[0].userName]:target1.totalMoney, [users[1].userName]:target2.totalMoney}
              })
              
          setData(result)
      }
  }, [pockets, pockets2, users])
    return (
        <Fragment>
      <ResponsiveContainer>
    	<AreaChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="baseDate"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       {users.map((user, i) => (
                <Area key={'user-' + i} type="monotone" dataKey={user.userName} stroke={user.color} fillOpacity={0.7} fill={user.color}/>
        ))}
      </AreaChart>
      </ResponsiveContainer>
      </Fragment>
    );
}