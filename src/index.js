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
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
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
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
            stepNumber: 0,
            isPlayerX: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = [...current.squares];

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.isPlayerX ? "X" : "O";
        this.setState({
            history: history.concat([{ squares: squares }]),
            stepNumber: history.length,
            isPlayerX: !this.state.isPlayerX,
        });
    }

    jumpTo(step) {
        this.setState({ stepNumber: step, isPlayerX: step % 2 === 0 });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? `Go to move # ${move}` : `Go to game start`;
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player ${this.state.isPlayerX ? "X" : "O"}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
