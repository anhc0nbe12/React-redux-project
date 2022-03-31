import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {setTrackPlay} from '../features/playlist/playlistSlide'

function TrackItem({ index, track }) {
  const dispatch = useDispatch()
  const [play, setPlay] = useState(false)
  const onClick = () =>{
    setPlay(!play)
    const trackInfo = {
      name: track.name,
      url: track.preview_url,
    }
    dispatch(setTrackPlay(trackInfo))
  }

  return (
    <div className="tracks-content" onClick={onClick}>
      <div className="tracks-content-index">
        <p>{index +1 }</p>
      </div>
      <div className="tracks-heading-heading">
        <h3>{track.name}</h3>
        <p>{track.artists[0].name}</p>
      </div>
    </div>
  )
}

export default TrackItem
