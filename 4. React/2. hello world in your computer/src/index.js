import React from 'react';
import ReactDOM from 'react-dom';

function Hi() {
  return <div>Hello World!</div>;
}

ReactDOM.render(<Hi/>, document.querySelector('#root'));