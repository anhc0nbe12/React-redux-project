import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {playlistService} from '../../apiservice/playlistService'

const initialState = {
   tracks: [],
}

export const getPlaylist = createAsyncThunk('playlist', async (_, thunkAPI) =>{
   try {
      const userState = thunkAPI.getState().auth.user
      const user =typeof userState === 'object' ? userState : JSON.parse(userState)
      return await playlistService.get_playlist_tracks(user.access_token)
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

const playlistSlide = createSlice({
   name:'playlist',
   initialState,
   reducers:{
   },
   extraReducers:(builder) =>{
      builder
         .addCase(getPlaylist.fulfilled,(state, action) =>{
            state.tracks = action.payload.items
         })
   }
})


// export const {reset_exclude_user} = playlistSlide.actions
export default playlistSlide.reducer