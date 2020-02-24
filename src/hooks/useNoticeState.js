import { useContext } from 'react'
import { StateContext } from '../contexts'

export default function useNoticeState () {
  const { state } = useContext(StateContext)
  return state.notice
}
