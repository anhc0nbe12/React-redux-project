import { Slider } from 'antd'
import { FaUser, FaPlay, FaVolumeUp, FaPause } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {pushToPlay, removeSong, removeAllSong} from '../features/playlist/playlistSlide'

function SongListItem({ song, hidePanner, resume ,index}) {
  const [play, setPlay] = useState(false)
  const [audio,setAudio] = useState()
  const [createContext, setCreateContext] = useState(false)
  const [panner, setPanner] = useState()
  const [pannerVol,setPannerVol] = useState(0)
  const dispatch = useDispatch()
  const {mutipleSong} = useSelector((state) => state.playlist)
  const { name, url } = song
  // const [audio] = useState(new Audio(url))
  //khởi tạo audio ở lần chạy đầu
  useEffect(() => {
    if(!audio){
      const audio1 = document.createElement('audio')
      audio1.id = `audio_${index}`
      audio1.src = url
      setAudio(audio1)
    }
    //eslint-disable-next-line
  },[])
  // mỗi lần resume thì phải dừng các bài nhạc
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
    //eslint-disable-next-line
   },[resume])
   // mỗi lần play/pause
   useEffect(() => {
     if(audio){
      if (play) {
        audio.play()
        dispatch(pushToPlay({index, resume}))
      } else {
        audio.pause()
        if(!resume){
           dispatch(removeSong({index, resume}))
        }
      }
     }
     //eslint-disable-next-line
   }, [play])

  const onChangeVolume = (e) => {
    audio.volume = e[0]
  }
  const onClick = () => {
    setPlay(!play)
    dispatch(removeAllSong(false))
    if(!createContext){
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      const track = audioContext.createMediaElementSource(audio);
      const stereoNode = new StereoPannerNode(audioContext, { pan: pannerVol });
      track.connect(stereoNode).connect(audioContext.destination);
      setPanner(stereoNode)
      setCreateContext(true)
    }
  }
  const onChangeSpan = (e) => {
    
    if(panner){
      panner.pan.value = e[0]
    } else {
      setPannerVol(e[0])
    }
  }

  return (
    <div className="songlist-item">
      <div className="songlist-item-heading">
        <span>{name}</span>
        <FaUser />
        {play ? (
          <div onClick={onClick}>
            <FaPause />
          </div>
        ) : (
          <div onClick={onClick}>
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
