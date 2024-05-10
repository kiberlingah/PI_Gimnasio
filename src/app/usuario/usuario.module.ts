import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioModalComponent } from './usuario-modal/usuario-modal.component';
import { MatCardModule } from '@angular/material/card';
import { UsuarioComponent } from './usuario.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsuarioModalComponent,
    UsuarioComponent,

  ],
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ],exports:[
    UsuarioModalComponent,
    UsuarioComponent
  ]
})
export class UsuarioModule { }
