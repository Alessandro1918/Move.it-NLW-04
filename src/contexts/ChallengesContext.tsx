import React, { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'

import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

interface Challenge {
    type: 'body' | 'eye',
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    closeLevelUpModal: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

//This const is imported by every component that wants to use the Challenge data
export const ChallengesContext = createContext({} as ChallengesContextData)

//This component is used only once, on _app.tsx, to grant data access to the entire app
//Not _app.tsx anymore. Now it's on index.tsx
export function ChallengesProvider({children, ...rest}: ChallengesProviderProps) {
    
    const [level, setLevel] = useState(rest.level ?? 1)     // ??: if this doesn't exist, use this
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelModalOpen] = useState(false)
    
    useEffect(() => {
        Notification.requestPermission()
    }, [])  /* Do this code once, at initialization */

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience, challengesCompleted])

    function levelUp() {
        setLevel(level + 1)
        setIsLevelModalOpen(true)
    }

    function closeLevelUpModal() {
        setIsLevelModalOpen(false)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]
        //console.log('New challenge: ', challenge)
        setActiveChallenge(challenge)
        
        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return
        }

        const { amount } = activeChallenge
        let finalExperience = currentExperience + amount
        if (finalExperience > experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }
        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }

    return (
        <ChallengesContext.Provider value={{level, currentExperience, experienceToNextLevel, challengesCompleted, activeChallenge, levelUp, closeLevelUpModal, startNewChallenge, resetChallenge, completeChallenge}}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    )
}