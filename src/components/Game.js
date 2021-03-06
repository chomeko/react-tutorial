import React from 'react';
import Board from './Board';

class Game extends React.Component {
  //リフトアップする為boardにconstructor
  //初期値にsquaresプロパティに９個のマスにnullが入ってる状態にする
  //stateにxIsNextを増やす
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }
  //boardからgemに移動
  handleClick(i) {
    //history配列のインデックス番号0から次のstepNumber＋１（初期値が0のため）までを切り抜いて配列を代入
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    //history（配列）の1番最後を代入
    const current = history[history.length - 1];
    //.slice() メソッドを使ってsquaresに、現在の配列のコピーを作成し代入
    const squares = current.squares.slice();
    //もし勝者が決まっているか、マスが埋まっている場合は、handleClickを終了さす
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    //stateのxIsNextがhandleClick関数を呼ばれるたびにtrueならXでfalseならOに切り替える
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    //盤面を操作したらhistoryも増える
    //setStateでsquaresの状態を上記のものに書き換える
    //xIsNextを!で反転させる
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      //stepnumberに今の配列の数の値を与える
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  //stepNumberに現在のstepを上書きする
  //xIsNextのとこは偶数だった場合はtrueにする
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    //stateのhistoryを代入して
    const history = this.state.history;
    //historyにステップナンバーを持たせる
    const current = history[this.state.stepNumber];
    //画面のテキストをxIsNextの値（XかO）を表示
    //勝敗のことを指していて、もし勝敗が決まっていたらreturn squares[a];を代入
    //決まってなければnullを代入
    //calculateWinner(this.state.squares)を現在の盤面の状態を見て（current）勝者を判別するに変更
    const winner = calculateWinner(current.squares);
    //historyをmapにしてstepの初期値は０でmoveはなし。stepが１ならmoveも１で以下増えていく感じ
    const moves = history.map((step, move) => {
      //moveがあればmoveなければstart
      const desc = move ? 'Go to move #' + move : 'Go to start';
      return (
        //ボタンをクリックしたらjumpToメソッド（moveを持たす）を渡す
        //reactでリストを使う場合はkeyを持たす。それにはmoveを持たす。
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    //statusを定義（Next Player:X）の部分のこと、書き換えできるように。
    let status;
    //nullの場合はfalseが入るのでelse 勝敗が決まっていたらwinnerにX、Oが入ってtrueになるから
    //statusがwinnerになる
    if (winner) {
      status = 'winner:' + winner;
    //まだ勝敗が決まってなかったらtrueならXをfalseならOを代入
    } else {
      status = 'Next Player:' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            //ボードに現在のスクエアとonClickでhandleClickを渡す
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
// boardからgameに移動
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


export default Game;