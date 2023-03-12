import { createAction, createReducer } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '.'

export type User = {
  name: string
  password: string
  birthDate?: Date
}

export type State = {
  status: 'loggedOut' | 'authenticated'
  user: User
}

const buildInitialState = (prefs?: User): State => ({
  status: 'loggedOut',
  user: prefs || ({} as User),
})

const selector = (state: RootState) => state.auth
export const useAuthState = () => useSelector(selector)

const initialState = buildInitialState()

export const login = createAction<User>('login')
export const register = createAction<User>('register')
export const logout = createAction('logout')

export default createReducer<State>(initialState, (builder) => {
  builder
    .addCase(login, (state, action) => {
      state.user = action.payload
      state.status = 'authenticated'
      localStorage.removeItem('@casinoLogout')

      localStorage.setItem('@casinoAuthStatus', JSON.stringify(true))
      localStorage.setItem('@casinoUser', JSON.stringify(action.payload))
    })

    .addCase(register, (state, action) => {
      state.user = action.payload
      localStorage.setItem('@casinoAuthStatus', JSON.stringify(false))
      localStorage.removeItem('@casinoLogout')

      localStorage.setItem('@casinoUser', JSON.stringify(action.payload))
    })

    .addCase(logout, (state, action) => {
      state = {} as State
      localStorage.removeItem('@casinoAuthStatus')
      localStorage.setItem('@casinoLogout', JSON.stringify(true))
    })
})
