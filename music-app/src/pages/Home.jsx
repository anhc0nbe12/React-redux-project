import ImageMiddle from '../components/ImageMiddle'
import PlayList from '../components/PlayList'
import SongList from '../components/SongList'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect } from 'react'
import { loginUser } from '../features/user/userSlide'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

function Home() {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    const code = searchParams.get('code')
    if (code) {
      searchParams.delete('code')
      const data = {
        code: code,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
      }
      dispatch(loginUser(data))
      setSearchParams('', { replace: true })
    }
  }, [searchParams, dispatch, setSearchParams])

  return (
    <div className="main-layout container">
      <Header/>
      <div className="main-layout-content ">
        <PlayList />
        <ImageMiddle />
        <SongList />
      </div>
      <Footer/>
    </div>
  )
}

export default Home
