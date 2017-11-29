import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TextareaAutosize from '../../src';

describe('TextareaAutosize', () => {

  it('renders correctly', () => {
    const component = renderer.create(
      <TextareaAutosize defaultValue='Initial Value' />
    );
    expect(component).toMatchSnapshot();
  });

});
