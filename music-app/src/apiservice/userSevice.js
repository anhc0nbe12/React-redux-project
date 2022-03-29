import axios from 'axios'
// const API_URL = 'https://accounts.spotify.com/api/token'

const get_token = async ({client_id,client_secret}) =>{
   const config = {
      headers: {
         'Content-Type' : 'application/x-www-form-urlencoded',
         'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)      
       },
   }
   const data = 'grant_type=client_credentials'
   const response = await axios.post('https://accounts.spotify.com/api/token',data,config)
   if (response.data){
      const expiry= new Date().getTime()
      localStorage.setItem('user', JSON.stringify({...response.data , expiry}))
   }
   return response.data
}  



// const get_token = async (user_id) =>{
//    const data = {
//       headers: {
//          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//       },
//       client_id: user_id,
//       grant_type:'client_credentials',
//       redirect_uri: 'http://localhost:3000',
//       scope:'streaming%20user-library-modify%20user-library-read%20user-modify-playback-state%20user-read-playback-state',
//       response_type:'token',
//    }
//    const response = user.post('https://accounts.spotify.com/authorize',data)
//    return response.data
// }
export const userSevice = {
   get_token,
}
