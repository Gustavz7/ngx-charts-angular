import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseChartComponent } from './components/base-chart/base-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { OptionsComponent } from './components/options/options.component';

import { FormsModule } from '@angular/forms';

//Modulo Angular Material - Todos los componentes
import { NgMaterialModule } from './ng-material/ng-material.module';
@NgModule({
  declarations: [
    AppComponent,
    BaseChartComponent,
    OptionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    FormsModule,
    NgMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
