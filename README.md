# React Autosize Textarea
A light replacement for built-in `<textarea />` component which automatically adjusts its height to match the content.

**NB: It does not require any polyfill**

```jsx
import ReactDOM from 'react-dom';
import TextareaAutosize from 'react-autosize-textarea';

ReactDOM.renderComponent(
  <TextareaAutosize {...textareaProps} onResize={(e) => {}} />,
  document.body
);
```

## Install
```
npm install --save react-autosize-textarea
```

## Demo
[Live Demo](https://rawgit.com/buildo/react-autosize-textarea/master/examples/index.html)

[More Examples](https://github.com/buildo/react-autosize-textarea/tree/master/examples)


## Usage
You can pass any prop you're allowed to use with the default React textarea (`valueLink` too).

You can also pass the optional callback **onResize** which will be triggered at any resize with the `autosize:resized` event object:

```jsx
function onResize(event) {
  console.log(event.type); // -> "autosize:resized"
}

<TextareaAutosize onResize={onResize} />
```

#### Set min/max height
You can set `minHeight` and `maxHeight` through CSS or inline-style as usual:

```jsx
<TextareaAutosize style={{ minHeight: 20, maxHeight: 80 }} /> // min-height: 20px; max-height: 80px;
```

**NB:** you may need to take into account borders and/or padding.


In addition to `minHeight`, you can force `TextareaAutosize` to have a minimum number of rows by passing the prop `rows`:

```jsx
<TextareaAutosize rows={3} /> // minimun height is three rows
```

## Browser Compatibility
| Chrome        | Firefox       | IE    | Safari | Android |
| ------------- | ------------- | ----- | ------ | ------- |
| Yes           | Yes           | 9+    | Yes    | 4+      |


## Credits
This module is based on the very popular autosize script written by [Jack Moore](https://github.com/jackmoore).

Check out his [repo](https://github.com/jackmoore/autosize) or [website](http://www.jacklmoore.com/autosize/) for more documentation.
