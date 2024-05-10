import { Component } from '@angular/core';
import { ConsultasPlanesService } from './consultas-planes.service' 
import { ConsultPlanesDtp } from './models/consultplanes-dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consultas-planes',
  templateUrl: './consultas-planes.component.html',
  styleUrls: ['./consultas-planes.component.scss']
})
export class ConsultasPlanesComponent {
  nombreplan: string = '';
  planesConsulta: ConsultPlanesDtp[] = [];

  constructor(private consultasPlanesService: ConsultasPlanesService,
    private toast : ToastrService) {}

  consultarPlanes() {

    if(this.nombreplan == ''){
      this.toast.error('Debe ingresar datos','Error!!');
      return;
    }
    this.consultasPlanesService.getAllClients(this.nombreplan).subscribe(data => {
      this.planesConsulta = data;
      console.log(this.consultarPlanes)
      if(this.planesConsulta.length > 0){
        this.toast.success('Busqueda Exitosa','OK!!' )
      }else{
        this.toast.warning('No se Encontro Datos','Advertencia!!' )
      }
    },
    err =>{
      console.log(err);
      this.toast.error('Error al Cargar los Datos','Error!!')
    }
    );
  }

}
