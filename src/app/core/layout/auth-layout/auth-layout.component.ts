import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {AuthNavComponent} from "../auth/auth-nav/auth-nav.component";
import {AuthFooterComponent} from "../auth/auth-footer/auth-footer.component";

@Component({
  selector: 'app-auth-layout',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
