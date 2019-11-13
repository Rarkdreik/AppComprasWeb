import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }

  async registroUsuario (userdata) {
    // this.afAuth.auth.createUserWithEmailAndPassword(userdata.email, userdata.password).catch(error => {alert(error);})
    const credential = await this.afAuth.auth.createUserWithEmailAndPassword(userdata.email, userdata.password);
    return this.updateUserData(credential.user)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Cuenta Activada',
        text: 'La cuenta ya ha sido activada, disfruta de AppCompras.',
        type: 'success'
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

  async loginUsuario (userdata) {
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(userdata.email, userdata.password);
    return this.updateUserData(credential.user);
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    console.log(credential);

    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    return userRef.set(data, { merge: true });
  }

  signOut() {
    Swal.fire({
      title: '¿Está usted seguro?',
      text: "Esto no podrá ser revertido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar sesión!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Cerrada!',
          'Tu sesión ha sido cerrada.',
          'success'
        );
        this.afAuth.auth.signOut();
        this.router.navigate(['/sesion']);
      }
    });
  }

  alertas(error: any) {
    let titulo: string = '';
    let mensaje: string = '';
    console.log(error.code + '\n' + error.message);
    console.log(error);
    switch (error.code) {
      case 'auth/wrong-password':
        titulo = '¡Error en la contraseña!';
        mensaje = 'La contraseña introducida es invalida. Asegurate de escribirla correctamente.';
        break;
      case 'auth/user-not-found':
        titulo = '¡Error de autenticación!';
        mensaje = 'El correo introducido no está registrado.';
        break;
      case 'auth/invalid-email':
        titulo = '¡Error de correo!';
        mensaje = 'El correo introducido es invalido.';
        break;
      case 'auth/network-request-failed':
        titulo = '¡Error de red!';
        mensaje = 'No se ha podido conectar al servidor. Compruebe su conexión.';
        break;
      case 'auth/too-many-requests':
        titulo = '¡Error en el servidor!';
        mensaje = 'Se han hecho demasiadas peticiones al servidor, por favor espere unos minutos.';
        break;
      case 'auth/email-already-in-use':
        titulo = '¡Correo existente!';
        mensaje = 'El correo introducido ya existe, pruebe a iniciar sesión, o compruebe que no se ha equivocado.';
        break;
      case 'auth/weak-password':
        titulo = '¡Contraseña debil!';
        mensaje = 'La contraseña debe tener 6 caracteres o más.';
        break;
      case 'auth/user-disabled':
        titulo = '¡Cuenta deshabilitada!';
        mensaje = 'Porfavor contacta con el administrador para informarse, y hacer las preguntas necesarias.';
        break;
      default:
        titulo = error.code;
        mensaje = error.message;
        break;
    }
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje,
      type: 'error'
    });
  }

}
