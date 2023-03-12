import { configureStore, combineReducers } from '@reduxjs/toolkit'

import general from './general'
import auth from './auth'
import games from './games'

const rootReducer = combineReducers({ general, auth, games })

export type RootState = ReturnType<typeof rootReducer>

export default configureStore({
  reducer: rootReducer,
})
