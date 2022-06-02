import {combineReducers} from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import userReducer from './userReducer'
import fileReducer from './fileReducer'


const rootReducer = combineReducers({
  user: userReducer,
  files: fileReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk] // передается в applyMiddleware()
  //, devTools: true // it's default, needs for browser extention 
})