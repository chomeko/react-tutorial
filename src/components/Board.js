import React from 'react';
import Square from './Square';

class Board extends React.Component {
  //リフトアップする為boardにconstructor
  //初期値にsquaresプロパティに９個のマスにnullが入ってる状態にする
  //stateにxIsNextを増やす
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    //.slice() メソッドを使ってsquaresに、現在の配列のコピーを作成し代入
    const squares = this.state.squares.slice();
    //stateのxIsNextがhandleClick関数を呼ばれるたびにtrueならXでfalseならOに切り替える
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    //setStateでsquaresの状態を上記のものに書き換える
    //xIsNextを!で反転させる
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  //(i)はi番目って意味
  //squareにコンストラクタで定義した現在の値を伝える
  //これでsquareが現在のvalueプロパティを受け取れるようになる
  //マス目がクリックされた時にhandleClick関数をsquareに渡す
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    //画面のテキストをxIsNextの値（XかO）を表示
    const status = 'Next player: ' + (this.state.xIsNext ? 'X':'O');

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