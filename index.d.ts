import * as React from 'react';

export interface TextareaAutosizeProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  maxRows?: number,
  onResize?: (e: React.SyntheticEvent<Event>) => void,
  innerRef?: (textarea: HTMLTextAreaElement) => void
}

export default class TextareaAutosize extends React.Component<TextareaAutosizeProps, void> {}