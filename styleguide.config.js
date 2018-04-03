const path = require('path');

module.exports = {
  // build
  serverPort: 8080,

  require: [
    // "global" setup + sass imports
    path.resolve(__dirname, 'styleguide/setup.ts')
  ],

  // content
  title: 'react-autosize-textarea',
  compilerConfig: {
    transforms: { dangerousTaggedTemplateString: true }
  },
  // assetsDir: 'styleguide/assets',
  template: 'styleguide/index.html',
  propsParser: require('react-docgen-typescript').parse, // detect docs using TS information
  sections: [{
    name: 'TextareaAutosize',
    components: () => [path.resolve(__dirname, 'src/TextareaAutosize.tsx')]
  }],
  showCode: true,
  showUsage: false, // show props by default
  getExampleFilename() {
    return path.resolve(__dirname, 'examples/Examples.md');
  }
};
