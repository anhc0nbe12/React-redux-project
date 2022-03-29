import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {userSevice} from '../../apiservice/userSevice'

function getWithExpiry(key) {
	const itemStr = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getTime() - item.expiry > 3600000 ) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key)
		return null
	}
   console.log(typeof now.getTime() , typeof Number(item.expiry));
   console.log(now.getTime() - item.expiry);

	return item
}
const user = getWithExpiry('user')

const initialState = {
   user : user? user:null,
   isError: false,
   isSuccess: false,
   message:'',
}

export const loginUser = createAsyncThunk('login', async (user_id, thunkAPI) =>{
   try {
      return await userSevice.get_token(user_id)
   } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
   }
})

const userSlide = createSlice({
   name:'auth',
   initialState,
   reducers:{
      reset_exclude_user:(state) =>{
         state.isError = false
         state.isSuccess =false
         state.message = false
      }
   },
   extraReducers:(builder) =>{
      builder
         .addCase(loginUser.fulfilled,(state, action) =>{
            state.user = action.payload
            state.isSuccess = true
         })
         .addCase(loginUser.rejected, (state, action)=>{
            state.message = action.payload
            state.isError = true
         })
   }
})


export const {reset_exclude_user} = userSlide.actions
export default userSlide.reducer