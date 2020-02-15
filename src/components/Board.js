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
    //もし勝者が決まっているか、マスが埋まっている場合は、handleClickを終了さす
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
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
    //勝敗のことを指していて、もし勝敗が決まっていたらreturn squares[a];を代入
    //決まってなければnullを代入
    const winner = calculateWinner(this.state.squares);
    //statusを定義（Next Player:X）の部分のこと、書き換えできるように。
    let status;
    //nullの場合はfalseが入るのでelse 勝敗が決まっていたらwinnerにX、Oが入ってtrueになるから
    //statusがwinnerになる
    if (winner) {
      status = 'winner' + winner;
    //まだ勝敗が決まってなかったらtrueならXをfalseならOを代入
    } else {
      status = 'Next Player:' + (this.state.xIsNext ? 'X' : 'O');
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

function calculateWinner(squares) {
  //配列は全部でインデックス番号が０〜７横縦斜めの８列
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  //for文で回して、最大７まで。
  for (let i = 0; i < lines.length; i++) {
    //配列abcにそれぞれのlines０〜７を代入
    //0番目だったら０、１、２となる
    const [a, b, c] = lines[i];
    //条件分岐で全てXかOだったら勝敗が決まって
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      //勝者のXかOを返す
      return squares[a];
    }
  }
  //それ以外だったらnullを返す
  return null;
}

export default Board;