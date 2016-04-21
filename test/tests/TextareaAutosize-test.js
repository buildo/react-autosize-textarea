import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import TextareaAutosize from '../../lib';


const renderTextarea = () => {
  const component = <TextareaAutosize className='textarea-autosize' />;
  const textarea = TestUtils.renderIntoDocument(component);
  return textarea;
};

describe('TextareaAutosize', function() {

  it('should be displayed', function() {
    const textarea = renderTextarea();
    const txt = TestUtils.scryRenderedDOMComponentsWithClass(textarea, 'textarea-autosize');
    expect(txt.length).toBe(1, 'textarea is not displayed');
  });

  it('should display initial value', function() {
    const initialValue = 'Initial Value'
    const component = <TextareaAutosize className='textarea-autosize' defaultValue={initialValue} />;
    const textarea = TestUtils.renderIntoDocument(component);
    const txt = TestUtils.findRenderedDOMComponentWithClass(textarea, 'textarea-autosize');
    const value = txt.innerHTML;
    expect(value).toBe(initialValue, 'intial value is not displayed correctly');
  });

});