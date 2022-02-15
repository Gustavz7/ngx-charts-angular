import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiGetDataService } from 'src/app/services/api-get-data.service';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-base-chart',
  templateUrl: './base-chart.component.html',
  styleUrls: ['./base-chart.component.css'],
})
export class BaseChartComponent implements OnInit {
  constructor(private apiGetData: ApiGetDataService) {}

  ApiResponse = [];
  dolarData = [];
  bitcoinData = [];
  dates = [];
  dolarValues = [];
  selectedValue: string = 'dolar';

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.dolarValues,
        label: this.selectedValue,
        //backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: this.dolarValues,
        label: this.selectedValue,
        //backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'blue',
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
    this.apiGetData.getYearData(this.selectedValue).subscribe(
      (response) => {
        this.ApiResponse = Object.values(response);
        this.dolarData = this.ApiResponse[5];
        for (let i = 0; i < this.dolarData.length; i++) {
          this.dates.push(this.dolarData[i]['fecha']);
          this.dolarValues.push(this.dolarData[i]['valor']);
        }
        this.dates.reverse();
        this.dolarValues.reverse();
        this.chart?.update();
      },
      (error) => {
        (this.errorMessage = error), console.log(error);
      }
    );
  }
}
