import React from 'react';
//boardによって制御されたコンポーネントになった
class Square extends React.Component {
  render() {
    return (
      //クリックしたら親の(board)props.onClickイベントで関数を呼び出す
      //stateの値が親から受け取ったvalueの値になる
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

export default Square;
