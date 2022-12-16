import { Component, OnInit } from '@angular/core';
import { ApiGetDataService } from 'src/app/services/api-get-data.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
})
export class OptionsComponent implements OnInit {
  constructor(private apiGetData: ApiGetDataService) {}

  AvalibleOptions: string[] = [];
  selectedOption: string = '';
  defaultValue: string = 'bitcoin';

  selectedDate: any;

  ngOnInit(): void {
    this.getAvalibleOptions();
    this.setCurrency();
  }

  setCurrency() {
    if (this.selectedOption == '') {
      this.selectedOption = this.defaultValue;
    }
    this.apiGetData.setCurrency(this.selectedOption);
  }

  private getAvalibleOptions() {
    this.apiGetData.getAllCurrencies().subscribe((response) => {
      let data: any[] = Object.values(response); //obtener los datos en un objeto manipulable
      for (let i = 3; i < data.length; i++) {
        //i=3 para saltar la info
        this.AvalibleOptions.push(data[i].codigo);
      }
    });
  }
}
