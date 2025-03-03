import {Component, DestroyRef, inject} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';





@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  error!: string;
  registerForm: FormGroup = new FormGroup({
    name: new FormControl("null", Validators.required),
    email: new FormControl('mohammed@gmail.com', [Validators.required,Validators.email]),
    password: new FormControl('Password', [Validators.required, Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}')]),
    rePassword: new FormControl('Password', Validators.required),
      phone: new FormControl('01204270949', [Validators.required,Validators.pattern('01(2|0|5)[0-9]{8,8}')]),
  }, this.validateRePassword);

  private _authService=inject(AuthService);
  private router= inject(Router);
  // private toastrService= inject(ToastrService);
  private destroyRef:DestroyRef = inject(DestroyRef);


  register(spinner:HTMLButtonElement){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched()
    }else {
      spinner.disabled=true;
      this._authService.register(this.registerForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => {
          this.router.navigate(['/auth/login']);
          this.registerForm.reset();
        },
        error: (err) => {
          this.error = err.error.message;
          spinner.disabled=false;
        },
        complete: () => {
          spinner.disabled=false;
        }
      })
    }

  }

  validateRePassword(form: AbstractControl){
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;

    if (password !== rePassword){
      return {misMatch: true};
    }
    else {return null;}

  }
}
