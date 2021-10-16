import { createSlice } from "@reduxjs/toolkit";

// createSlice = createAction + createReducer
const slice = createSlice({
  name: "search",
  initialState: {
    text: "",
    selection: window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    ),
  },

  reducers: {
    searchedByText: (search, action) => {
      search.text = action.payload.text;
    },
    selectionChanged: (search, action) => {
      search.selection = action.payload.selection;
    },
  },
});

export const { searchedByText, selectionChanged } = slice.actions;

export default slice.reducer;

// Action Creators

export const searchByText = (text) => (dispatch, getState) => {
  return dispatch({ type: searchedByText, payload: { text: text } });
};

export const changeSelection = (name) => (dispatch, getState) => {
  return dispatch({ type: selectionChanged, payload: { selection: name } });
};
