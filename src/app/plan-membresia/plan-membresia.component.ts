import { Planes } from './models/plan-membresia';
import { Component } from '@angular/core';
import { PlanMembresiaService } from '../plan-membresia/services/plan-membresia.service';
import Swal from 'sweetalert2';
import { PlanCreateFormComponent } from './plan-create-form/plan-create-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PlanUpdateFormComponent } from './plan-update-form/plan-update-form.component';

@Component({
  selector: 'app-plan-membresia',
  templateUrl: './plan-membresia.component.html',
  styleUrls: ['./plan-membresia.component.scss']
})
export class PlanMembresiaComponent {
  listplanes: Planes[] = [];
  currentIndex = -1;
  nombreplan = '';

  submitted = false;
  constructor(private planesService: PlanMembresiaService, public dialog: MatDialog, private toast:ToastrService) {

   }
  ngOnInit(): void {
    this.getAllData();
  }


  getAllData(): void {
    this.listplanes = [];
    this.planesService.readAll()
      .subscribe({
        next: (planes) => {
          this.listplanes = planes;
          console.log(planes);
        },
        error: (error) => {
          console.log(error);
        }
  });
  }




  confirmDelete(Planes: any) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Al pulsar el botón "Confirmar", la acción realizada no se podrá revertir.',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#edb200',
      cancelButtonColor: '#d33',
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(Planes);
      }
    });
  }

  delete(Planes: any) {
    console.log(Planes);
    this.planesService.delete(Planes.planesId).subscribe(res => {
      console.log(res);
      Swal.fire('¡Listo!', 'El plan de membresía se ha eliminado satisfactoriamente', 'success')
        .then(() => {
          this.getAllData();
        });
    }, error => {
      Swal.fire('¡Error!', 'No se pudo borrar el plan de membresía sellecionado', 'error');
    });
  }

  /*delete(Planes: any) {
    console.log(Planes)
    this.planesService.delete(Planes.planesId).subscribe(res => {
      console.log(res);
      Swal.fire({
        title: '¿Desea eliminar el plan de membresía seleccionado?',
        text: 'Al confirmar con OK, la acción realizada no se podrá revertir.',
        showCloseButton: true,
        showCancelButton: true
      }).then((result) => {
        console.log(result);
        if (result.isConfirmed) { // Verifica si el usuario confirmó la eliminación
          this.planesService.delete(0).subscribe({
            next: (response) => {
              console.log(response);
              Swal.fire('¡Ok!', 'Registro eliminado satisfactoriamente', 'success')
                .then(() => {
                  this.getAllData();
                });
            },
            error: () => {
              Swal.fire('¡Error!', 'No se pudo borrar el proveedor', 'error');
            }
          });
        } else {
          // El usuario canceló la eliminación, no es necesario hacer nada
        }
      });
    });
  }*/

  createModal(){
    const dialogRef = this.dialog.open(PlanCreateFormComponent, {
      width: '500px',
      height: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado');
      this.getAllData();
    });
  }


  updateModal(item?:Planes): void {
    const dialogRef = this.dialog.open(PlanUpdateFormComponent, {
      width: '500px',
      height: '800px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado');
      this.getAllData();
    });
  }




}
