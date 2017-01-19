import React from 'react';
import autosize from 'autosize';
import { t, props } from 'tcomb-react';

const UPDATE = 'autosize:update',
  DESTROY = 'autosize:destroy',
  RESIZED = 'autosize:resized';

export const Props = {
  rows: t.maybe(t.Integer),
  maxRows: t.maybe(t.Integer),
  onResize: t.maybe(t.Function)
};

/** A light replacement for built-in textarea component
 * which automaticaly adjusts its height to match the content
 * @param onResize - called whenever the textarea resizes
 * @param rows - minimum number of visible rows
 * @param maxRows - maximum number of visible rows
 */
@props(Props, { strict: false })
export default class TextareaAutosize extends React.Component {

  static defaultProps = {
    rows: 1,
    maxRows: 5
  };

  state = {
    maxHeight: null
  }

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

  dispatchEvent = (EVENT_TYPE) => {
    const event = document.createEvent('Event');
    event.initEvent(EVENT_TYPE, true, false);

    this.textarea.dispatchEvent(event);
  };

  getValue = ({ valueLink, value }) => valueLink ? valueLink.value : value;

  onChange = e => {
    const {
      props: { maxRows, onChange },
      state: { maxHeight }
    } = this;

    const numberOfRows = e.target.value.split('\n').length;

    if (!maxHeight && numberOfRows >= maxRows) {
      const computedStyle = window.getComputedStyle(this.textarea);

      const paddingTop = parseFloat(computedStyle.getPropertyValue('padding-top'), 10);
      const paddingBottom = parseFloat(computedStyle.getPropertyValue('padding-top'), 10);
      const verticalPadding = (paddingTop || 0) + (paddingBottom || 0);

      const borderTopWidth = parseInt(computedStyle.getPropertyValue('border-top-width'), 10);
      const borderBottomWidth = parseInt(computedStyle.getPropertyValue('border-bottom-width'), 10);
      const verticalBorderWidth = (borderTopWidth || 0) + (borderBottomWidth || 0);

      this.setState({
        maxHeight: this.textarea.offsetHeight - verticalPadding - verticalBorderWidth
      });
    } else if (maxHeight && numberOfRows < maxRows) {
      this.setState({ maxHeight: null });
    }

    onChange && onChange(e);
  }

  getLocals = () => {
    const {
      props: { onResize, maxRows, onChange, style, ...props }, // eslint-disable-line no-unused-vars
      state: { maxHeight }
    } = this;

    return {
      ...props,
      style: maxHeight ? { ...style, maxHeight } : style,
      onChange: this.onChange
    };
  }

  render() {
    const { children, ...locals } = this.getLocals();
    return (
      <textarea {...locals} ref={(ref) => { this.textarea = ref; }}>
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
