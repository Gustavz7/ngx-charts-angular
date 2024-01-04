import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatGridListModule } from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatMomentDateModule,
  MatGridListModule,
  MatCardModule,
  MatRadioModule,
  MatDatepickerModule,
  MatIconModule,
  MatToolbarModule
];
@NgModule({
  declarations: [],
  imports: [CommonModule, materialModules],
  exports: [materialModules],
})
export class NgMaterialModule {}