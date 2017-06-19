import React from 'react';
import PropTypes from 'prop-types';
import autosize from 'autosize';
import getLineHeight from 'line-height';

const UPDATE = 'autosize:update',
  DESTROY = 'autosize:destroy',
  RESIZED = 'autosize:resized';


/** A light replacement for built-in textarea component
 * which automaticaly adjusts its height to match the content
 * @param onResize - called whenever the textarea resizes
 * @param rows - minimum number of visible rows
 * @param maxRows - maximum number of visible rows
 * @param innerRef - called with the ref to the DOM node
 */
export default class TextareaAutosize extends React.Component {

  static defaultProps = {
    rows: 1
  };

  state = {
    lineHeight: null
  }

  componentDidMount() {
    const { onResize, maxRows } = this.props;

    if (typeof maxRows === 'number') {
      this.updateLineHeight();

      // this trick is needed to force "autosize" to activate the scrollbar
      setTimeout(() => autosize(this.textarea));
    } else {
      autosize(this.textarea);
    }

    if (onResize) {
      this.textarea.addEventListener(RESIZED, this.props.onResize);
    }
  }

  componentWillUnmount() {
    if (this.props.onResize) {
      this.textarea.removeEventListener(RESIZED, this.props.onResize);
    }
    this.dispatchEvent(DESTROY);
  }

  dispatchEvent = (EVENT_TYPE) => {
    const event = document.createEvent('Event');
    event.initEvent(EVENT_TYPE, true, false);

    this.textarea.dispatchEvent(event);
  };

  getValue = ({ valueLink, value }) => valueLink ? valueLink.value : value;

  updateLineHeight = () => {
    this.setState({
      lineHeight: getLineHeight(this.textarea)
    });
  }

  onChange = e => {
    this.props.onChange && this.props.onChange(e);
  }

  saveDOMNodeRef = ref => {
    const { innerRef } = this.props;

    if (innerRef) {
      innerRef(ref);
    }

    this.textarea = ref;
  }

  getLocals = () => {
    const {
      props: { onResize, maxRows, onChange, style, innerRef, ...props }, // eslint-disable-line no-unused-vars
      state: { lineHeight },
      saveDOMNodeRef
    } = this;

    const maxHeight = maxRows && lineHeight ? lineHeight * maxRows : null;

    return {
      ...props,
      saveDOMNodeRef,
      style: maxHeight ? { ...style, maxHeight } : style,
      onChange: this.onChange
    };
  }

  render() {
    const { children, saveDOMNodeRef, ...locals } = this.getLocals();
    return (
      <textarea {...locals} ref={saveDOMNodeRef}>
        {children}
      </textarea>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.getValue(prevProps) !== this.getValue(this.props)) {
      this.dispatchEvent(UPDATE);
    }
  }

}

TextareaAutosize.propTypes = {
  rows: PropTypes.number,
  maxRows: PropTypes.number,
  onResize: PropTypes.func,
  innerRef: PropTypes.func
};
