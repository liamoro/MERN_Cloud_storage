import {combineReducers} from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import fileReducer from './fileReducer'


const rootReducer = combineReducers({
  user: userReducer,
  files: fileReducer
})

export const store = configureStore({
  reducer: rootReducer
})