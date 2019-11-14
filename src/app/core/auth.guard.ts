import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.auth.user.pipe(
           take(1),
           map(user => !!user),
           tap(loggedIn => {
             if (!loggedIn) {
               Swal.fire({
                 icon: 'error',
                 title: 'Acceso Denegado',
                 text: 'Debes iniciar sesión para acceder al contenido.',
                 type: 'error'
               });
               this.router.navigate(['/sesion']);
             }
         })
    )
  }

}
