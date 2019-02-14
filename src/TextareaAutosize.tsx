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
    /** Initialize `autosize` asynchronously.
     * Enable it if you are using StyledComponents
     * This is forced to true when `maxRows` is set.
     */
    async?: boolean;
    forwardedRef?: React.RefObject<HTMLTextAreaElement>;
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
class TextareaAutosizeInner extends React.Component<
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
    forwardedRef: PropTypes.shape({
      current: PropTypes.instanceOf(HTMLElement)
    }),
    async: PropTypes.bool
  };

  state = {
    lineHeight: null
  };

  currentValue: TextareaAutosize.Props["value"];

  onResize = (e: Event): void => {
    if (this.props.onResize) {
      this.props.onResize(e);
    }
  };

  componentDidMount() {
    const { maxRows, async, forwardedRef } = this.props;

    if (typeof maxRows === "number") {
      this.updateLineHeight();
    }

    if (typeof maxRows === "number" || async) {
      /*
        the defer is needed to:
          - force "autosize" to activate the scrollbar when this.props.maxRows is passed
          - support StyledComponents (see #71)
      */
      setTimeout(
        () =>
          forwardedRef && forwardedRef.current && autosize(forwardedRef.current)
      );
    } else {
      forwardedRef && forwardedRef.current && autosize(forwardedRef.current);
    }

    if (forwardedRef && forwardedRef.current) {
      forwardedRef.current.addEventListener(RESIZED, this.onResize);
    }
  }

  componentWillUnmount() {
    const { forwardedRef } = this.props;
    if (forwardedRef && forwardedRef.current) {
      forwardedRef.current.removeEventListener(RESIZED, this.onResize);
      autosize.destroy(forwardedRef.current);
    }
  }

  updateLineHeight = () => {
    const { forwardedRef } = this.props;
    if (forwardedRef && forwardedRef.current) {
      this.setState({
        lineHeight: getLineHeight(forwardedRef.current)
      });
    }
  };

  onChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const { onChange } = this.props;
    this.currentValue = e.currentTarget.value;
    onChange && onChange(e);
  };

  getLocals = () => {
    const {
      props: { onResize, maxRows, onChange, style, ...props },
      state: { lineHeight }
    } = this;

    const maxHeight = maxRows && lineHeight ? lineHeight * maxRows : null;

    return {
      ...props,
      style: maxHeight ? { ...style, maxHeight } : style,
      onChange: this.onChange
    };
  };

  render() {
    const { children, forwardedRef, ...locals } = this.getLocals();
    return (
      <textarea {...locals} ref={forwardedRef}>
        {children}
      </textarea>
    );
  }

  componentDidUpdate() {
    const { forwardedRef } = this.props;
    forwardedRef &&
      forwardedRef.current &&
      autosize.update(forwardedRef.current);
  }
}

export const TextareaAutosize = React.forwardRef(
  (
    props: TextareaAutosize.Props,
    ref: React.RefObject<HTMLTextAreaElement>
  ) => <TextareaAutosizeInner {...props} forwardedRef={ref} />
);
