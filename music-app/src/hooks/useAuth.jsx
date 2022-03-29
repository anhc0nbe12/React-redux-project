import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false)
  const {user} = useSelector((state) => state.auth)

  useEffect(() =>{
    if(user){
      setLoggedIn(true)
    } else{
      setLoggedIn(false)
    }
  },[user])
  return (
    <div>
      
    </div>
  )
}

export default useAuth
