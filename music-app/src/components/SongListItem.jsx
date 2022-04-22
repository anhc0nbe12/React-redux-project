import { Slider } from 'antd'
import { FaUser, FaPlay, FaVolumeUp, FaPause } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  pushToPlay,
  removeSong,
  removeAllSong,
} from '../features/playlist/playlistSlide'

function SongListItem({ song, hidePanner, pause, index }) {
  const [play, setPlay] = useState(false)
  const [audio, setAudio] = useState()
  const createContext = useRef(false)
  const panner = useRef()
  const pannerVol = useRef(0)
  // const [pannerVol,setPannerVol] = useState(0)
  const dispatch = useDispatch()
  const { mutipleSong } = useSelector((state) => state.playlist)
  const { name, url } = song
  // const [audio] = useState(new Audio(url))
  //khởi tạo audio ở lần chạy đầu
  useEffect(() => {
    if (!audio) {
      const audio1 = document.createElement('audio')
      audio1.id = `audio_${index}`
      audio1.src = url
      audio1.onended = () => {
        setPlay(false)
        dispatch(removeSong({ index, pause }))
      }
      setAudio(audio1)
    }
    return () => {
      audio.pause()
    }
    //eslint-disable-next-line
  }, [])
  // mỗi lần pause thì phải dừng các bài nhạc
  useEffect(() => {
    if (pause) {
      setPlay(false)
    } else {
      mutipleSong.forEach((item) => {
        if (index === item) {
          setPlay(true)
        }
      })
    }
    //eslint-disable-next-line
  }, [pause])
  // mỗi lần play/pause
  useEffect(() => {
    if (audio) {
      if (play) {
        audio.play()
        dispatch(pushToPlay({ index, pause }))
      } else {
        audio.pause()
        if (!pause) {
          dispatch(removeSong({ index, pause }))
        }
      }
    }
    return () => {
      if (audio) {
        audio.pause()
      }
      dispatch(removeSong({ index, pause }))
    }
    //eslint-disable-next-line
  }, [play])

  const onChangeVolume = (e) => {
    audio.volume = e[0]
  }
  const onClick = () => {
    setPlay(!play)
    dispatch(removeAllSong(false))
    if (!createContext.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      const audioContext = new AudioContext()
      const track = audioContext.createMediaElementSource(audio)
      const stereoNode = new StereoPannerNode(audioContext, {
        pan: pannerVol.current,
      })
      track.connect(stereoNode).connect(audioContext.destination)
      panner.current = stereoNode
      createContext.current = true
    }
  }
  const onChangeSpan = (e) => {
    if (panner.current) {
      panner.current.pan.value = e[0]
    } else {
      pannerVol.current = e[0]
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
