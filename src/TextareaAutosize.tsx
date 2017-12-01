import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as autosize from 'autosize';
import * as _getLineHeight from 'line-height';

const getLineHeight = _getLineHeight as (element: HTMLElement) => number | null;

export type TextareaAutosizeRequiredProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  onResize?: (e: React.SyntheticEvent<Event>) => void,
  onChange?: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void,
  // rows is already typed in `React.TextareaHTMLAttributes<HTMLTextAreaElement>`
  maxRows?: number,
  innerRef?: (textarea: HTMLTextAreaElement) => void
}

export type TextareaAutosizeDefaultProps = {
  rows: number
}

export namespace TextareaAutosize {
  export type Props = TextareaAutosizeRequiredProps & Partial<TextareaAutosizeDefaultProps>;
}

export type State = {
  lineHeight: number | null
}

type EventType = 'autosize:update' | 'autosize:destroy' | 'autosize:resized';

const UPDATE: EventType = 'autosize:update';
const DESTROY: EventType = 'autosize:destroy';
const RESIZED: EventType = 'autosize:resized';

/**
 * A light replacement for built-in textarea component
 * which automaticaly adjusts its height to match the content
 */
export default class TextareaAutosize extends React.Component<TextareaAutosize.Props, State> {

  static defaultProps: TextareaAutosizeDefaultProps = {
    rows: 1
  };

  static propTypes: { [key in keyof TextareaAutosize.Props]: PropTypes.Requireable<any> } = {
    rows: PropTypes.number,
    maxRows: PropTypes.number,
    onResize: PropTypes.func,
    innerRef: PropTypes.func
  }

  state = {
    lineHeight: null
  }

  textarea: HTMLTextAreaElement
  currentValue: TextareaAutosize.Props['value']

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
      this.textarea.addEventListener(RESIZED, onResize as any);
    }
  }

  componentWillUnmount() {
    const { onResize } = this.props;
    if (onResize) {
      this.textarea.removeEventListener(RESIZED, onResize as any);
    }
    this.dispatchEvent(DESTROY);
  }

  dispatchEvent = (EVENT_TYPE: EventType) => {
    const event = document.createEvent('Event');
    event.initEvent(EVENT_TYPE, true, false);

    this.textarea.dispatchEvent(event);
  };

  updateLineHeight = () => {
    this.setState({
      lineHeight: getLineHeight(this.textarea)
    });
  }

  onChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const { onChange } = this.props;
    this.currentValue = e.currentTarget.value;
    onChange && onChange(e);
  }

  saveDOMNodeRef = (ref: HTMLTextAreaElement) => {
    const { innerRef } = this.props;

    if (innerRef) {
      innerRef(ref);
    }

    this.textarea = ref;
  }

  getLocals = () => {
    const {
      props: { onResize, maxRows, onChange, style, innerRef, ...props },
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

  componentDidUpdate() {
    if (this.props.value !== this.currentValue) {
      this.dispatchEvent(UPDATE);
    }
  }

}
