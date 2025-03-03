import {Component, DestroyRef, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from '../../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {NgClass} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-forget-password',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  step1ForgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
  });
  step2VerifyResetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required,Validators.pattern('[0-9]{5,6}')]),
  });
  step3UpdatePasswordForm: FormGroup = new FormGroup({
    email: new FormControl(this.step1ForgetPasswordForm.controls['email'].value, [Validators.required,Validators.email]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}')]),
  });

  private _authService=inject(AuthService);
  private router= inject(Router);
  private toastr:ToastrService= inject(ToastrService);
  private destroyRef:DestroyRef = inject(DestroyRef);
  step1ForgetPasswordShow:boolean=true;
  step2VerifyResetCodeShow:boolean=false;
  step3UpdatePasswordShow:boolean=false;

  step1ForgetPassword(spinner:HTMLButtonElement){
    if(this.step1ForgetPasswordForm.valid){
      spinner.disabled=true;
      this._authService.forgotPassword(this.step1ForgetPasswordForm.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
        next: (res) => {
          console.log(res);
        },
        error : err => {
          this.toastr.error('email doesn\'t exist! Please to register');
          spinner.disabled=false;

        },
        complete: () => {
          spinner.disabled=false;
          this.step1ForgetPasswordShow=false
          this.step2VerifyResetCodeShow=true;
          this.step3UpdatePasswordShow=false;
        }
      });

    }else {
      this.step1ForgetPasswordForm.markAllAsTouched()
    }

  }

  step2VerifyResetCode(spinner:HTMLButtonElement){
    console.log(this.step2VerifyResetCodeForm.controls['resetCode']);
    if(this.step2VerifyResetCodeForm.valid){
      spinner.disabled=true;
      this._authService.verifyResetCode(this.step2VerifyResetCodeForm.controls['resetCode'].value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error : err => {
          this.toastr.error(err.message);
          spinner.disabled=false;

        },
        complete: () => {
          spinner.disabled=false;
          this.step1ForgetPasswordShow=false
          this.step2VerifyResetCodeShow=false;
          this.step3UpdatePasswordShow=true;
          this.step2VerifyResetCodeForm.reset();

        }
      });

    }else {
      this.step2VerifyResetCodeForm.markAllAsTouched()
    }

  }

  step3UpdatePassword(spinner:HTMLButtonElement){
    if(this.step3UpdatePasswordForm.valid){
      spinner.disabled=true;
      this._authService.resetPassword(this.step3UpdatePasswordForm.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('userToken',res.token);
        },
        error : err => {
          this.toastr.error(err.message);
          spinner.disabled=false;
        },
        complete: () => {
          spinner.disabled=false;
          this.step1ForgetPasswordShow=false
          this.step2VerifyResetCodeShow=false;
          this.step3UpdatePasswordShow=false;
          this._authService.saveUser()
          this.router.navigate(['/home']);
          this.step3UpdatePasswordForm.reset();
        }
      });

    }else {
      this.step3UpdatePasswordForm.markAllAsTouched()
    }

  }

}
