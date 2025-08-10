import { createSlice } from '@reduxjs/toolkit'

// Step 1: Get initial value from localStorage
const storedLoginStatus = localStorage.getItem('isLogin') === 'true'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: storedLoginStatus, // Step 2: Use it here
  },
  reducers: {
    setIsLogin: (state) => {
      state.isLogin = true
      localStorage.setItem('isLogin', 'true')  // Step 3: persist
    },
    setIsLogout: (state) => {
      state.isLogin = false
      localStorage.setItem('isLogin', 'false') // Step 3: persist

    },
    
  },
})

// export actions
export const { setIsLogin, setIsLogout } = authSlice.actions

// export reducer
export default authSlice.reducer
