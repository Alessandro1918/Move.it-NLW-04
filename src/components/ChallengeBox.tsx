import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'

import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {

    //Do I have a challenge to show?
    //V1 - const hardcoded to true or false 
    //const hasActiveChallenge = false
    //V2 - get challenge from ContextAPI
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext)

    //button functions:
    //V1 - handle just the challenge. Countdown button knows nothing
    //b1.onClick={resetChalenge}, b2.onClick={completeChallenge}
    //V2 - handle the challenge AND use resetCountdown function from CountdownContext
    const { resetCountdown } = useContext(CountdownContext)

    function handleChallengeFailed() {
        resetChallenge()
        resetCountdown()
    }

    function handleChallengeSucceeded() {
        completeChallenge()
        resetCountdown()
    }

    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge 
                ? (
                    <div className={styles.challengeActive}>
                        <header>Ganhe {activeChallenge.amount} xp</header>
                        <main>
                            <img src={`icons/${activeChallenge.type}.svg`}/>
                            <strong>Novo desafio</strong>
                            <p>{activeChallenge.description}</p>
                        </main>
                        <footer>
                            <button 
                                type="button" 
                                className={styles.challengeFailedButton}
                                onClick={handleChallengeFailed}
                            >
                                Falhei
                            </button>
                            <button 
                                type="button" 
                                className={styles.challengeSucceededButton}
                                onClick={handleChallengeSucceeded}
                            >
                                Completei
                            </button>
                        </footer>
                    </div>
                ) 
                : (
                    <div className={styles.challengeNotActive}>
                        <strong>Inicie um ciclo para receber um desafio</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level Up"/>
                            Avance de nível completando desafios
                        </p>
                    </div>
                )
            }
        </div>
    )
}