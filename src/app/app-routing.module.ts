import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProveedoresComponent } from './proveedores/proveedores/proveedores.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AddproveeComponent } from './proveedores/addprovee/addprovee.component';
import { AddpresComponent } from './presupuestos/addpres/addpres.component';
import { PresupuestosComponent } from './presupuestos/presupuestos/presupuestos.component';
import { EditpresComponent } from './presupuestos/editpres/editpres.component';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { LoginComponent } from './autenticacion/login/login.component';

import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'proveedores', component: ProveedoresComponent, canActivate: [AuthGuard] },
  { path: 'presupuestos', component: PresupuestosComponent, canActivate: [AuthGuard] },
  { path: 'addprovee', component: AddproveeComponent, canActivate: [AuthGuard] },
  { path: 'addpres', component: AddpresComponent, canActivate: [AuthGuard] },
  // { path: 'editpres', component: EditpresComponent, canActivate: [AuthGuard] },
  { path: 'editpres/:id', component: EditpresComponent, canActivate: [AuthGuard] },
  { path: 'sesion', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
