import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function getallCards(){
  var url = "https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json"
  return axios.get(url)
    .then(response => response.data.levels[0].cards);
}

class Board extends React.Component {
  
 //  constructor(props) {
 //    super(props);
 //    this.cards = getallCards().then(function(value) {
 //     return value;
  // });
 //  }

  renderSquare(i) {
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
      squares : Array(8).fill(null)
    };
  }

  handleClick(i) {
    const history = this.state.history;
    //const current = history[history.length - 1];
    const squares = this.state.squares;
    //const state = current.state;
    // if (calculateWinner(squares) || squares[i]) {
    //   return;
    // }
    getallCards().then(function(value) {
      // squares[i] = this.state.xIsNext ? "X" : "O";
      squares[i] = value[i];
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
        squares: squares
        });
      }else{
        this.setState({
            history:
              { 
                location: -1,
                square: -1
              },
        isOddStep: !this.state.isOddStep,
        revealedCards: cardMatch(this.state.history.square, squares[i])? this.state.revealedCards+2 : this.state.revealedCards,
        squares: squares
        });       
      }

  }.bind(this));
  
  }

  // jumpTo(step) {
  //   this.setState({
  //     stepNumber: step,
  //     xIsNext: (step % 2) === 0
  //   });
  // }

  render() {
    const history = this.state.history;
    //const current = history[this.state.stepNumber];
    //const winner = calculateWinner(current.squares);
    //const moves = history.map((step, move) => {
    //   const desc = move ?
    //     'Go to move #' + move :
    //     'Go to game start';
    //   return (
    //     <li key={move}>
    //       <button onClick={() => this.jumpTo(move)}>{desc}</button>
    //     </li>
    //   );
    // });

    let status;
    if (this.state.revealedCards == 8) {
      status = "You won the game";
    } else {
      status = "Please reveal a random card";
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onClick={i => this.handleClick(i)}
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


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


export default CardGame;


