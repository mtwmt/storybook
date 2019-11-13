import { storiesOf, moduleMetadata } from '@storybook/angular';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { BarChartComponent } from 'src/app/bar-chart/bar-chart.component';
import { AgGridModule } from '@ag-grid-community/angular';
import { AllCommunityModules } from '@ag-grid-community/all-modules';


const temp = `
<ag-grid-angular
    style="width: 500px; height: 500px;"
    class="ag-theme-balham"
    [rowData]="rowData"
    [columnDefs]="columnDefs"
    [modules]="modules">
</ag-grid-angular>
`;

const columnDefs = [
  { headerName: 'Make', field: 'make' },
  { headerName: 'Model', field: 'model' },
  {
    headerName: 'Price', field: 'price', cellRenderer: function (params){
      return `<div>7777</div>`;
  }}
];

const rowData = [
  { make: 'Toyota', model: 'Celica', price: 35000 },
  { make: 'Ford', model: 'Mondeo', price: 32000 },
  { make: 'Porsche', model: 'Boxter', price: 72000 }
];


const modules = AllCommunityModules;

storiesOf('agGrid', module)
  .addDecorator(
    moduleMetadata({
      imports: [AgGridModule.withComponents([])]
    })
  )
  .add('default', () => ({
    template: temp,
    props: {
      rowData,
      columnDefs,
      modules
    },
  }),
  )
