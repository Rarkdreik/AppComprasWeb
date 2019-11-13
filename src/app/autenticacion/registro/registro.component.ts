import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  userdata: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.userdata = this.saveUserdata();
    this.authService.registroUsuario(this.userdata)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Cuenta Activada',
        text: 'La cuenta ya ha sido activada, disfruta de AppCompras.',
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
      email: this.registroForm.get('email').value,
      password: this.registroForm.get('password').value,
    };
    return saveUserdata;
  }

  resetFields() {
    this.registroForm = this.formBuilder.group({
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
          text: 'Se ha iniciado la sesion correctamente, disfruta de AppCompras.',
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
