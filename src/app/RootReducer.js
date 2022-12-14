import { combineReducers } from '@reduxjs/toolkit'
import searchReducer from '../features/Search/SearchSlice'
import resultReducer from '../features/Result/ResultSlice'

const rootReducer = combineReducers({
  search: searchReducer,
  result: resultReducer
})

export default rootReducer
