import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { LoginModule } from './login/login.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from './services/Auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/Auth/error-interceptor.service';
import { NavComponent } from './shared/nav/nav.component';

import { HeaderComponent } from './shared/header/header.component';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { VentaMembresiaComponent } from './venta-membresia/venta-membresia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultasPlanesComponent } from './consultas-planes/consultas-planes.component';
import { ConsultasMiembrosComponent } from './consultas-miembros/consultas-miembros.component';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MiembroModule } from './miembro/miembro.module';
import { MatDialogModule } from '@angular/material/dialog';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioModule } from './usuario/usuario.module';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { IndexIntegComponent } from './index-integ/index-integ.component';
import { PlanMembresiaComponent } from './plan-membresia/plan-membresia.component';
import { PlanMembresiaModule } from './plan-membresia/plan-membresia.module';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MenuComponent,
    HeaderComponent,
    VentaMembresiaComponent,
    ConsultasPlanesComponent,
    ConsultasMiembrosComponent,
    ChatbotComponent,
    IndexIntegComponent,
    PlanMembresiaComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    MenubarModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(), // ToastrModule added
    BrowserAnimationsModule,
    MiembroModule,
    MatDialogModule,
    UsuarioModule,
    HttpClientModule,
    PlanMembresiaModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService,multi:true},
    provideToastr(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
