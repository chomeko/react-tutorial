import React from 'react';

class Square extends React.Component {
  render() {
    return (
      //画面上にBoardから受け取ったpropsのvalueを表示させる
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}

export default Square;
