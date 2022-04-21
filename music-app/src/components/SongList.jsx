import SongListItem from './SongListItem'
import song_1 from '../assets/audio/BangBang_JessieJArianaGrandeNickiMinaj.mp3'
import song_2 from '../assets/audio/DontLetMeDown_TheChainsmokersDaya.mp3'
import song_3 from '../assets/audio/LetMeLoveYou_DJSnakeJustinBieber.mp3'
import song_4 from '../assets/audio/OldTownRoadRemix_LilNasXBillyRayCyrus.mp3'
import song_5 from '../assets/audio/SomethingJustLikeThis_TheChainsmokersColdplay.mp3'
import song_6 from '../assets/audio/ThereForYou_MartinGarrixTroyeSivan.mp3'
import song_7 from '../assets/audio/UptownFunk_MarkRonsonBrunoMars.mp3'
import song_8 from '../assets/audio/WithoutMe_Halsey.mp3'
import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {removeAllSong} from '../features/playlist/playlistSlide'
function SongList() {
  const songs = [
    {
      name: 'Bang Bang',
      url: song_1,
    },
    {
      name: 'Dont Let Me Down',
      url: song_2,
    },
    {
      name: 'Let Me Love You',
      url: song_3,
    },
    {
      name: 'Old Town Road Remix',
      url: song_4,
    },
    {
      name: 'Some Thing Just Like This',
      url: song_5,
    },
    {
      name: 'There For You',
      url: song_6,
    },
    {
      name: 'Up Town Funk',
      url: song_7,
    },
    {
      name: 'Without Me',
      url: song_8,
    },
  ]
  const [hidePanner, setHidePanner] = useState(false)
  const [pause, setPause] = useState(false)

  const dispatch = useDispatch()
  const {hardPause, mutipleSong} = useSelector((state) => state.playlist)

  useEffect(() => {
    if(hardPause){
      setPause(true)
    }
    if(!pause ){
      if(mutipleSong.length>0){
        dispatch(removeAllSong(false))
      }
    } else {
      document.querySelector('#pause').checked = true
    }
     //eslint-disable-next-line
  },[hardPause])
  const panner = (e) =>{
    e.target.checked ? setHidePanner(true):setHidePanner(false)
  }
  const pauseAll = (e) =>{
    e.target.checked ? setPause(true) : setPause(false)
  }
  return (
    <div className="songlist-wrapper">
      {mutipleSong.length >0 &&(
        <div className="show-pan-control">
          <label htmlFor="pause">{pause? 'Resume All':'Pause All'}</label>
          <input
            type="checkbox"
            name="pause"
            id="pause"
            className="checkbox"
            onChange={pauseAll}
          />
        </div>
      )}
        <div className="show-pan-control">
          <label htmlFor="showpan">Show Pan Control</label>
          <input
            type="checkbox"
            name="showpan"
            id="showpan"
            className="checkbox"
            onChange={panner}
          />
        </div>
      {songs.map((item, index) => (
        <SongListItem song={item} index={index} key={index} hidePanner={hidePanner} pause={pause}/>
      ))}
    </div>
  )
}

export default SongList
