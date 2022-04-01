import { Slider } from 'antd'
import { FaUser, FaPlay, FaVolumeUp, FaPause } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {pushToPlay, removeSong} from '../features/playlist/playlistSlide'

function SongListItem({ song, hidePanner, resume ,index}) {
  const [play, setPlay] = useState(false)
  const dispatch = useDispatch()
  const {mutipleSong} = useSelector((state) => state.playlist)
  const { name, url } = song

  const [audio] = useState(new Audio(url))
  useEffect(()=>{
   if(resume){
      setPlay(false)
   } else {
      mutipleSong.forEach((item) => {
         if(index === item){
            setPlay(true)
         }
      });
   }
  },[resume])
  useEffect(() => {
    if (play) {
      audio.play()
      dispatch(pushToPlay({index, resume}))
    } else {
      audio.pause()
      if(!resume){
         dispatch(removeSong({index, resume}))
      }
    }
  }, [play])

  const onChangeVolume = (e) => {
    audio.volume = e[0]
  }
  const onChangeSpan = (e) => {}

  return (
    <div className="songlist-item">
      <div className="songlist-item-heading">
        <span>{name}</span>
        <FaUser />
        {play ? (
          <div onClick={() => setPlay(!play)}>
            <FaPause />
          </div>
        ) : (
          <div onClick={() => setPlay(!play)}>
            <FaPlay />
          </div>
        )}
      </div>
      <div className="songlist-item-vol">
        <FaVolumeUp />
        <Slider
          range
          step={0.01}
          defaultValue={0.75}
          onChange={onChangeVolume}
          min={0}
          max={1}
          className="slider--custom"
        />
      </div>
      {hidePanner && (
        <div className="songlist-pan-control">
          <span>L</span>
          <Slider
            range
            step={0.01}
            defaultValue={0}
            onChange={onChangeSpan}
            min={-1}
            max={1}
            className="slider--custom"
          />
          <span>R</span>
        </div>
      )}
    </div>
  )
}

export default SongListItem
