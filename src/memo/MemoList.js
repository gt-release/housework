import React from 'react';
import {useMemoState} from '../hooks'
import Memo from './Memo';
import List from '@material-ui/core/List';

export default function MemoList() {
    const memo = useMemoState()
  return (
    <List>
            {memo.map((memo, i) => (
              <Memo key={i} {...memo} />
            ))}
    </List>
  );
}