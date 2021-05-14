import Head from 'next/head'
import React from 'react'
import { GetServerSideProps } from 'next'

import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import { ChallengeBox } from '../components/ChallengeBox'

import styles from '../styles/pages/Home.module.css'
import { CountdownProvider } from '../contexts/CountdownContext'
import { ChallengesProvider } from '../contexts/ChallengesContext'

interface homeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: homeProps) {
  
  //API call to some db here:
  //Search Engines won`t wait for that async call, and the page won`t be indexed with the data

  //console.log(props)  //Will output on the browser`s Console Terminal (and also on the VS Code terminal)

  return (

    <ChallengesProvider 
      level={props.level} 
      currentExperience={props.currentExperience} 
      challengesCompleted={props.challengesCompleted}
    >

      <div className={styles.container}>
        
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar/>
        
        <CountdownProvider>
          <section>
            <div>
              <Profile/>
              <CompletedChallenges/>
              <Countdown/>
            </div>

            <div>
              <ChallengeBox/>
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

//Setud data from the middle layer (Next.js) to the Front (React)
//This is not manually exported and called anywhere.
//Instead, it's called automatically on user access, get data from cookies, API, etc., and give it to frontend by passing it as props to <ChallengesProvider> component on index.tsx, line 30
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  //API call here:
  //Get the data, pass it to the components, and then load the page with the data
  
  //const user = {level: 1, xP: 42}
  //console.log(user) //Will output on the VS Code Terminal
  //return {props: user}
  
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies
  return {
    props: {
      level: Number(level),   /* data from cookies comes as String */
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
