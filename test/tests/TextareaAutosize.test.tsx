import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
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

describe('build', () => {

  it('build script generates every needed file', () => {
    execSync('npm run build')
    expect(fs.readdirSync(path.resolve(__dirname, '../../lib'))).toMatchSnapshot()
  })

})
