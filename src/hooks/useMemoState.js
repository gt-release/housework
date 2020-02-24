import { useContext } from 'react'
import { StateContext } from '../contexts'

export default function useMemoState () {
  const { state } = useContext(StateContext)
  return state.memo
}
