import React from 'react';
import ReactDOM from 'react-dom';
import TextareaAutosize from '../src/TextareaAutosize';

class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'replace me with your component'
    };
  }

  render() {

    const textareaStyle = {
      padding: '10px 8px',
      border: '1px solid rgba(39,41,43,.15)',
      borderRadius: 4,
      fontSize: 15
    };

    return (
      <div style={{ fontFamily: 'sans-serif', margin: 15 }}>
        <h2>Empty</h2>
        <TextareaAutosize style={textareaStyle} placeholder='try writing some lines' />

        <h2>Minimum Height</h2>
        <TextareaAutosize rows='3' style={textareaStyle} placeholder='minimun height is 3 rows' />

        <h2>Prefilled</h2>
        <TextareaAutosize style={textareaStyle} defaultValue={'this\nis\na\nlong\ninitial\ntext'} />

        <h2>{'You can compare with this normal react <textarea>'}</h2>
        <textarea style={textareaStyle} defaultValue={'this\nis\na\nlong\ninitial\ntext'} />
      </div>
    );
  }

}

ReactDOM.render(<Example />, document.getElementById('container'));
