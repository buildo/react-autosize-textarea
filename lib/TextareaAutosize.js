'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react'),
    autosize = require('autosize');

var TextareaAutosize = React.createClass({
  displayName: 'TextareaAutosize',

  propTypes: {
    onResize: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      rows: 1
    };
  },

  componentDidMount: function componentDidMount() {
    autosize(this.refs.textarea.getDOMNode());
    if (this.props.onResize) {
      this.refs.textarea.getDOMNode().addEventListener('autosize:resized', this.props.onResize);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this.props.onResize) {
      this.refs.textarea.getDOMNode().removeEventListener('autosize:resized');
    }
  },

  render: function render() {
    return React.createElement(
      'textarea',
      _extends({}, this.props, { ref: 'textarea' }),
      this.props.children
    );
  }

});

module.exports = TextareaAutosize;