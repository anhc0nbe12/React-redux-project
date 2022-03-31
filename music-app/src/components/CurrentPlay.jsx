import {useDispatch, useSelector} from 'react-redux'


// playing, name of the track
function CurrentPlay() {
  const dispatch = useDispatch()
  const {isPlay} = useSelector((state) => state.playlist)
  const {url, name} = isPlay
  
  return (
    <div className="current-track">
      <div className="current-track-img">
      </div>
      <div className="current-track-playbar">
         { name ? <h3>{name}</h3> :<h3>Please choose a song</h3> }
         <audio src={url} controls autoPlay >

         </audio>
      </div>
    </div>
  )
}

export default CurrentPlay
