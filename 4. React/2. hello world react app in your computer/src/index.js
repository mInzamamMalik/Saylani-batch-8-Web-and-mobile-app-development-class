import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

function Hi() {
  return <div>

    Hello World 1234

    <h1 className='red'>Heading 1</h1>
    <h1 className='green'>Heading 2</h1>

    some new changes

  </div>;
}

ReactDOM.render(<Hi />, document.querySelector('#root'));