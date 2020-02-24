import { useContext } from 'react'
import { StateContext } from '../contexts'

export default function useLoginState () {
  const { state } = useContext(StateContext)
  return state.login
}
