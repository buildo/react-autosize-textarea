import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import expect from 'expect';
import TextareaAutosize from '../../src/TextareaAutosize';


const renderTextarea = () => {
  const component =
    <div>
      <TextareaAutosize className='textarea-autosize' />
    </div>;
  const textareaWrapper = TestUtils.renderIntoDocument(component);
  return textareaWrapper;
};

describe('TextareaAutosize', function() {

  it('should be displayed', function() {
    const textareaWrapper = renderTextarea();
    const textarea = TestUtils.scryRenderedDOMComponentsWithClass(textareaWrapper, 'textarea-autosize');
    expect(textarea.length).toBe(1, 'textarea is not displayed');
  });

  it('should display initial value', function() {
    const initialValue = 'Initial Value'
    const component =
      <div>
        <TextareaAutosize className='textarea-autosize' defaultValue={initialValue} />
      </div>;
    const textareaWrapper = TestUtils.renderIntoDocument(component);
    const textarea = TestUtils.findRenderedDOMComponentWithClass(textareaWrapper, 'textarea-autosize');
    const value = textarea.getDOMNode().innerHTML;
    expect(value).toBe(initialValue, 'intial value is not displayed correctly');
  });

  // it('should resize correctly based on initial value', function() {
  //   const initialValue = '\n\n\n\n\n\n\n\n\n\nInitial Value'
  //   const component =
  //     <div>
  //       <TextareaAutosize className='textarea-autosize' defaultValue={initialValue} />
  //     </div>;
  //   const textareaWrapper = TestUtils.renderIntoDocument(component);
  //   const textarea = TestUtils.findRenderedDOMComponentWithClass(textareaWrapper, 'textarea-autosize').getDOMNode();
  //   React.addons.TestUtils.Simulate.click(textarea);
  //   console.log(textarea.style.height);
  //   console.log(textarea.clientHeight);
  //   // const value = textarea.getDOMNode().innerHTML;
  //   // expect(value).toBe(initialValue, 'intial value is not displayed correctly');
  // });

});