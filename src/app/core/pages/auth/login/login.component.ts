import {Component, DestroyRef, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('test@test.ts', [Validators.required,Validators.email]),
    password: new FormControl('Password', [Validators.required, Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}')]),
  });

  private _authService=inject(AuthService);
  private router= inject(Router);
  private toastr:ToastrService= inject(ToastrService);
  private destroyRef:DestroyRef = inject(DestroyRef);

  login(spinner:HTMLButtonElement){
    if(this.loginForm.valid){
      spinner.disabled=true;
      this._authService.login(this.loginForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('userToken',res.token);
          this._authService.saveUser();
          this.router.navigate(['/home']);
          this.loginForm.reset();
        },
        error : err => {
            this.toastr.error('password or email doesn\'t exist!');
          spinner.disabled=false;

        },
        complete: () => {
          spinner.disabled=false;
        }
      });

    }else {
      this.loginForm.markAllAsTouched()
    }

  }

}
