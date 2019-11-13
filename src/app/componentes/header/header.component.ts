import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  correo: any = null;

  constructor(public auth: AuthService) {
    this.auth.user.forEach(element => {
      try {
        this.correo = element.email;
      } catch (e) {
        this.correo = null;
      }
    });
   }



}
