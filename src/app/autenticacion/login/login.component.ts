import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userdata: any;

  constructor(public authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.userdata = this.saveUserdata();
    this.authService.loginUsuario(this.userdata)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Sesión Iniciada',
          text: 'La sesión ha sido iniciada, disfruta de ComprasApp.',
          type: 'success'
        });
        this.router.navigateByUrl('/inicio');
      })
      .catch((error) => {
        this.authService.alertas(error);
      });
    this.resetFields();
  }

  saveUserdata() {
    const saveUserdata = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    return saveUserdata;
  }

  resetFields() {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6)]]
    });
  }

  iniciarSesionGoogle() {
    this.authService.googleSignin()
      .then(data => {
        Swal.fire({
          icon: 'success',
          title: 'Sesion Iniciada',
          text: 'Se ha iniciado la sesion correctamente, disfruta de ComprasApp.',
          type: 'success'
        }).then(() => {
          this.router.navigateByUrl('/inicio');
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: error.code,
          text: error.message,
          type: 'error'
        });
      });
  }

}
