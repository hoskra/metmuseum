import { createSlice } from "@reduxjs/toolkit";
import { getTotal, getObject } from '../../api/metmuseumAPI'

const initialState = {
  total: 0,
  detail: null,
  detailLoading: false,
  error: null
};

export const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    getTotalSuccess: (state, action) => {
      state.total = action.payload 
      state.error = null
      console.log(state.total)
    },
    getTotalFailed(state, action) {
      state.total = -1
      state.error = action.payload
      console.log(state.total)
    },
    setDetailLoading: (state, action) => {
      state.detailLoading = action.payload
    },
    getObjectSuccess: (state, action) => {
      state.detail = action.payload 
      state.error = null
      console.log(state.detail)
    },
    getObjectFailed: (state, action) => {
      state.detail = -1 
      state.error = action.payload
      console.log(state.detail)
    },
    resetDetail: (state, action) => {
      state.detail = null,
      state.error = null
    }
  }
});

export const {
  getTotalSuccess,
  getTotalFailed,
  getObjectSuccess,
  setDetailLoading,
  getObjectFailed,
  resetDetail
} = resultSlice.actions

export const selectTotal = (state) => state.result.total
export const selectDetail = (state) => state.result.detail
export const isDetailLoading = (state) => state.result.detailLoading
export const isError = (state) => state.result.error

export default resultSlice.reducer;

export const fetchGetTotal = ThunkAction => async dispatch => {
  try {
    const total = await getTotal()
    dispatch(getTotalSuccess(total))
  } catch (err) {
    dispatch(getTotalFailed(err.toString()))
  }
}

export const fetchDetail = (id) => async dispatch => {
  try {
    dispatch(setDetailLoading(true))
    const detail = await getObject(id)
    dispatch(getObjectSuccess(detail))
    dispatch(setDetailLoading(false))
  } catch (err) {
    dispatch(setDetailLoading(false))
    dispatch(getObjectFailed(err.toString()))
  }
}
