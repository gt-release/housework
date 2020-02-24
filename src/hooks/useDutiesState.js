import { useContext } from 'react'
import { StateContext } from '../contexts'

export default function useDutiesState () {
  const { state } = useContext(StateContext)
  return state.duties
}
