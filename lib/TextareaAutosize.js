'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react'),
    autosize = require('autosize'),
    UPDATE = 'autosize:update',
    DESTROY = 'autosize:destroy',
    RESIZED = 'autosize:resized';

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
      this.refs.textarea.getDOMNode().addEventListener(RESIZED, this.props.onResize);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this.props.onResize) {
      this.refs.textarea.getDOMNode().removeEventListener(RESIZED);
    }
    this.dispatchEvent(DESTROY);
  },

  dispatchEvent: function dispatchEvent(EVENT_TYPE) {
    var _this = this;

    var event = document.createEvent('Event');
    event.initEvent(EVENT_TYPE, true, false);
    setTimeout(function () {
      return _this.refs.textarea.getDOMNode().dispatchEvent(event);
    });
  },

  getValue: function getValue(props) {
    if (props) {
      return props.valueLink ? props.valueLink.value : props.value;
    }
  },

  render: function render() {
    return React.createElement(
      'textarea',
      _extends({}, this.props, { ref: 'textarea' }),
      this.props.children
    );
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.getValue(nextProps) !== this.getValue(this.props)) {
      this.dispatchEvent(UPDATE);
    }
  }

});

module.exports = TextareaAutosize;