import { createSlice } from "@reduxjs/toolkit";

import { getObjectsMatchingQuery } from '../../api/metmuseumAPI'
import { resetDetail } from '../Result/ResultSlice'

const initialState = {
  objectIDs: [],
  found: 0,
  searched: false,
  fetching: false,
  error: null
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    getObjectsSuccess: (state, action) => {
      state.found = action.payload.objectIDs.length
      state.objectIDs = action.payload.objectIDs.slice(0,5)
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
    }
  }
});

export const {
  getObjectsSuccess,
  getObjectsFailed,
  resetSearch,
  setFetching
} = searchSlice.actions

export const selectIDs = (state) => state.search.objectIDs
export const selectFound = (state) => state.search.found
export const didSearch = (state) => state.search.searched
export const isFetching = (state) => state.search.fetching
export const isError = (state) => state.search.error

export default searchSlice.reducer;

export const searchQuery = (parameter, query) => async dispatch => {
  try {
    dispatch(resetDetail())
    dispatch(setFetching(true))
    const objects = await getObjectsMatchingQuery(parameter, query)
    dispatch(getObjectsSuccess(objects))
    dispatch(setFetching(false))
  } catch (err) {
    dispatch(getObjectsFailed(err.toString()))
  }
}
