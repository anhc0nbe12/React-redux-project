import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {reset_exclude_user} from '../features/user/userSlide'
function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false)
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() =>{
    if(user){
      setLoggedIn(true)
    } else{
      setLoggedIn(false)
    }
    return () => dispatch(reset_exclude_user())
  },[user,dispatch])
  return {loggedIn}
}

export default useAuth
