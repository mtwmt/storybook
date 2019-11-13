import { storiesOf, moduleMetadata } from '@storybook/angular';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { BarChartComponent } from 'src/app/bar-chart/bar-chart.component';


const dataArr = [
  { id: 'North', value: '53245' },
  { id: 'South', value: '28479' },
  { id: 'East', value: '29697' },
  { id: 'West', value: '34037' },
  { id: 'Central', value: '40245' }
];
const temp = `<app-bar-chart [dataSource]='data'></app-bar-chart>`;

const note = `
  # 長條圖

  ### html
  \`\`\`html
    ${temp}
  \`\`\`

  ---

  ### 參數

  Input | Type | Value
  ---|---|---
  dataSource | array | { id: string, value: string }

`

storiesOf('BarChart', module)
  .addDecorator(
    moduleMetadata({
      declarations: [BarChartComponent],
    })
  )
  .addParameters({
    component: BarChartComponent,
    docs: {
      container: DocsContainer,
      page: DocsPage,
    },
  })
  .add('default', () => ({
    template: temp,
    props: {
      data: dataArr
    }
  }),
  { notes: {markdown: note} }
  )
