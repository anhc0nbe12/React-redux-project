import ImageMiddle from '../components/ImageMiddle'
import PlayList from '../components/PlayList'
import SongList from '../components/SongList'
import {useEffect} from 'react'
import { loginUser,reset_exclude_user } from '../features/user/userSlide'
import { useDispatch } from 'react-redux'
import { useSearchParams,useNavigate } from 'react-router-dom'

function Home() {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    const code = searchParams.get('code')
    if (code){
      searchParams.delete('code')
      const data = {
        code : code,
        client_id : 'ac74a4f365ff4bdbb1d4815a04b34d2c',
        client_secret : '1ad7868c378d42faaf17531190ac34b1',
      }
      dispatch(loginUser(data))
      setSearchParams('', {replace:true})
    }
  },[searchParams,dispatch])
  
  return (
    <>
      <PlayList/>
      <ImageMiddle/>
      <SongList/>
    </>
  )
}

export default Home
