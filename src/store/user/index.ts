import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TUserState = {
  loggedIn: boolean;
};

const initialState: TUserState = {
  loggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccesful(state, action: PayloadAction<any>) {
      state.loggedIn = true;
    },
  },
});

const actions = {
  ...userSlice.actions,
};
const userReducer = userSlice.reducer;

export { actions };
export default userReducer;
