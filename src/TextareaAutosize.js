import React from 'react';
import autosize from 'autosize';

const UPDATE = 'autosize:update',
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

  getTextareaDOMNode() {
    return this.refs.textarea.nodeType === 1 ?
      this.refs.textarea :
      this.refs.textarea.getDOMNode();
  },

  componentDidMount() {
    autosize(this.getTextareaDOMNode());
    if (this.props.onResize) {
      this.getTextareaDOMNode().addEventListener(RESIZED, this.props.onResize);
    }
  },

  componentWillUnmount() {
    if (this.props.onResize) {
      this.getTextareaDOMNode().removeEventListener(RESIZED, this.props.onResize);
    }
    this.dispatchEvent(DESTROY);
  },

  dispatchEvent(EVENT_TYPE, defer) {
    const event = document.createEvent('Event');
    event.initEvent(EVENT_TYPE, true, false);
    const dispatch = () => this.getTextareaDOMNode().dispatchEvent(event);
    if (defer) {
      setTimeout(dispatch);
    } else {
      dispatch();
    }
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
      this.dispatchEvent(UPDATE, true);
    }
  }

});

export default TextareaAutosize;
