import { Component, OnInit } from '@angular/core';
import { UserDto } from './model/user.dto';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';
import { UsuarioModalComponent } from './usuario-modal/usuario-modal.component';
import { SingupComponent } from '../login/singup/singup.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {


  listUser: UserDto[] =[];
  submitted =false;

  constructor(private serviceUser: UsuarioService,
    public dialog: MatDialog
 ){}

  ngOnInit(): void {
    this.getList();
  }

  getList():void{

    this.listUser= [];
    this.serviceUser.getAll()
    .subscribe({
      next: (res) => {
        this.listUser = res;
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      }

    });
  }

  openDialog(item?:UserDto): void {
    const dialogRef = this.dialog.open(UsuarioModalComponent, {
      width: '480px',
      height: '800px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado');
      this.getList();
    });
  }

  delete(UserDto: any) {

    this.serviceUser.delete(UserDto.usuarioId).subscribe(res => {
            console.log(res);
            Swal.fire({
              title:'Atenccion !!',
              text: '¿Está seguro que desea eliminar el usuario?',
              showCloseButton: true,
              showCancelButton: true
            }).then((willDelete) => {
              console.log(willDelete);
              if (willDelete.value) {
                this.serviceUser.delete(0).subscribe({
                  next: (response) => {
                    console.log(response);
                    Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success')
                    .then(() => {
                      this.getList();
                    });
                  },
                  error: () => {
                    Swal.fire('Error!', 'No se puedo borrar el usuario', 'error');
                  }
                });
              }
          });
        },
        err =>{
          console.log(err)

        }

        );
};


create(){
    const dialogRef = this.dialog.open(SingupComponent, {
      width: '480px',
      height: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado');
      this.getList();
    });
  }
}
