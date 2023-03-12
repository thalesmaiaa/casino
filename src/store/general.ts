import { useSelector } from 'react-redux'
import { createAction, createReducer } from '@reduxjs/toolkit'

import { RootState } from './'

export type AuthModal = {
  open: boolean
  type: 'login' | 'register'
}

export type State = {
  modal: AuthModal
}

const selector = (state: RootState) => state.general
export const useGeneralState = () => useSelector(selector)

export const openModal = createAction<'login' | 'register'>('OPEN_MODAL')
export const closeModal = createAction('CLOSE_MODAL')

export default createReducer<State>(
  { modal: { open: false, type: 'login' } },
  (builder) => {
    builder
      .addCase(openModal, (state, action) => {
        state.modal.open = true
        state.modal.type = action.payload
      })
      .addCase(closeModal, (state) => {
        state.modal.open = false
      })
  },
)
