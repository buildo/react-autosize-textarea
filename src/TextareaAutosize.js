'use strict';

const React = require('react'),
  autosize = require('autosize');

const TextareaAutosize = React.createClass({

  propTypes: {
    onResize: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      rows: 1
    };
  },

  componentDidMount() {
    autosize(this.refs.textarea.getDOMNode());
    if (this.props.onResize) {
      this.refs.textarea.getDOMNode().addEventListener('autosize:resized', this.props.onResize);
    }
  },

  componentWillUnmount() {
    if (this.props.onResize) {
      this.refs.textarea.getDOMNode().removeEventListener('autosize:resized');
    }
  },

  render() {
    return (
      <textarea {...this.props} ref='textarea'>
        {this.props.children}
      </textarea>
    );
  }

});

module.exports = TextareaAutosize;