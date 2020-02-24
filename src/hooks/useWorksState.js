import { useContext } from 'react'
import { StateContext } from '../contexts'

export default function useWorksState () {
  const { state } = useContext(StateContext)
  return state.works
}
