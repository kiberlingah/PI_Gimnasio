import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanMembresiaService } from '../services/plan-membresia.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Planes } from '../models/plan-membresia';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan-update-form',
  templateUrl: './plan-update-form.component.html',
  styleUrls: ['./plan-update-form.component.scss']
})
export class PlanUpdateFormComponent {
  putplansform!: FormGroup; // Asegúrate de tener el nombre correcto para el FormGroup

  submitted = false;

  listdocuments: any[] = [];

  constructor(
    public planmembresiaService: PlanMembresiaService, // Asegúrate de tener el servicio correcto inyectado
    public fb: FormBuilder,
    private dialogRef: MatDialogRef<PlanUpdateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Planes,
    public toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.putplansform = this.fb.group({
      nombreplan: ['', [Validators.required, Validators.minLength(4)]],
      tiempo: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      precio: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      url_img: ['', [Validators.required, Validators.pattern(/^https:\/\//)]],
    });
    if (this.data) {
      this.putplansform.patchValue({

        nombreplan: this.data.nombreplan,
        tiempo: this.data.tiempo,
        precio: this.data.precio,
        url_img: this.data.url_img,


      });
    }
  }

  updatePlans(){
    this.submitted = true;
    if(this.putplansform.invalid){
      this.toast.warning('Asegurese de completar correctamente lo solicitado en  el formulario','¡Advertencia!');
      return;
    }

    let info: any = {};

      info = {
        planesId: this.data.planesId,
        nombreplan: this.putplansform.value.nombreplan,
        tiempo: this.putplansform.value.tiempo,
        precio: this.putplansform.value.precio,
        url_img: this.putplansform.value.url_img,
      };



    this.planmembresiaService.update(this.data.planesId || 0, info)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.submitted = true;
          Swal.fire({
            title: '¡Plan Actualizado!',
            text: 'El plan de membresía se ha actualizado exitosamente.',
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

  closeModal(): void {
    this.dialogRef.close()
  }
}
