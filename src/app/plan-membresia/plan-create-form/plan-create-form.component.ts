import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanMembresiaService } from '../services/plan-membresia.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan-create-form',
  templateUrl: './plan-create-form.component.html',
  styleUrls: ['./plan-create-form.component.scss']
})
export class PlanCreateFormComponent implements OnInit{

  postplansform!: FormGroup;

  submitted = false; ///

  constructor(
  public planmembresiaService: PlanMembresiaService, // Asegúrate de tener el servicio correcto inyectado
  public fb: FormBuilder,
  private dialogRef: MatDialogRef<PlanCreateFormComponent>,
  public toast : ToastrService
  ) {}

  ngOnInit(): void {
    this.postplansform = this.fb.group({
      nombreplan: ['', [Validators.required, Validators.minLength(4)]],
      tiempo: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      precio: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      url_img: ['', [Validators.required, Validators.pattern(/^https:\/\//)]],
    })
  }



  createPlanes(): void {

    this.submitted = true;
    if(this.postplansform.invalid){
      this.toast.warning('Asegurese de completar correctamente lo solicitado en  el formulario','¡Advertencia!');
      return;
    }

    let data = {
      nombreplan: this.postplansform.value.nombreplan,
      tiempo: this.postplansform.value.tiempo,
      precio: this.postplansform.value.precio,
      url_img: this.postplansform.value.url_img,

    };
    this.planmembresiaService.create(data)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.submitted = true;
          Swal.fire({
            title: '¡Plan de Membresía Registrado!',
            text: 'El nuevo plan se ha registrado exitosamente.',
            icon: 'success'
          });
          this.dialogRef.close()
        },


        error: (error) => {

          console.log(error);
          this.toast.error('Hubo un problema al crear nuevo plan', '¡Error!')
        }
      })

  }



  closeModal():void{
    this.dialogRef.close()
  }

}
