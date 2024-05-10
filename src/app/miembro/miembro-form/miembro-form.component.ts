import { Component, Inject, Input, OnInit } from '@angular/core';
import { MiembroService } from '../services/miembro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Miembro } from '../models/miembro';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-miembro-form',
  templateUrl: './miembro-form.component.html',
  styleUrls: ['./miembro-form.component.scss']
})
export class MiembroFormComponent implements OnInit{

  postmiembroform!: FormGroup; // Asegúrate de tener el nombre correcto para el FormGroup

  submitted = false;

  listdocuments:any[]=[];

  constructor(public miembroService: MiembroService, // Asegúrate de tener el servicio correcto inyectado
  public fb: FormBuilder,
  public documents: TipoDocumentoService,
  private dialogRef: MatDialogRef<MiembroFormComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Miembro,
  public toast : ToastrService
  ) {}

  ngOnInit(): void {

    console.log(this.data)
    this.postmiembroform = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [0, Validators.required],
      correoelectronico: ['', Validators.required],
      celular: ['', Validators.required],
      sexo: ['', Validators.required],
      tipodocumento: ['', Validators.required],
      nrodoc: [0, Validators.required],
      razonsocial: [''],
    });

    if(this.data){
console.log('.-----2----')
      this.postmiembroform.patchValue({
        nombre: this.data.nombre,
        apellido: this.data.apellido,
        edad: this.data.edad,
        correoelectronico: this.data.correoelectronico,
        celular: this.data.celular,
        sexo: this.data.sexo,
        tipodocumento: this.data.tipodocumento,
        nrodoc: this.data.nrodoc,
        razonsocial: this.data.razonsocial,
      });
    }
  this.getAllDocuments();
  }

  getAllDocuments():void{
    this.listdocuments=[];

    this.documents.getAll().subscribe(
      res=>{
        this.listdocuments = res;
      }
    )
  }


  createMiembro(): void {

    this.submitted = true;
    if (!this.data) {
      this.data = {}; // Inicializar this.data si no está definido
    }

    let data: any = {};

    if (this.data.miembroId === undefined) {
      data = {
        nombre: this.postmiembroform.value.nombre,
        apellido: this.postmiembroform.value.apellido,
        edad: this.postmiembroform.value.edad,
        sexo: this.postmiembroform.value.sexo,
        correoelectronico: this.postmiembroform.value.correoelectronico,
        celular: this.postmiembroform.value.celular,
        tipodoc: this.postmiembroform.value.tipodoc,
        nrodoc: this.postmiembroform.value.nrodoc,
        razonsocial: this.postmiembroform.value.razonsocial
      };
    } else {
      data = {
        miembroId: this.data.miembroId,
        nombre: this.postmiembroform.value.nombre,
        apellido: this.postmiembroform.value.apellido,
        edad: this.postmiembroform.value.edad,
        sexo: this.postmiembroform.value.sexo,
        correoelectronico: this.postmiembroform.value.correoelectronico,
        celular: this.postmiembroform.value.celular,
        tipodoc: this.postmiembroform.value.tipodoc,
        nrodoc: this.postmiembroform.value.nrodoc,
        razonsocial: this.postmiembroform.value.razonsocial
      };
    }

    if(this.data.miembroId== undefined){
      this.miembroService.create(data)
      .subscribe({
        next: (response) => {
        console.log(response);
        this.submitted = true;
        Swal.fire({
         title: 'Miembro Registrado!',
         text: 'El Miembro se ha registrado exitosamente.',
         icon: 'success'
       });

       this.dialogRef.close()
        },

        error:(error)  => {
        console.log(error);
        this.toast.error('Hubo un problema al crear Miembro','Error!')
        }
  })

    }else{
      this.miembroService.update(data).subscribe(
        resp =>{
          this.toast.success('Se actualizo Miembro','ok!')
          this.dialogRef.close()
        },
        err=>{
          console.log(err);
          this.toast.error('Hubo un problema al actualizar Miembro','Error!')
        }
      )

      }
    };

    close():void{
      this.dialogRef.close()
    }
 }


