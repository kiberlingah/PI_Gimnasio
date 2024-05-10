import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { MiembroComponent } from './miembro/miembro.component';
import { VentaMembresiaComponent } from './venta-membresia/venta-membresia.component';
import { ConsultasMiembrosComponent } from './consultas-miembros/consultas-miembros.component';
import { ConsultasPlanesComponent } from './consultas-planes/consultas-planes.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { IndexIntegComponent } from './index-integ/index-integ.component';
import { PlanMembresiaComponent } from './plan-membresia/plan-membresia.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige a la página de inicio de sesión por defecto
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent ,canActivate: [AuthGuardService]},
  { path: 'miembro', component: MiembroComponent ,canActivate: [AuthGuardService]},
  { path: 'venta-membresia', component: VentaMembresiaComponent ,canActivate: [AuthGuardService]},
  { path: 'consulta-m', component: ConsultasMiembrosComponent ,canActivate: [AuthGuardService]},
  { path: 'consulta-p', component: ConsultasPlanesComponent ,canActivate: [AuthGuardService]},
  { path: 'planesmembresia', component: PlanMembresiaComponent,canActivate: [AuthGuardService]},
  { path: 'usuarios', component: UsuarioComponent,canActivate: [AuthGuardService]},
  { path: 'index', component: IndexIntegComponent},
  { path: '', component: ChatbotComponent,canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
