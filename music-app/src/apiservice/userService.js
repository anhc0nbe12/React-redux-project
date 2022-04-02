import axios from 'axios'
function objectToQueryString(obj) {
   var str = [];
   for (var p in obj)
     if (obj.hasOwnProperty(p)) {
       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
     }
   return str.join("&");
 }

const get_token = async ({client_id,client_secret, code}) =>{
   const config = {
      headers: {
         'Content-Type' : 'application/x-www-form-urlencoded',
         'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)      
       },
   }
   const data = {
      'grant_type':'authorization_code',
      'redirect_uri' : 'https://react-redux-project-self.vercel.app/',
      'code': code,
   }

   const response = await axios.post('https://accounts.spotify.com/api/token',objectToQueryString(data),config)
   if (response.data){
      const expiry= new Date().getTime()
      localStorage.setItem('user', JSON.stringify({...response.data , expiry}))
   }
   return response.data
}  


export const userService = {
   get_token,
}
