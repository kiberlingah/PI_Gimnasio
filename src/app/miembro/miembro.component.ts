import { Component, OnInit } from '@angular/core';
import { Miembro } from './models/miembro';
import { MiembroService } from './services/miembro.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MiembroFormComponent } from './miembro-form/miembro-form.component';



@Component({
  selector: 'app-miembro',
  templateUrl: './miembro.component.html',
  styleUrls: ['./miembro.component.scss']
})
export class MiembroComponent implements OnInit {

  listmiembro: Miembro[] =[];
  currentIndex = -1;
  nombremiembro ='';

    submitted =false;

  constructor(private miembroService: MiembroService,
    private toast: ToastrService,
    public dialog: MatDialog
 ){}
  
  ngOnInit(): void {
    this.getList();
  }

  getList():void{

    this.listmiembro= [];
    this.miembroService.getAll()
    .subscribe({
      next: (miembro) => {
        this.listmiembro = miembro;
        console.log(miembro);
      },
      error: (error) => {
        console.log(error);
      }

    });
  }

  delete(Miembro: any) {
    console.log(Miembro)
    this.miembroService.delete(Miembro.miembroId).subscribe(res => {
            console.log(res);
            Swal.fire({
              title:'Atenccion !!',
              text: '¿Está seguro que desea eliminar el miembro?',
              showCloseButton: true,
              showCancelButton: true
            }).then((willDelete) => {
              console.log(willDelete);
              if (willDelete.value) {
                this.miembroService.delete(0).subscribe({
                  next: (response) => {
                    console.log(response);
                    Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success')
                    .then(() => {
                      this.getList();
                    });
                  },
                  error: () => {
                    Swal.fire('Error!', 'No se puedo borrar el proveedor', 'error');
                  }
                });
              }
          });
        },
        err =>{
          console.log(err)
          this.toast.error('Usuario ya se encuentra en una membresia','Error!');
        }
        
        );
};

openDialog(item?:Miembro): void {
  const dialogRef = this.dialog.open(MiembroFormComponent, {
    width: '1200px',
    data: item
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El diálogo fue cerrado');
    this.getList();
  });
}

}
