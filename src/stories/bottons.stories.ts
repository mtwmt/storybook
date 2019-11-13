import { storiesOf, moduleMetadata } from '@storybook/angular';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { ButtonComponent } from 'src/app/button/button.component';

const readme = `
  # h1
  ## h2
 `;

storiesOf('button', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ButtonComponent],
    })
  )
  .addParameters({
    // component: ButtonComponent,
    componentSubtitle: 'subTitle',
    options: {},
    docs: {
      container: DocsContainer,
      page: DocsPage,
      iframeHeight: '50px',
    },

  })
  .add('default', () => {
    return {
      template: `<app-button [button]="name" [cls]="cls"></app-button>`,
      props: {
        name: '預設',
        cls: ''
      },
      // note: readme
    };
  })
  .add('warning', () => {
    return {
      template: `<app-button [button]="name" [cls]="cls"></app-button>`,
      props: {
        name: 'HEYEHY',
        cls: 'btn-warning'
      }
    };
  })
  .add('info', () => {
    return {
      template: `<app-button [button]="name" [cls]="cls"></app-button>`,
      props: {
        name: 'HEYEHY',
        cls: 'btn-info'
      }
    };
  })
