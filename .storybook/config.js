import { configure } from '@storybook/angular';
// import { setCompodocJson } from '@storybook/addon-docs/angular';
// import docJson from '../documentation.json';

// setCompodocJson(docJson);

// automatically import all files ending in *.stories.ts
// configure(require.context('../src/stories', true, /\.stories\.ts$/), module);

const req = require.context('../src/', true, /\.stories\.(js|ts|mdx)$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
