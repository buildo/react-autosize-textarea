[![codecov.io](http://codecov.io/github/buildo/react-textarea-autosize/coverage.svg?branch=master)](http://codecov.io/github/buildo/react-textarea-autosize?branch=master)

# React Autosize Textarea
A light replacement for built-in textarea component which automaticaly adjusts its height to match the content.
**It does not require any polyfill**

This module is based on the very popular autosize script written by Jack Moore. Check its website [here](http://www.jacklmoore.com/autosize/) for more documentation.

```
var TextareaAutosize = require('react-autosize-textarea');

React.renderComponent(
  <div>
    <TextareaAutosize {...textareaProps} onResize={() => {}} />
  </div>,
  document.body);
```

###Install
```
npm install --save react-autosize-textarea
```

###API
You can pass any props you're allowed to use with default React textarea (valueLink too).

You can also pass the callback **onResize** which will be triggered at any resize:
```
onResize: React.PropTypes.func
```

###Browser Compatibility
| Chrome        | Firefox       | IE    | Safari | Android |
| ------------- | ------------- | ----- | ------ | ------- |
| Yes           | Yes           | 9+    | Yes    | 4+      |
