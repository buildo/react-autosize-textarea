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

/** A light replacement for built-in textarea component
 * which automaticaly adjusts its height to match the content
 * @param onResize - called whenever the textarea resizes
 */
@props(Props, { strict: false })
export default class TextareaAutosize extends React.Component {

  static defaultProps = {
    rows: 1
  };

  componentDidMount() {
    autosize(this.textarea);
    if (this.props.onResize) {
      this.textarea.addEventListener(RESIZED, this.props.onResize);
    }
  }

  componentWillUnmount() {
    if (this.props.onResize) {
      this.textarea.removeEventListener(RESIZED, this.props.onResize);
    }
    this.dispatchEvent(DESTROY);
  }

  dispatchEvent = (EVENT_TYPE, defer) => {
    const event = document.createEvent('Event');
    event.initEvent(EVENT_TYPE, true, false);
    const dispatch = () => this.textarea.dispatchEvent(event);
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
      <textarea {...props} ref={ref => this.textarea = ref}>
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
