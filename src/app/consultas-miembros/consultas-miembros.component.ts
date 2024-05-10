import { Component } from '@angular/core';
import { ConsultasMiembrosService } from './consultas-miembros.service';
import { ConsultMiembroDtp } from './models/consultmiembro-dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consultas-miembros',
  templateUrl: './consultas-miembros.component.html',
  styleUrls: ['./consultas-miembros.component.scss']
})
export class ConsultasMiembrosComponent {
  nroDocumento: string = '';
  miembrosConsulta: ConsultMiembroDtp[] = [];

  constructor(private consultasMiembrosService: ConsultasMiembrosService,
    private toast: ToastrService) { }

  consultarMiembro() {
    if(this.nroDocumento == ''){
      this.toast.error('Debe Ingresar Datos','Advertencia!!' );
      return;
    };
    this.consultasMiembrosService.getAllClients(this.nroDocumento).subscribe(data => {
      this.miembrosConsulta = data;
      if(this.miembrosConsulta.length > 0){
        this.toast.success('Busqueda Exitosa','OK!!' )
      }else{
        this.toast.warning('No se Encontro Datos','Advertencia!!' )
      }
      
    },
    err =>{
      this.toast.error('Error al cargar datos','Advertencia!!' )
    }
    
    );
  }
}
