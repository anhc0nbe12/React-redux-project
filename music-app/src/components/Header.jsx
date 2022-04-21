import cafesketch_inverted from '../assets/img/cafesketch_inverted.png'
import cafesketch from '../assets/img/cafesketch.png'
import { Modal } from 'antd'
import {  useState} from 'react'
import Timer from './Timer'
import {useDispatch} from 'react-redux'
import {removeAllSong} from '../features/playlist/playlistSlide'

function Header() {
  const [aboutModal, setAboutModal] = useState(false)
  const [timerModal, setTimerModal] = useState(false)
  const [time, setTime] = useState(25)
  const [run, setRun] = useState(false)
  const dispatch = useDispatch()

  // template string 
  const darkMode = (e) => {
    const root = document.querySelector(':root')
    const background_img = document.querySelector('#background_img')
    if (e.target.checked) {
      root.style.setProperty('--background-color', '#666')
      root.style.setProperty('--text-color-dark', '#fff')
      background_img.src = cafesketch_inverted
    } else {
      root.style.setProperty('--background-color', 'bisque')
      root.style.setProperty('--text-color-dark', '#000')
      background_img.src = cafesketch
    }
  }
  const showModalAbout = () => {
    setAboutModal(true)
  }
  const aboutModalCancer = () => {
    setAboutModal(false)
  }
  const handleCancelTimer = () => {
    setTimerModal(false)
    
  }
  const showTimerModal = () => {
    setTimerModal(true)
    document.querySelector("#form-timer").value=''
  }

  const onChange = (e) =>{
    // to seconds
   if(e.target.value <= 0 ){
     setTime(25)
   } else{
    setTime(e.target.value )
   }
  }
  const setTimerRun = () =>{
   setRun(!run)
   setTimerModal(false)
   //dispatch clear all with time
   setTimeout(()=>{
      setRun(false)
      setTime(25)
      dispatch(removeAllSong(true))
   },Number(time) * 60*1000)
   //header set run = false settime=25
  }
  return (
    <div className="main-layout-header ">
      <span onClick={showModalAbout}>about / privacy</span>
      <Modal
        visible={aboutModal}
        onCancel={aboutModalCancer}
        footer={null}
        className="modal--custom"
      >
        <h2 className="text-center">About</h2>
        <p>
          People are more productive in places they're comfortable in, says a
          study that we made up for the purpose of writing this sentence. That
          said, real experts with real studies recommend you stay away from
          public spaces, so we made a stand-in for your favorite cafe. We
          recommend Chrome for the best experience.
        </p>
        <p>Inspired by IMissMyBar, IMissTheOffice, and Coffitivity.</p>
        <p>
          Sounds are licensed from Pro Sound Effects, Sounds of Norway, PMSFX,
          Boom Library, Tall Tale Sound, and Sound Ideas, with voiceover by
          @lankgod and Elijah Mann.
        </p>
        <p>
          Code and illustrations by Reagan Henke. Reagan is a software engineer
          with too many side projects. Follow her other adventures through
          IfThenCreate.
        </p>
        <p>
          Sound design by evan cook. evan uses sounds to help people tell
          stories. You can read words evan writes on his Twitter, or look at his
          hardware projects on Instagram.
        </p>
        <h2 className="text-center">privacy</h2>
        <p>
          We added Google Analytics to the site! They use cookies to tell us
          about user activity so we can keep improving the cafe. We don't pass
          any personally identifiable data, and we don't use it for advertising.
          You can learn more about how Google collects data in their privacy
          policy.
        </p>
      </Modal>
      <div className="trigger-darkmode" onChange={darkMode}>
        <label htmlFor="darkmode">dark mode</label>
        <input type="checkbox" name="darkmode" id="darkmode" />
      </div>
      <span onClick={showTimerModal}>timer</span>
      <Modal
        visible={timerModal}
        onCancel={handleCancelTimer}
        footer={null}
        className="modal--custom"
      >
        <h2 className='text-center'>pomodoro timer</h2>
        <form className="text-center " >
          <div className="form-modal">
            <input type="text" placeholder={25} onChange={onChange} id='form-timer'/>
            <span>minutes</span>
          </div>
          {run ? (
             <button className='btn btn-dark btn-sm' type='button' onClick={setTimerRun}>Stop</button>
          ) : (
            <button className='btn btn-dark btn-sm' type='button' onClick={setTimerRun}>Start</button>
          )}
        </form>
        <p>
          The pomodoro technique is a time management method. Set the timer for
          as long as you like. After it runs out you will hear a chime and your
          sounds will pause, as a reminder to take a break.
        </p>
      </Modal>
      {run && <Timer initMinutes={Number(time - 1)} initSeconds={59}/>}
    </div>
  )
}

export default Header
