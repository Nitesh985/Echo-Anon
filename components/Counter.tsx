import {useState, useEffect} from 'react'

export default function Counter({counter, setCounter}: {counter:number, setCounter:React.Dispatch<React.SetStateAction<number>>}) {

    useEffect(()=>{
        function decrementCounter(){
              setCounter(prevState => Math.max(prevState - 1, 0));
        }
      const timerId = setTimeout(decrementCounter, 1000)
        return ()=>clearTimeout(timerId)
    },[counter])

    return(
        <>
        <span className="countdown">
            <span>{counter}</span>
        </span>
        </>
    );
}