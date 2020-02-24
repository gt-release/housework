import { useContext } from 'react'
import { StateContext } from '../contexts'

export default function useUsedState () {
  const { state } = useContext(StateContext)
  return state.used
}
