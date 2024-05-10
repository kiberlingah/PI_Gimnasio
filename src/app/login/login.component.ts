import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service'
import { Router } from '@angular/router';
import { LoginDto, LoginRequest } from './dto/login.dto';
import { LoginService } from '../services/Auth/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { SingupComponent } from './singup/singup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLoginOn:boolean=false;
  loginError:string="";
  loginForm=this.formBuilder.group({
    username:['',[Validators.required,Validators.email]],
    password: ['',Validators.required],
  })

  constructor(
    private formBuilder:FormBuilder,
    private router:Router, 
    private loginService: LoginService,
    private authService: AuthService,
    public dialog: MatDialog
    ) { 
    }

    ngOnInit(): void {
      this.loginService.currentUserLoginOn.subscribe(
        {
          next:(userLoginOn) => {
            this.userLoginOn=userLoginOn;
          }
        }
      )
    }

    get email(){
      return this.loginForm.controls.username;
    }
  
    get password()
    {
      return this.loginForm.controls.password;
    }
  
    login(){
      if(this.loginForm.valid){
        this.loginError="";
        this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
          next: (userData) => {
            console.log(userData);
          },
          error: (errorData) => {
            console.error(errorData);
            this.loginError=errorData;
          },
          complete: () => {
            console.info("Login completo");
            this.router.navigateByUrl('/menu');
            this.loginForm.reset();
          }
        })
  
      }
      else{
        this.loginForm.markAllAsTouched();
        alert("Error al ingresar los datos.");
      }
    }

    signup():void{
      const dialogRef = this.dialog.open(SingupComponent, {
        width: '400px',

      });

      
    
      dialogRef.afterClosed().subscribe(result => {
        console.log('El diálogo fue cerrado');

      });
    }
  

}
