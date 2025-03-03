import {afterNextRender, Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {FlowbiteService} from './shared/services/flowbite.service';
import {AuthService} from './core/services/auth.service';
import {NavbarComponent} from './core/layout/navbar/navbar.component';
import {FooterComponent} from './core/layout/footer/footer.component';
import {log} from 'node:util';
import {AuthNavComponent} from './core/layout/auth/auth-nav/auth-nav.component';
import {AuthFooterComponent} from './core/layout/auth/auth-footer/auth-footer.component';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    AuthNavComponent,
    AuthFooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'e-commerce';
  loggedIn:boolean =false;
  private _flowbiteService=inject(FlowbiteService);
  private _authService=inject(AuthService);


  ngOnInit(): void {
    this._flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
    this.checkIfUserLoggedIn();


  }

  checkIfUserLoggedIn(){
    this._authService.userData.subscribe({
      next: (res) => {
        this.loggedIn = !!res.id;
      }
    });
  }
}
