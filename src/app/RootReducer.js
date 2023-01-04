import { combineReducers } from '@reduxjs/toolkit'
import searchReducer from '../features/Search/SearchSlice'
import resultReducer from '../features/Result/ResultSlice'
import artefactTableReducer from '../features/ArtefactTable/ArtefactTableSlice'

const rootReducer = combineReducers({
  search: searchReducer,
  result: resultReducer,
  artefactTable: artefactTableReducer,
})

export default rootReducer
