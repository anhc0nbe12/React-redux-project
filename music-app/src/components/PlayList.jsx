import {FaCaretDown, FaCaretUp} from 'react-icons/fa'
import {useState} from 'react'
import {Link} from 'react-router-dom'

function PlayList() {
   const [hideLogin,setHideLogin] = useState(false)
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
  return (
    <div className="main-content-playlist">
      <div className="playlist-heading">
         <h1>I Miss My Cafe</h1>
         <p>Take a seat and stay awhile.</p>
      </div>
      <div className="playlist-content">
         <iframe src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3" width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media" title="playlist"></iframe>
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
