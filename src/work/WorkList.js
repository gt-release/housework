import React from 'react'

import Work from './Work'
import {useWorksState} from '../hooks'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function WorkList () {
    const works = useWorksState()
  return (
    <TableContainer component={Paper}>
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>名前</TableCell>
                <TableCell>内容</TableCell>
                <TableCell>金額</TableCell>
                <TableCell>日付</TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
        <TableBody size="small">
            {works.map((p, i) => (
                <Work {...p} key={'work-' + i}/>
            ))}
        </TableBody>
    </Table>
    </TableContainer>
  )
}
