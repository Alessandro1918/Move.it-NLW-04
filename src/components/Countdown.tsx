import { useState, useEffect, useContext } from 'react'
import { CountdownContext } from '../contexts/CountdownContext'

import styles from '../styles/components/Countdown.module.css'

export function Countdown() {

    const { min, sec, hasFinished, isActive, startCountdown, resetCountdown } = useContext(CountdownContext)

    const [minLeft, minRight] = String(min).padStart(2, '0').split('')
    const [secLeft, secRight] = String(sec).padStart(2, '0').split('')
    
    //Q: Why did I had to move all the vars and functions out of here to the CountdownContext?
    //A: So the buttons "Failed" / "Succeded" (components from ChallengeBox) could trigger the resetCountdown (function from Countdown)
    
    //Q: So could I move just that single function to the CountdownContext?
    //A: No. resetCountdown function handles time, hasFinished and isActive vars, so they have to be there in the Context as well

    return (
        <div>
            <div className={styles.container}>
                <div>
                    <span>{minLeft}</span>
                    <span>{minRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secLeft}</span>
                    <span>{secRight}</span>
                </div>
            </div>

            {hasFinished 
                ? (
                    <button
                        disabled
                        className={styles.countdownButton}
                    >
                        Ciclo encerrado
                    </button>
                ) 
                : (
                    <>
                        {isActive ? (
                            <button 
                                type="button" 
                                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                                onClick={resetCountdown}
                            >
                                Abandonar ciclo
                            </button>
                        ) : (
                            <button 
                                type="button" 
                                className={styles.countdownButton}
                                onClick={startCountdown}
                            >
                                Iniciar um ciclo
                            </button>
                        )}
                    </>
                )
            }
        </div>
    )
}