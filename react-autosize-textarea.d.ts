/// <reference types="react" />

import * as React from 'react';

export interface TextareaAutosizeProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  onResize?: (e: React.SyntheticEvent<Event>) => void,
  // rows is already typed in `React.HTMLAttributes<HTMLTextAreaElement>`
  maxRows?: number,
  innerRef?: (textarea: HTMLTextAreaElement) => void
}

declare const TextareaAutosize: React.ComponentClass<TextareaAutosizeProps>;
export default TextareaAutosize
