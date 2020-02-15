import React from 'react';
//boardによって制御されたコンポーネントになった
function Square(props) {
  return (
    //クリックしたら親の(board)props.onClickイベントで関数を呼び出す
    //stateの値が親から受け取ったvalueの値になる
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default Square;
