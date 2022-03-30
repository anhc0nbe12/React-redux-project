import {FaCaretDown, FaCaretUp} from 'react-icons/fa'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getPlaylist} from '../features/playlist/playlistSlide'

import TrackItem from './TrackItem'

function PlayList() {
   const [hideLogin,setHideLogin] = useState(false)
   const dispatch = useDispatch()
   const {user} = useSelector((state) => state.auth)
   const {tracks} = useSelector((state) => state.playlist)
   const toggleClicked = () =>{
      const playlist_content = document.querySelector(".playlist-content-login")
      if(playlist_content.classList.contains('toggle-hide')){
         playlist_content.classList.replace('toggle-hide','toggle-show')
         setHideLogin(true)
      } else{
         playlist_content.classList.replace('toggle-show','toggle-hide')
         setHideLogin(false)
      }
   }

//get playlist id
   useEffect(() =>{
      if(user){
         dispatch(getPlaylist())
      }
   },[user,dispatch])



  return (
    <div className="main-content-playlist">
      <div className="playlist-heading">
         <h1>I Miss My Cafe</h1>
         <p>Take a seat and stay awhile.</p>
      </div>
      <div className="playlist-content">
         {/* <iframe src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3" width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media" title="playlist"></iframe> */}
         <div className='playlist-content-tracks'>
            {tracks.map(({track}, index) =>(
               <TrackItem index={index} track={track}/>
            ))}
         </div>
         <div className="playlist-content-login toggle-show">
            <p>Want the full playlist?</p>
            <Link to={'/login'} className='btn btn-success btn-lg'>
               LOGIN TO SPOTIFY
            </Link>
            <div className="playlist-toggle" onClick={toggleClicked}>
               {hideLogin ? <FaCaretUp/>:<FaCaretDown/>}
            </div>
         </div>
      </div>
    </div>
  )
}



export default PlayList
