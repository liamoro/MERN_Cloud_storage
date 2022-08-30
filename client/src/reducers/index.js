import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import fileReducer from './fileReducer'
import uploadReducer from "./uploadReducer";


const rootReducer = combineReducers({
  user: userReducer,
  files: fileReducer,
  upload: uploadReducer
})

export const store = configureStore({
  reducer: rootReducer
})