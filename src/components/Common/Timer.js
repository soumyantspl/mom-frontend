
import React,{ useState, useEffect } from 'react';

const Timer = (props) => {
    const initialTime=props.minutes
    const initialMinute=initialTime?parseInt(initialTime-1):2
    const initialSeconds = 59;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
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
        <div>
          
        { minutes === 0 && seconds === 0
            ? null
            : <p><strong>{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</strong></p> 
        }
        </div>
    )
}

export default Timer;