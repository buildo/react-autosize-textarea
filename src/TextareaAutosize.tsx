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

type InnerProps = TextareaAutosize.Props & {
  innerRef: React.RefObject<HTMLTextAreaElement> | null;
};

/**
 * A light replacement for built-in textarea component
 * which automaticaly adjusts its height to match the content
 */
class TextareaAutosizeClass extends React.Component<
  InnerProps,
  TextareaAutosize.State
> {
  static defaultProps: TextareaAutosize.DefaultProps = {
    rows: 1,
    async: false
  };

  static propTypes: {
    [key in keyof InnerProps]: PropTypes.Requireable<any>
  } = {
    rows: PropTypes.number,
    maxRows: PropTypes.number,
    onResize: PropTypes.func,
    innerRef: PropTypes.object,
    async: PropTypes.bool
  };

  state = {
    lineHeight: null
  };

  textarea = this.props.innerRef || React.createRef<HTMLTextAreaElement>();
  currentValue: InnerProps["value"];

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
      setTimeout(
        () => this.textarea.current && autosize(this.textarea.current)
      );
    } else {
      this.textarea.current && autosize(this.textarea.current);
    }

    if (this.textarea.current) {
      this.textarea.current.addEventListener(RESIZED, this.onResize);
    }
  }

  componentWillUnmount() {
    if (this.textarea.current) {
      this.textarea.current.removeEventListener(RESIZED, this.onResize);
      autosize.destroy(this.textarea.current);
    }
  }

  updateLineHeight = () => {
    if (this.textarea.current) {
      this.setState({
        lineHeight: getLineHeight(this.textarea.current)
      });
    }
  };

  onChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const { onChange } = this.props;
    this.currentValue = e.currentTarget.value;
    onChange && onChange(e);
  };

  render() {
    const {
      props: {
        onResize,
        maxRows,
        onChange,
        style,
        innerRef,
        children,
        ...props
      },
      state: { lineHeight }
    } = this;

    const maxHeight = maxRows && lineHeight ? lineHeight * maxRows : null;

    return (
      <textarea
        {...props}
        onChange={this.onChange}
        style={maxHeight ? { ...style, maxHeight } : style}
        ref={this.textarea}
      >
        {children}
      </textarea>
    );
  }

  componentDidUpdate() {
    this.textarea.current && autosize.update(this.textarea.current);
  }
}

export const TextareaAutosize = React.forwardRef(
  (
    props: TextareaAutosize.Props,
    ref: React.RefObject<HTMLTextAreaElement> | null
  ) => {
    return <TextareaAutosizeClass {...props} innerRef={ref} />;
  }
);
