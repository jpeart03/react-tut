import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function calculateWinner(squares) {
    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // looping through winning sub-arrays
    for (let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i];
        // checking squares values using sub-array index numbers
        // winningLines[0] as an example: if squares[0], squares[1], squares[2] are ALL either 'X' or 'O' then return that character as winner
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a]; // return winning character
        }
    }
    return null;
}

// Square is a functional component and does not have state. Also, it is controlled by the Board component
function Square(props) {
    return (
        // props.onClick is passed from the Board component as "() => this.handleClick(i)"
        <button className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlayerX: true,
            squares: Array(9).fill(null),
        };
    }

    handleClick(i) {
        if (this.state.squares[i] || calculateWinner(this.state.squares)) {
            return; // Someone won, or square is taken. Do not change state.
        }
        const squaresCopy = [...this.state.squares];
        squaresCopy[i] = this.state.isPlayerX ? "X" : "O";
        this.setState({
            squares: squaresCopy,
            isPlayerX: !this.state.isPlayerX,
        });
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${this.state.isPlayerX ? "X" : "O"}`;
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
