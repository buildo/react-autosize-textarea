import * as React from "react";
import * as PropTypes from "prop-types";
import * as autosize from "autosize";
import * as _getLineHeight from "line-height";

const getLineHeight = _getLineHeight as (element: HTMLElement) => number | null;

export namespace TextareaAutosize {
  export type RequiredProps = Pick<
    React.HTMLProps<HTMLTextAreaElement>,
    Exclude<keyof React.HTMLProps<HTMLTextAreaElement>, "ref">
  > & {
    /** Called whenever the textarea resizes */
    onResize?: (e: Event) => void;
    /** Minimum number of visible rows */
    rows?: React.HTMLProps<HTMLTextAreaElement>["rows"];
    /** Maximum number of visible rows */
    maxRows?: number;
    /** Called with the ref to the DOM node */
    innerRef?: (textarea: HTMLTextAreaElement) => void;
    /** Initialize `autosize` asynchronously.
     * Enable it if you are using StyledComponents
     * This is forced to true when `maxRows` is set.
     */
    async?: boolean;
  };
  export type DefaultProps = {
    rows: number;
    async: boolean;
  };
  export type Props = RequiredProps & Partial<DefaultProps>;
  export type State = {
    lineHeight: number | null;
  };
}

const RESIZED = "autosize:resized";

/**
 * A light replacement for built-in textarea component
 * which automaticaly adjusts its height to match the content
 */
export class TextareaAutosize extends React.Component<
  TextareaAutosize.Props,
  TextareaAutosize.State
> {
  static defaultProps: TextareaAutosize.DefaultProps = {
    rows: 1,
    async: false
  };

  static propTypes: {
    [key in keyof TextareaAutosize.Props]: PropTypes.Requireable<any>
  } = {
    rows: PropTypes.number,
    maxRows: PropTypes.number,
    onResize: PropTypes.func,
    innerRef: PropTypes.func,
    async: PropTypes.bool
  };

  state = {
    lineHeight: null
  };

  textarea: HTMLTextAreaElement | null;
  currentValue: TextareaAutosize.Props["value"];

  onResize = (e: Event): void => {
    if (this.props.onResize) {
      this.props.onResize(e);
    }
  };

  componentDidMount() {
    const { maxRows, async } = this.props;

    if (typeof maxRows === "number") {
      this.updateLineHeight();
    }

    if (typeof maxRows === "number" || async) {
      /*
        the defer is needed to:
          - force "autosize" to activate the scrollbar when this.props.maxRows is passed
          - support StyledComponents (see #71)
      */
      setTimeout(() => this.textarea && autosize(this.textarea));
    } else {
      this.textarea && autosize(this.textarea);
    }

    if (this.textarea) {
      this.textarea.addEventListener(RESIZED, this.onResize);
    }
  }

  componentWillUnmount() {
    if (this.textarea) {
      this.textarea.removeEventListener(RESIZED, this.onResize);
      autosize.destroy(this.textarea);
    }
  }

  updateLineHeight = () => {
    if (this.textarea) {
      this.setState({
        lineHeight: getLineHeight(this.textarea)
      });
    }
  };

  onChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const { onChange } = this.props;
    this.currentValue = e.currentTarget.value;
    onChange && onChange(e);
  };

  saveDOMNodeRef = (ref: HTMLTextAreaElement | null) => {
    if (ref) {
      const { innerRef } = this.props;

      if (innerRef) {
        innerRef(ref);
      }

      this.textarea = ref;
    }
  };

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
  };

  render() {
    const { children, saveDOMNodeRef, ...locals } = this.getLocals();
    return (
      <textarea {...locals} ref={saveDOMNodeRef}>
        {children}
      </textarea>
    );
  }

  componentDidUpdate() {
    this.textarea && autosize.update(this.textarea);
  }
}
