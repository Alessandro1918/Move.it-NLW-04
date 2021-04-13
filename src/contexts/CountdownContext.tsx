import { createContext, useState, ReactNode, useContext, useEffect } from 'react'
import { ChallengesContext } from './ChallengesContext'

interface CountdownContextData {
    min: number;
    sec: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode
}

//This const is imported by every component that wants to use the Countdown data
export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout

//This component is used only once, on index.tsx, to grand data access to the components @ index.tsx between lines 25-37
export function CountdownProvider({children}: CountdownProviderProps) {
    
    const [time, setTime] = useState(25 * 60)
    const min = Math.floor(time / 60)
    const sec = time % 60
    const [hasFinished, setHasFinished] = useState(false)
    const [isActive, setIsActive] = useState(false)
    
    function startCountdown() {
        setIsActive(true)
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setHasFinished(false)
        setIsActive(false)
        setTime(25 * 60)
    }

    const { startNewChallenge } = useContext(ChallengesContext)

    //Timer
    useEffect(() => {
        if (isActive && time > 0) {
            /* V1: Will dec 1 sec after button click, 
               because action was already programmed to happen, 
               just with 1000ms delay */
            /* setTimeout(() => { */
            /* V2: */
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time == 0) {
            setIsActive(false)
            setHasFinished(true)
            startNewChallenge()
        }
    }, [isActive, time])    /* Do this code every time these vars change */
    
    return (
        <CountdownContext.Provider value={{min, sec, hasFinished, isActive, startCountdown, resetCountdown}}>
            {children}
        </CountdownContext.Provider>
    )
}
