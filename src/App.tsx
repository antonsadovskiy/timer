import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';


const convert = (number: string, type?: 'hours'): string[] => {
    switch (type) {
        case "hours":
            return (parseInt(number) / 3600).toString().split('.');
        default:
            return (parseFloat(`0.${number}`) * 60).toString().split('.');
    }
}

const check = (time: string): string => parseInt(time) < 10 ? `0${time}` : time

function App() {

    const [timerId, setTimerId] = useState<number | undefined>()
    const [time, setTime] = useState<number>(0)
    const [inputSecs, setInputSecs] = useState(0)

    const changeSecondsHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTime(parseInt(e.currentTarget.value))
        setInputSecs(parseInt(e.currentTarget.value))
    }

    const startTimer = () => {
        const timerId = setInterval(() => setTime(time => time - 1), 1000)
        setTimerId(+timerId)
    }

    useEffect(() => {
        if (time === 0) {
            clearInterval(timerId)
            setTimerId(undefined)
        }
    }, [time, timerId])

    const H = convert(time.toString(), 'hours')
    const M = convert(H[1])
    const S = convert(M[1])

    const hours = check(H[0])
    const minutes = check(M[0])
    const seconds = check(S[0])

    return (
        <div className="App">
            <div>
                <input value={inputSecs} type={'number'} onChange={changeSecondsHandler}/>
                <button onClick={startTimer}>start</button>
            </div>
            <div>
                <span>{isNaN(+hours) ? '00' : hours}</span>
                :
                <span>{isNaN(+minutes) ? '00' : minutes}</span>
                :
                <span>{isNaN(+seconds) ? '00' : seconds}</span>
            </div>
        </div>
    );
}

export default App;
