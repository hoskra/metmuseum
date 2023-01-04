import { createSlice } from "@reduxjs/toolkit";
import { getTotal } from '../../api/metmuseumAPI'

const initialState = {
  total: 0,
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
    }
  }
});

export const {
  getTotalSuccess,
  getTotalFailed,
} = resultSlice.actions

export const selectTotal = (state) => state.result.total
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