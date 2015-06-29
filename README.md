# React Autosize Textarea
A light replacement for built-in textarea component which automaticaly adjusts its height to match the content.
**It does not require any polyfill**

This module is based on the very popular autosize script written by Jack Moore. Check his website [here](http://www.jacklmoore.com/autosize/) for more documentation.

```jsx
var TextareaAutosize = require('react-autosize-textarea');

React.renderComponent(
  <div>
    <TextareaAutosize {...textareaProps} onResize={() => {}} />
  </div>,
  document.body);
```
[Live Demo](https://rawgit.com/buildo/react-autosize-textarea/master/examples/index.html)

[More Examples](https://github.com/buildo/react-autosize-textarea/tree/master/examples)

###Install
```
npm install --save react-autosize-textarea
```

###API
You can pass any props you're allowed to use with default React textarea (valueLink too).

You can also pass the callback **onResize** which will be triggered at any resize:
```jsx
onResize: React.PropTypes.func
```

###Browser Compatibility
| Chrome        | Firefox       | IE    | Safari | Android |
| ------------- | ------------- | ----- | ------ | ------- |
| Yes           | Yes           | 9+    | Yes    | 4+      |
