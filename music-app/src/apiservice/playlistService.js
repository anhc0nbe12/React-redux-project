import axios from "axios";


const get_playlist_tracks = async(token) =>{
   const API_URL = '	https://api.spotify.com/v1/playlists/6dwisqm0zS0FXhKKyGDexS/tracks'
   const config = {
      headers :{
         'Authorization' : 'Bearer '+token ,
      }
   }
   const response = await axios.get(API_URL, config)
   return response.data
}

export const playlistService = {
   get_playlist_tracks,
}