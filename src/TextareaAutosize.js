'use strict';

const React = require('react'),
  autosize = require('autosize'),
  UPDATE = 'autosize:update',
  DESTROY = 'autosize:destroy',
  RESIZED = 'autosize:resized';

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
      this.refs.textarea.getDOMNode().addEventListener(RESIZED, this.props.onResize);
    }
  },

  componentWillUnmount() {
    if (this.props.onResize) {
      this.refs.textarea.getDOMNode().removeEventListener(RESIZED);
    }
    this.dispatchEvent(DESTROY);
  },

  dispatchEvent(EVENT_TYPE) {
    const event = document.createEvent('Event');
    event.initEvent(EVENT_TYPE, true, false);
    setTimeout(() => this.refs.textarea.getDOMNode().dispatchEvent(event));
  },

  getValue(props) {
    if (props) {
      return props.valueLink ? props.valueLink.value : props.value;
    }
  },

  render() {
    return (
      <textarea {...this.props} ref='textarea'>
        {this.props.children}
      </textarea>
    );
  },

  componentWillReceiveProps(nextProps) {
    if (this.getValue(nextProps) !== this.getValue(this.props)) {
      this.dispatchEvent(UPDATE);
    }
  },

});

module.exports = TextareaAutosize;