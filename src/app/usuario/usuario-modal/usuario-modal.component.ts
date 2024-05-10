import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UserDto } from '../model/user.dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.scss']
})
export class UsuarioModalComponent implements OnInit {


  userForm!: FormGroup; // Asegúrate de tener el nombre correcto para el FormGroup

  submitted = false;

  constructor(public serviceUser: UsuarioService, // Asegúrate de tener el servicio correcto inyectado
  public fb: FormBuilder,
  private dialogRef: MatDialogRef<UsuarioModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: UserDto,
  public serviceToast: ToastrService

  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['',Validators.required],
      passwordAgain: ['',Validators.required]
    });

    if(this.data){
            this.userForm.patchValue({
              nombre: this.data.nombre,
              apellido: this.data.apellido,
              email: this.data.email,
              username : this.data.username,
              password : '',
              passwordAgain : ''
            });
            this.userForm.get('username')?.disable();
          }
  }

  close():void{
    this.dialogRef.close()
  }

  updateUser(): void {
    this.submitted = true;
    const pass = this.userForm.value.password;
    const passAgain = this.userForm.value.passwordAgain;

    if (pass !== passAgain){
      this.serviceToast.warning('Password Ingresados no coinciden','Advertencia!!')
      return;
    }

    if(this.userForm.value.nombre == ''){
      this.serviceToast.warning('Debe Ingresar Nombre','Advertencia!');
      return;
    }

    if(this.userForm.value.apellido == ''){
      this.serviceToast.warning('Debe Ingresar Apellido','Advertencia!');
      return;
    }

    if(this.userForm.value.email == ''){
      this.serviceToast.warning('Debe Ingresar email','Advertencia!');
      return;
    }

    let info: any = {};

    if (this.data.usuarioId === undefined) {
      info = {
        nombre: this.userForm.value.nombre,
        apellido: this.userForm.value.apellido,
        email: this.userForm.value.email,
        username: this.userForm.value.username
      };
    } else {
      info = {
        usuarioId: this.data.usuarioId,
        nombre: this.userForm.value.nombre,
        apellido: this.userForm.value.apellido,
        email: this.userForm.value.email,
        username: this.userForm.value.username,
        password: this.userForm.value.password,
      };
    }

    if(this.data.usuarioId== undefined){
      this.serviceUser.create(info)
      .subscribe({
        next: (response) => {

        this.submitted = true;

         this.dialogRef.close()
        },

        error:(error)  => {
        console.log(error);

        }
  })

    }else{
      this.serviceUser.update(info).subscribe(
        resp =>{
          this.dialogRef.close()
        },
        err=>{
          console.log(err);

        }
      )

      }
    };

}
