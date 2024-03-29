import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseChartComponent } from './components/base-chart/base-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { OptionsComponent } from './components/options/options.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Modulo Angular Material - Todos los componentes
import { NgMaterialModule } from './ng-material/ng-material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CurrentValueComponent } from './components/current-value/current-value.component';
@NgModule({
  declarations: [
    AppComponent,
    BaseChartComponent,
    OptionsComponent,
    NavbarComponent,
    CurrentValueComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    NgMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
