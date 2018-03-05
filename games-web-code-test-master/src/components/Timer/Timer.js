import React from 'react'
import PropTypes from 'prop-types'

import styles from './Timer.scss'

export const formatTime = time => {
  if (time < 0) return '--:--'
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const mm = m < 10 ? `0${m}` : m
  const s = time % 60
  const ss = s < 10 ? `0${s}` : s
  if (h > 0) return [h, mm, ss].join(':')
  return `${m}:${ss}`
}

const Timer = ({ time = 0 }) => <div className={styles.timer}>{formatTime(time)}</div>

Timer.propTypes = {
  time: PropTypes.number,
}

class TimerContainer extends React.Component {
  constructor(props) {
            console.log("timer:" + JSON.stringify(props));
    super(props)
    this.state = {
      secondsElapsed: 0,
      started : this.props.started,
      score: 100
    }

  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick() {
    if(this.props.started){
      this.setState({
      secondsElapsed: this.state.secondsElapsed + 1,
      score: this.state.score - 1
      })
    }

  }

  render() {
    console.log("timerjsstarted: "+ this.props.started);
    let score = this.state.score;
    if(score <= 0){
      score = 0;
    }
    return <div className="timeandscore">
    <div><span>Time elapsed: </span><Timer time={this.state.secondsElapsed} started={this.props.started} /></div>
    <div><span>Your score is: </span>{score}</div>
    </div>
  }
}

export default TimerContainer
