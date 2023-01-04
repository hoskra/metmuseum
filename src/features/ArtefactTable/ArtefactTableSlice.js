import { createSlice } from "@reduxjs/toolkit";
import { getObject } from '../../api/metmuseumAPI'

const initialState = {
  data: [],
  dataLoading: false,
  error: null
};

export const artefactTableSlice = createSlice({
  name: "artefactTable",
  initialState,
  reducers: {
    setDataLoading: (state, action) => {
      state.dataLoading = action.payload
    },
    getDataSuccess: (state, action) => {
      state.data = action.payload 
      state.error = null
    },
    getDataFailed: (state, action) => {
      state.data = []
      state.error = action.payload
    },
  }
});

export const {
  setDataLoading,
  getDataSuccess,
  getDataFailed
} = artefactTableSlice.actions

export const selectData = (state) => state.artefactTable.data
export const isDataLoading = (state) => state.artefactTable.dataLoading
export const isError = (state) => state.artefactTable.error

export default artefactTableSlice.reducer;

export const fetchData = (objectIDs) => async dispatch => {
  try {
    dispatch(setDataLoading(true))
    let promiseArray = [objectIDs.map(id=>getObject(id))]
    const data = await Promise.all(promiseArray.map(Promise.all.bind(Promise))).then(data =>  {
      return data[0]
    })
    dispatch(getDataSuccess(data))

    dispatch(setDataLoading(false))
  } catch (err) {
    dispatch(setDataLoading(false))
    dispatch(getDataFailed(err.toString()))
  }
}
