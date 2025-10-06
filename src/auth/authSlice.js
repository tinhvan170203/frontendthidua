import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userApi from '../api/authApi';

const initialState = {
  user:  localStorage.getItem('user_theodoithidua') || null,
  id_user: localStorage.getItem('id_user_theodoithidua') || null,
  vaitro_theodoithidua:  localStorage.getItem('vaitro_theodoithidua') || null,
  captaikhoan_theodoithidua:  localStorage.getItem('captaikhoan_theodoithidua') || null,
};


export const loginAccount = createAsyncThunk(
  'user/login', // tên action khi dispatch
  async(payload) => {    
          let {data} = await userApi.login(payload);
          //save accessToken vào localstorerage
              localStorage.setItem('accessToken_theodoithidua', data.accessToken)
              localStorage.setItem('user_theodoithidua', data.tentaikhoan)         
              localStorage.setItem('id_user_theodoithidua', data._id)         
              localStorage.setItem('vaitro_theodoithidua', data.vaitro)         
              localStorage.setItem('captaikhoan_theodoithidua', data.captaikhoan)         
          return data

  }
);

export const logoutAccount = createAsyncThunk(
  'user/logout',
  async() => {
      await userApi.logout();  
      localStorage.removeItem('user_theodoithidua');
      localStorage.removeItem('id_user_theodoithidua');   
      localStorage.removeItem('accessToken_theodoithidua');   
      localStorage.removeItem('vaitro_theodoithidua');   
      localStorage.removeItem('captaikhoan_theodoithidua');   
  }
)



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    refreshToken: (state, action) => {
      localStorage.setItem('accessToken_theodoithidua', action.payload)
  },
    changeRole: (state, action) => {
      state.vaitro_theodoithidua = action.payload;
      localStorage.setItem('vaitro_theodoithidua', action.payload)         
    },
    logout: (state, action) => {
      state.user = null;
      state.id_user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAccount.fulfilled, (state, action) => {
        // action is inferred correctly here if using TS
                state.user = action.payload.tentaikhoan; // action.payload là cái return từ createAsyncThunk         
                state.id_user = action.payload._id; // action.payload là cái return từ createAsyncThunk         
                state.vaitro_theodoithidua = action.payload.vaitro
                state.captaikhoan_theodoithidua = action.payload.captaikhoan
      })
    builder.addCase(loginAccount.rejected, (state, action) => {
        // action is inferred correctly here if using TS
                state.user = null; // action.payload là cái return từ createAsyncThunk         
                state.vaitro_theodoithidua = null
                state.captaikhoan_theodoithidua = null
      })
      builder.addCase(logoutAccount.fulfilled, (state, action) => {
        // action is inferred correctly here if using TS
                state.user = null; // action.payload là cái return từ createAsyncThunk         
                state.id_user = null; // action.payload là cái return từ createAsyncThunk         
                state.vaitro_theodoithidua = null
                state.captaikhoan_theodoithidua = null
      })
    builder.addCase(logoutAccount.rejected, (state, action) => {
        // action is inferred correctly here if using TS
                state.user = null; // action.payload là cái return từ createAsyncThunk         
                state.vaitro_theodoithidua = null
                state.captaikhoan_theodoithidua = null
      })
  }
})

// Action creators are generated for each case reducer function
export const {changeRole, logout} = authSlice.actions

export default authSlice.reducer