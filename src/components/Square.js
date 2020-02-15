import React from 'react';

class Square extends React.Component {
  //this.stateで初期値を保存する
  //propsは親の事、今回の親はBoardになってる
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    return (
      //クリックしたらthis.setStateでvalueの値をXに書き換える
      //stateの値が初期値からXになる
      <button
        className="square"
        onClick={() => this.setState({ value: 'X' })}
      >
        {this.state.value}
      </button>
    );
  }
}

export default Square;
