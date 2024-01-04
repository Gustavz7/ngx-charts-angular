import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiGetDataService } from 'src/app/services/api-get-data.service';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
// tslint:disable-next-line:no-duplicate-imports

const moment = _moment;
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
}
  @Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class OptionsComponent implements OnInit {
  

  AvalibleOptions: any[] = [];
  selectedOption: string = '';
  defaultValue: string = 'bitcoin';
//este es el formulario ligado al datepicker a travez de formControl
  dateForm:FormControl = new FormControl(moment());
  
  selectedDate: any;
  events: string[] = [];
  constructor(private apiGetData: ApiGetDataService) {
    //desde el inicio dejamos suscrito para que se actualice el valor selectedDate
    this.dateForm.valueChanges.subscribe((value) => {
      this.selectedDate = value.format("DD-MM-YYYY").toString()
      this.refrescarFecha(this.selectedDate);
    })
  }
  refrescarFecha(d:string):void{

  }

  buscarValorPorFecha(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  ngOnInit(): void {
    this.getAvalibleOptions();
    this.setCurrency();
    console.log(this.selectedDate)
  }
  onDateChange(e) {
    // User picked a date from calendar
    console.log(e.value); 
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
        let obj = {"nombre":data[i].nombre, "clave":data[i].codigo};
        this.AvalibleOptions.push(obj);
      }
    });
  }
}
