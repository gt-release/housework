import { useContext } from 'react'
import { StateContext } from '../contexts'

export default function useUsersState () {
  const { state } = useContext(StateContext)
  return state.users
}
