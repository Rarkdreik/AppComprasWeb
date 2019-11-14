import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  correo: any = null;

  constructor(public auth: AuthService) {}

   isAuth() {
    return this.auth.isAuthenticated();
  }

}
