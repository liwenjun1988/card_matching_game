import React from 'react'

import ReactDOM from 'react-dom'
//import Timer from '../Timer/Timer'
import styles from './Game.scss'
import CardGame from './Cardgame.js'

const Game = () => (
  <div>
    <h1 className={styles.header}>NYT Games Code Test</h1>

    <div className={styles.placeholder}>
    </div>
    <div>
    	<CardGame />
    </div>
  </div>
)


export default Game;

