### Examples

#### Empty

```js
<TextareaAutosize
  placeholder='try writing some lines'
/>
```

#### Minimum height

```js
<TextareaAutosize
  rows={3}
  placeholder='minimun height is 3 rows'
/>
```

#### Maximum height

using `maxRows`
```js
<TextareaAutosize
  maxRows={3}
  defaultValue={'this\nis\na\nlong\ninitial\ntext'}
/>
```

using `maxHeight`
```js
<TextareaAutosize
  style={{ maxHeight: 100, boxSizing: 'border-box' }}
  defaultValue={'this\nis\na\nlong\ninitial\ntext'}
/>
```

#### Prefilled

```js
<TextareaAutosize
  defaultValue={'this\nis\na\nlong\ninitial\ntext'}
/>
```
