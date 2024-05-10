

import { formatDate, getLocaleDateFormat } from '@angular/common';
import { VentaMembresiaService } from './venta-membresia.service';
import { Component, OnInit ,LOCALE_ID, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-venta-membresia',
  templateUrl: './venta-membresia.component.html',
  styleUrls: ['./venta-membresia.component.scss'],
  //providers: [{ provide: LOCALE_ID, useValue: 'es-PE' }]
})



//export class VentaMembresiaComponent {}
export class VentaMembresiaComponent implements OnInit {

  ventamForm!: FormGroup;
  planes: any;
  miembros:any;
  nroDocumento: string ='';
  today = moment().format('YYYY-MM-DD');
  submitted = false;
  planSeleccionado: any;

  //
  // Define una función de validación personalizada

  fechaInicioValid = false;
  fechaInicioInvalid = false;


  constructor(
    public fb: FormBuilder,
    public ventaMembresiaService: VentaMembresiaService,
    public serviceToast: ToastrService
    //
  ){


  }



  // Ejemplo de formateo de fecha

  ngOnInit(): void {
    const fechaInicioValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
      const fechaInicio = new Date(control.value);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1); // Obtén la fecha de mañana

      if (fechaInicio < tomorrow) {
        return { 'invalidStartDate': true }; // Devuelve un error si la fecha de inicio es anterior a mañana
      }

