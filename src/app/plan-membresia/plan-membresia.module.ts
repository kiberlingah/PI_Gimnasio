import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanCreateFormComponent } from './plan-create-form/plan-create-form.component';
import { PlanUpdateFormComponent } from './plan-update-form/plan-update-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PlanCreateFormComponent,
    PlanUpdateFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PlanMembresiaModule { }
