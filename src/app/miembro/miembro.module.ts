import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiembroComponent } from './miembro.component';
import { MiembroFormComponent } from './miembro-form/miembro-form.component';
import { BarraComponent } from '../shared/barra/barra.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    MiembroComponent,
    MiembroFormComponent,
    BarraComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MiembroModule { }
