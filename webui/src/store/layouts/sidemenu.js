import { createSlice } from "@reduxjs/toolkit";

// createSlice = createAction + createReducer
const slice = createSlice({
  name: "sidemenu",
  initialState: {
    smallMenu: false,
  },

  reducers: {
    menuToggled: (sidemenu, action) => {
      sidemenu.smallMenu = !sidemenu.smallMenu;
    },
  },
});

export const { menuToggled } = slice.actions;

export default slice.reducer;

// Action Creators

export const toggleSideMenu = () => (dispatch, getState) => {
  return dispatch({ type: menuToggled, payload: {} });
};
