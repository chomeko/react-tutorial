import React from 'react';
import Square from './Square';

//boardにリフトアップしました。
class Board extends React.Component {
  //(i)はi番目って意味
  //squareにコンストラクタで定義した現在の値を伝える
  //これでsquareが現在のvalueプロパティを受け取れるようになる
  //マス目がクリックされた時にhandleClick関数をsquareに渡す
  renderSquare(i) {
    return (
      <Square
        //gameにリフトアップしたのでpropsで受け取って表示に変更
        value={this.props.squares[i]}
        //gameにリフトアップしたのでpropsで受け取ってonClickから実行する
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

export default Board;