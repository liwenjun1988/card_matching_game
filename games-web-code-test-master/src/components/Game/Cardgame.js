import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Timer from '../Timer/Timer'

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  
  renderSquare(i) {
  // 	console.log(this.props.squares[i]);
  // 	console.log(this.props.removeCards);
  // 	if(this.props.removeCards && this.props.squares[i] !== null){
  // return (
  //   <button >
  //     x
  //   </button>
  // );
  // 	}
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
		  {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
        <div className="board-row">          
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>
      </div>
    );
  }
}

class CardGame extends React.Component {
  constructor(props) {
    super(props);
	this.state = {
	    history:
	    { 
	      location: -1,
	      square: -1
	    },
	    isOddStep: true,
	    revealedCards: 0,
	    squares : Array(8).fill(null),
	    revealedSquares: Array(8).fill(null),
	    removeCards: false,
	    timeStarted: false
    };
  }

  componentDidMount() {
    axios.get('https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json')
      .then(res => {
        const shuffleCards = res.data.levels[0].cards.sort(function() { return 0.5 - Math.random() });
        this.setState({ revealedSquares :  shuffleCards});
      });  
  }

  handleClick(i) {
    const history = this.state.history;
    const squares = this.state.squares;
    if(squares[i] !== null){
    	return;
    }
	squares[i] = this.state.revealedSquares[i];
	if(!this.state.isOddStep && !cardMatch(this.state.history.square, squares[i])){
		squares[i] = null;
		squares[this.state.history.location] = null;
	}
	if(this.state.isOddStep){
		this.setState({
			history: 
			  {
				location: i,
				square: squares[i]
			  },
			isOddStep: !this.state.isOddStep,
			revealedCards: this.state.revealedCards,
			squares: squares,
			timeStarted: true
	    });
	}else{
		this.setState({
	        history:
		        { 
		          location: i,
		          square: squares[i]
		        },
			isOddStep: !this.state.isOddStep,
			revealedCards: cardMatch(this.state.history.square, squares[i])? this.state.revealedCards+2 : this.state.revealedCards,
			removeCards: cardMatch(this.state.history.square, squares[i])? true: false,
			squares: squares,
			timeStarted: true
	    });    		
	}


	
  }



  render() {
    const history = this.state.history;

    let status;
    console.log(this.state.revealedCards);
    if (this.state.revealedCards == 8) {
      status = "You won the game";
      this.state.timeStarted = false;
    } else {
      status = "Please reveal a random card";
    }
console.log("click: "+ this.state.timeStarted);
console.log("squares: "+ this.state.squares);
    return (
      <div className="game">
        <div className="game-board">
          <Timer
            started = {this.state.timeStarted}
           />
          <Board
            squares={this.state.squares}
            onClick={i => this.handleClick(i)}
            removeCards={this.state.removeCards}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
      </div>
    );
  }
}


function cardMatch(historySquare, currentSquare){
	return (historySquare == currentSquare);
}


export default CardGame;


