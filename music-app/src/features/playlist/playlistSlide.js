import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {playlistService} from '../../apiservice/playlistService'

const initialState = {
   tracks: [],
   isPlay:{},
   mutipleSong: [],
   hardPause: false,
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
      setTrackPlay:(state, action) =>{
         state.isPlay = action.payload
      },
      pushToPlay: (state, action) => {
         if (action.payload.resume ) {
            state.mutipleSong = [action.payload.index]
         }
         if( !(state.mutipleSong.includes(action.payload.index)) ){
               state.mutipleSong.push(action.payload.index) 
         }
      },
      removeSong: (state, action) => {
         const index = state.mutipleSong.indexOf(action.payload.index)
         if (index !== -1){
            state.mutipleSong.splice(index,1)
         }
      },
      removeAllSong:(state, action) => {
         state.hardPause = action.payload
      }
   },
   extraReducers:(builder) =>{
      builder
         .addCase(getPlaylist.fulfilled,(state, action) =>{
            state.tracks = action.payload.items
         })
   }
})


export const {setTrackPlay,pushToPlay,removeSong,removeAllSong} = playlistSlide.actions
export default playlistSlide.reducer