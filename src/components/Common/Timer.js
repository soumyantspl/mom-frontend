
import React,{ useState, useEffect } from 'react';
import { updateTimer } from '../../redux/actions/authActions/authAction';
import { useSelector, useDispatch } from "react-redux";

const Timer = (props) => {
    console.log(props)
    const initialTime=props.minutes
    const initialMinute=initialTime?parseInt(initialTime-1):2
    const initialSeconds = 59;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    const dispatch = useDispatch();
    useEffect(()=>{
    let myInterval = setInterval(() => {
        if( minutes === 0 && seconds === 0){
            console.log("call------------22--->>>>>>>>>>>>>>")
           
            dispatch(updateTimer(false))
        }
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
            console.log("call--------------->>>>>>>>>>>>>>")
           
            
            clearInterval(myInterval);
          };
    });

    return (
        <div>
          
      
            <p><strong>{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</strong></p> 
        
        </div>
    )
}

export default Timer;