      return null; // La fecha es válida
    };
    this.ventamForm = this.fb.group({
      fechaInicio: [this.today, [Validators.required, fechaInicioValidator]],
      fechaVencimiento: [this.today, Validators.required],
      miembroId: ['', Validators.required],
      //planesId: ['', Validators.required],
      planesId: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]),
      usuarioId: ['', Validators.required],
      monto: ['', Validators.required],
      metodoPago: [0, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      nroDocumento: ['', Validators.required],
      duracionPlan: ['', Validators.required],
      nombreM:['', Validators.required],
      apellidoM: ['', Validators.required],


    }


    );
    console.log(this.nroDocumento)

    this.ventaMembresiaService.getAllPlanes().subscribe(resp => {
      this.planes= resp;
    },

    )

  }


  buscarMiembro() {


    // Realiza la lógica para buscar el documento en la base de datos

    console.log('Buscando miembro...');
    const nroDocumento = this.ventamForm.get('nroDocumento')?.value;

    this.ventaMembresiaService.getAllMiembros(nroDocumento).subscribe(resp => {
      console.log('Datos del miembro:', resp);

      if (resp && resp.length > 0) {
        const primerMiembro = resp[0];

        this.ventamForm.patchValue({
          miembroId: primerMiembro.miembroId,
          nombreM: primerMiembro.nombre,
          apellidoM: primerMiembro.apellido
        });
        this.ventamForm.get('nombreM')?.disable();
        this.ventamForm.get('apellidoM')?.disable();

      } else {
        //this.ventamForm.get('nroDocumento')?.setErrors({ documentoNoEncontrado: true });
        this.serviceToast.error('No se han encontraron datos para el "Número de Documento" proporcionado.','¡Error!')
      }
    });
  }






  onValorChange(idPlan: any): void{
    if(idPlan){
      const planSeleccionado = this.planes.find((plan:{ planesId : Number}) => plan.planesId == idPlan);
    this.ventamForm.patchValue({
      monto: planSeleccionado.precio,
      duracionPlan: planSeleccionado.tiempo
    });
      this.ventamForm.get('duracionPlan')?.disable();
    }
  }

  /*onFechaInicioChange(): void {
    const fechaInicio = this.ventamForm.get('fechaInicio')?.value;
    const duracionPlan = this.ventamForm.get('duracionPlan')?.value;

    if (fechaInicio && duracionPlan) {
      const fechaInicioObj = new Date(fechaInicio);
      fechaInicioObj.setDate(fechaInicioObj.getDate() + duracionPlan); // Sumar la duración del plan en días

      // Formatear la fecha de vencimiento en el formato 'yyyy-MM-dd' para asignarla al formulario
      const fechaVencimiento = fechaInicioObj.toISOString().split('T')[0];

      this.ventamForm.patchValue({
        fechaVencimiento: fechaVencimiento
      });
      this.ventamForm.get('fechaVencimiento')?.disable();
    }
  }*/
  onFechaInicioChange(): void {
    const fechaInicio = this.ventamForm.get('fechaInicio')?.value;
    const duracionPlan = this.ventamForm.get('duracionPlan')?.value;
    this.ventamForm.get('fechaInicio')?.setErrors({ 'invalidStartDate': false });


    if (fechaInicio) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Setear horas a 00:00:00

      const fechaInicioObj = new Date(`${fechaInicio}T00:00:00`);
      fechaInicioObj.setHours(0, 0, 0, 0); // Setear horas a 00:00:00


      if (fechaInicioObj > today) {
        // Fecha de inicio válida
        if(duracionPlan){
          this.ventamForm.get('fechaInicio')?.setErrors(null);

          // Calcular la fecha de vencimiento
          const fechaVencimientoObj = new Date(fechaInicioObj);
          fechaVencimientoObj.setDate(fechaVencimientoObj.getDate() + duracionPlan); // Sumar la duración del plan en días

          // Formatear la fecha de vencimiento en el formato 'yyyy-MM-dd' para asignarla al formulario
          const fechaVencimiento = fechaVencimientoObj.toISOString().split('T')[0];

          this.ventamForm.patchValue({
            fechaVencimiento: fechaVencimiento
          });
        }

        // Establecer clases CSS para validación del campo de fecha de inicio
        this.fechaInicioValid = true;
        this.fechaInicioInvalid = false;
      } else {
        // Fecha de inicio inválida, establecer error

        this.ventamForm.get('fechaInicio')?.setErrors({ 'invalidStartDate': true });
        // Establecer clases CSS para validación del campo de fecha de inicio
        this.fechaInicioValid = false;
        this.fechaInicioInvalid = true;
      }
    }
  }

  guardarVenta(): void {
    this.submitted = true;
    this.onFechaInicioChange();

    if(this.ventamForm.invalid){
      this.serviceToast.warning('Asegurese que que todos los datos sean completados correctamente','¡Advertencia!');
      return;
    }

    if (this.ventamForm.value.planesId == '') {
      this.ventamForm.get('planesId')?.markAsTouched();
      return;
    }

    const Body = {
      fechaInicio: this.ventamForm.value.fechaInicio,
      fechaVencimiento: this.ventamForm.value.fechaVencimiento,
      estado: 1,
      miembros: {
        miembroId: this.ventamForm.value.miembroId
      },
      planes: {
        planesId: this.ventamForm.value.planesId
      },
      usuarios: {
        usuarioId: this.ventamForm.value.usuarioId
      },
      pagos: [
        {
          fechaPago: this.today,
          monto:this.ventamForm.value.monto,
          metodoPago: this.ventamForm.value.metodoPago
        }
      ]
    };

    this.ventaMembresiaService.crearVentaMembresia(Body).subscribe(resp => {
      //this.serviceToast.success('Registro Exitoso!!','OK!!');
        Swal.fire({
          title: '¡Membresía registrada!',
          text: 'La membresía se ha registrado exitosamente.',
          icon: 'success'
        }).then(() => {
          window.location.reload(); // Recargar la página después de cerrar el Swal
        })
        ;
      //this.ventamForm.reset();
    },
    error => {
      console.error(error)
      //this.serviceToast.success('Registro Exitoso!!','OK!!');
      Swal.fire({
        title: '¡Membresía registrada!',
        text: 'La membresía se ha registrado exitosamente.',
        icon: 'success'
      }).then(() => {
        window.location.reload(); // Recargar la página después de cerrar el Swal
      })
      ;

      //this.ventamForm.reset();
    });

    // Establecer clases CSS para validación del campo de fecha de inicio
    this.fechaInicioValid = false;
    this.fechaInicioInvalid = false;
  }


  /*guardarVenta():void{
    this.submitted = true;

    if(this.ventamForm.invalid){
      this.serviceToast.warning('Asegurese que que todos los datos sean completados correctamente','¡Advertencia!');
      return;
    }

    if (this.ventamForm.value.planesId == '') {
      this.ventamForm.get('planesId')?.markAsTouched();
      return;
    }

    const Body = {

      fechaInicio: this.ventamForm.value.fechaInicio,
      fechaVencimiento: this.ventamForm.value.fechaVencimiento,
      estado: 1,
      miembros: {
        miembroId: this.ventamForm.value.miembroId
      },
      planes: {
        planesId: this.ventamForm.value.planesId
      },
      usuarios: {
        usuarioId: this.ventamForm.value.usuarioId
      },
      pagos: [
        {
          fechaPago: this.today,
          monto:this.ventamForm.value.monto,
          metodoPago: this.ventamForm.value.metodoPago
        }
      ]

    };
    console.log(Body)
    this.ventaMembresiaService.crearVentaMembresia(Body).subscribe(resp=>{
      //this.serviceToast.success('Registro Exitoso!!','OK!!');
      this.ventamForm.reset();
    },
    error => {
      console.error(error)
      //this.serviceToast.success('Registro Exitoso!!','OK!!');
      this.ventamForm.reset();
    }
    )
  }*/


}

