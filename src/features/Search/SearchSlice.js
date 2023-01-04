import { createSlice } from "@reduxjs/toolkit";

import { getObjectsMatchingQuery } from '../../api/metmuseumAPI'

const initialState = {
  objectIDs: [],
  allObjectIDs: [],
  startIndex: 0,
  itemCount: 5,
  pagesCount: 0,
  currentPage: 1,
  found: 0,
  searched: false,
  fetching: false,
  error: null,
  searchTerm: "",
  option: 0
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchedTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setOption: (state, action) => {
      state.option = action.payload
    },
    getObjectsSuccess: (state, action) => {
      state.found = action.payload.objectIDs.length
      state.allObjectIDs = action.payload.objectIDs
      state.startIndex = 0
      state.currentPage = 1
      state.objectIDs = state.allObjectIDs.slice(
        state.startIndex,
        state.startIndex + state.itemCount
      )
      state.pagesCount = parseInt(state.found / state.itemCount)
      state.error = null
      state.searched = true
    },
    getObjectsFailed: (state, action) => {
      state.objectIDs = []
      state.error = action.payload
    },
    resetSearch: (state, action) => {
      state.objectIDs = []
      searched = false
      error = null
    },
    setFetching: (state, action) => {
      state.fetching = action.payload
    },
    previousPage: (state, action) => {
      if(state.startIndex - state.itemCount >= 0){
        state.startIndex -= state.itemCount
        state.objectIDs = state.allObjectIDs.slice(
          state.startIndex,
          state.startIndex + state.itemCount
          )
        state.currentPage--
      }
    },
    nextPage: (state, action) => {
      if(state.found - 1 - state.startIndex > state.itemCount){
        state.startIndex += state.itemCount
        state.objectIDs = state.allObjectIDs.slice(
          state.startIndex,
          state.startIndex + state.itemCount
          )
        state.currentPage++
      }
    },
    setPage: (state, action) => {
      state.currentPage = action.payload
      state.startIndex = state.itemCount * (state.currentPage - 1)
      if(action.payload == 0) state.startIndex = 0
      state.objectIDs = state.allObjectIDs.slice(
        state.startIndex,
        state.startIndex + state.itemCount
      )
    },
    setPageSize: (state, action) => {
      state.itemCount = action.payload
      state.objectIDs = state.allObjectIDs.slice(
        state.startIndex,
        state.startIndex + state.itemCount
      )
      state.pagesCount = parseInt(state.found / state.itemCount)
    }
  }
});

export const {
  getObjectsSuccess,
  getObjectsFailed,
  resetSearch,
  previousPage,
  setFetching,
  nextPage,
  setPage,
  setPageSize,
  setOption,
  setSearchedTerm
} = searchSlice.actions

export const selectTotalPageCount = (state) => state.search.pagesCount
export const selectCurrentPage = (state) => state.search.currentPage
export const selectIDs = (state) => state.search.objectIDs
export const selectItemCount = (state) => state.search.itemCount
export const selectFound = (state) => state.search.found
export const didSearch = (state) => state.search.searched
export const isFetching = (state) => state.search.fetching
export const isError = (state) => state.search.error
export const getStartIndex = (state) => state.search.startIndex
export const selectSearchedTerm = (state) => state.search.searchTerm
export const selectOption = (state) => state.search.option

export default searchSlice.reducer;

export const searchQuery = (parameter, query) => async dispatch => {
  try {
    dispatch(setFetching(true))
    const objects = await getObjectsMatchingQuery(parameter, query)
    dispatch(getObjectsSuccess(objects))
    dispatch(setFetching(false))
  } catch (err) {
    dispatch(getObjectsFailed(err.toString()))
  }
}
