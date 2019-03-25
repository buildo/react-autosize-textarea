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

#### Styled components

```js
const StyledTextarea = styled(TextareaAutosize)`
  font-size: ${({ theme }) => theme.textarea.fontSize};
  border-color: ${({ theme }) => theme.textarea.borderColor};
  resize: none;
  box-sizing: border-box;
  width: 100%;
`;

<StyledTextarea
  defaultValue='Church-key flannel bicycle rights, tofu tacos before they sold out polaroid for free'
  theme={{
    textarea: {
      fontSize: '18px',
      borderColor: 'green'
    }
  }}
/>
```

#### Inner ref

```js
initialState = {
  value: '',
  ref: React.createRef()
};

<div>
  <TextareaAutosize
    value={state.value}
    onChange={e => setState({ value: e.target.value })}
    placeholder="try writing some lines"
    ref={state.ref}
  />
  {state.ref.current && <div>The textarea contains: {state.ref.current.value}</div>}
</div>
```
