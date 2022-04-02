import {useState, useEffect} from 'react'
const Timer = ({initMinutes,initSeconds}) => {
   const [ minutes, setMinutes ] = useState(initMinutes);
   const [seconds, setSeconds ] =  useState(initSeconds);
   useEffect(()=>{
   let myInterval = setInterval(() => {
           if (seconds > 0) {
               setSeconds(seconds - 1);
           }
           if (seconds === 0) {
               if (minutes === 0) {
                   clearInterval(myInterval)
               } else {
                   setMinutes(minutes - 1);
                   setSeconds(59);
               }
           } 
       }, 1000)
       return ()=> {
           clearInterval(myInterval);
         };
   });

   return (
      <>
      { minutes === 0 && seconds === 0
           ? null
           : <p style={{fontWeight:'500'}}> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</p> 
       }
      </>
       
   )
}

export default Timer;