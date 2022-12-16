import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiGetDataService } from 'src/app/services/api-get-data.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-base-chart',
  templateUrl: './base-chart.component.html',
  styleUrls: ['./base-chart.component.css'],
})
export class BaseChartComponent implements OnInit {
  dates: any[] = [];
  values: any[] = [];
  selectedValue: string = '';
  constructor(private apiGetData: ApiGetDataService) {}

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.values,
        label: this.selectedValue,
        //backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: this.dates,
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.5,
      },
      bar: {},
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0': {
        position: 'left',
      },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },

    //pediente instalar annotation plugin de chart.js
    plugins: {
      legend: { display: true },
    },
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  errorMessage = [];

  ngOnInit(): void {
    this.apiGetData.currentCurrency.subscribe((msg) => {
      this.selectedValue = msg;
      this.getCurrencyValues();
    });
  }
  public forceChartUpdate(){
    this.lineChartData.datasets[0].data = this.values;
    this.lineChartData.labels = this.dates;
    this.chart?.update();

    //myChart.config.data.datasets[0].data
  }

  //Obtiene los valores de la moneda seleccionada y pinta los datos en el grafico
  public getCurrencyValues() {
    if (this.selectedValue != '') {
      this.apiGetData.getData(this.selectedValue).subscribe(
        (response) => {
          let ApiResponse: any[] = [], currencyValues: any[] = [], d = new Date();
          ApiResponse = Object.values(response);
          currencyValues = ApiResponse[5];
          let dAux: string[] = [];
          let vAux: string[] = [];// -> no funciona, no se pinta el chart
          this.dates = dAux;
          this.values = vAux;
          for (let i = 0; i < currencyValues.length; i++) {
            d = new Date(currencyValues[i]['fecha']);
            this.dates.push(`${d.getDate().toString()}/${d.getMonth().toString()}`);
            this.values.push(`${currencyValues[i]['valor']}`);
          }
          this.dates.reverse();
          this.values.reverse();
          
          this.forceChartUpdate();
        },
        (error) => {
          (this.errorMessage = error), console.log(error);
        }
      );
    }
  }
}
