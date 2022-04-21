import { useEffect,useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {removeAllSong} from '../features/playlist/playlistSlide'
// playing, name of the track
function CurrentPlay() {
  const dispatch = useDispatch()
  const [audio, setAudio] = useState()
  const {isPlay,hardPause} = useSelector((state) => state.playlist)
  const {url, name} = isPlay
  useEffect(() => {
    if(!audio){
      setAudio(document.querySelector('#current_play_audio'))
    } else {
      if(hardPause){
        audio.pause()
      }
      if(!audio.paused){
        dispatch(removeAllSong(false))
      }
    }
    //eslint-disable-next-line
  },[hardPause])
  return (
    <div className="current-track">
      <div className="current-track-img">
      </div>
      <div className="current-track-playbar">
         { name ? <h3>{name}</h3> :<h3>Please choose a song</h3> }
         <audio src={url} controls autoPlay id="current_play_audio">

         </audio>
      </div>
    </div>
  )
}

export default CurrentPlay
