import React from 'react';
import ReactDOM from 'react-dom';
import autosize from 'autosize';
import { t, props } from 'tcomb-react';

const UPDATE = 'autosize:update',
  DESTROY = 'autosize:destroy',
  RESIZED = 'autosize:resized';

export const Props = {
  onResize: t.maybe(t.Function)
};

/** A light replacement for built-in textarea component which automaticaly adjusts its height to match the content
 * @param onResize - called whenever the textarea resizes
 */
@props(Props, { strict: false })
export default class TextareaAutosize extends React.Component {

  static defaultProps = {
    rows: 1
  };

  getTextareaDOMNode = () => (
    this.refs.textarea.nodeType === 1 ?
      this.refs.textarea :
      ReactDOM.findDOMNode(this.refs.textarea)
  );

  componentDidMount() {
    autosize(this.getTextareaDOMNode());
    if (this.props.onResize) {
      this.getTextareaDOMNode().addEventListener(RESIZED, this.props.onResize);
    }
  }

  componentWillUnmount() {
    if (this.props.onResize) {
      this.getTextareaDOMNode().removeEventListener(RESIZED, this.props.onResize);
    }
    this.dispatchEvent(DESTROY);
  }

  dispatchEvent = (EVENT_TYPE, defer) => {
    const event = document.createEvent('Event');
    event.initEvent(EVENT_TYPE, true, false);
    const dispatch = () => this.getTextareaDOMNode().dispatchEvent(event);
    if (defer) {
      setTimeout(dispatch);
    } else {
      dispatch();
    }
  };

  getValue = ({ valueLink, value }) => valueLink ? valueLink.value : value;

  render() {
    const { children, onResize, ...props } = this.props;  // eslint-disable-line no-unused-vars
    return (
      <textarea {...props} ref='textarea'>
        {children}
      </textarea>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.getValue(nextProps) !== this.getValue(this.props)) {
      this.dispatchEvent(UPDATE, true);
    }
  }

}
