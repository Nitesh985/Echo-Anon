import {useState, useEffect} from 'react'

export default function Counter({counter, setCounter}: {counter:number, setCounter:React.Dispatch<React.SetStateAction<number>>}) {

    useEffect(()=>{
        function decrementCounter(){
              setCounter(prevState => Math.max(prevState - 1, 0));
        }
      const timerId = setInterval(decrementCounter, 1000)
        return ()=>clearInterval(timerId)
    },[setCounter])

    return(
        <>
        <span className="countdown">
            <span>{counter}</span>
        </span>
        </>
    );
}