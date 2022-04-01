import SongListItem from './SongListItem'
import song_1 from '../assets/audio/BangBang_JessieJArianaGrandeNickiMinaj.mp3'
import song_2 from '../assets/audio/DontLetMeDown_TheChainsmokersDaya.mp3'
import song_3 from '../assets/audio/LetMeLoveYou_DJSnakeJustinBieber.mp3'
import song_4 from '../assets/audio/OldTownRoadRemix_LilNasXBillyRayCyrus.mp3'
import song_5 from '../assets/audio/SomethingJustLikeThis_TheChainsmokersColdplay.mp3'
import song_6 from '../assets/audio/ThereForYou_MartinGarrixTroyeSivan.mp3'
import song_7 from '../assets/audio/UptownFunk_MarkRonsonBrunoMars.mp3'
import song_8 from '../assets/audio/WithoutMe_Halsey.mp3'
import { useState } from 'react'
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
  const [hidePanner, setHidePanner] = useState(true)
  const [resume, setResume] = useState(false)
  const panner = (e) =>{
    e.target.checked ? setHidePanner(false):setHidePanner(true)
  }
  const resumeAll = (e) =>{
    e.target.checked ? setResume(true) : setResume(false)
  }
  return (
    <div className="songlist-wrapper">
        <div className="show-pan-control">
          <label htmlFor="resume">Resume All</label>
          <input
            type="checkbox"
            name="resume"
            id="resume"
            className="checkbox"
            onChange={resumeAll}
          />
        </div>
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
        <SongListItem song={item} index={index} key={index} hidePanner={hidePanner} resume={resume}/>
      ))}
    </div>
  )
}

export default SongList
