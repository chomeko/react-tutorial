import React from 'react';
import Square from './Square';

class Board extends React.Component {
  //リフトアップする為boardにconstructor
  //初期値にsquaresプロパティに９個のマスにnullが入ってる状態にする
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    //.slice() メソッドを使ってsquaresに、現在の配列のコピーを作成し代入
    //squaresのi番目をXにする
    //setStateでsquaresの状態を上記のものに書き換える
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  //(i)はi番目って意味
  //squareにコンストラクタで定義した現在の値を伝える
  //これでsquareが現在のvalueプロパティを受け取れるようになる
  //マス目がクリックされた時に関数をsquareに渡す
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

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

export default Board;