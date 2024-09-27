import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {
  forgotform !: FormGroup;
  sendOTPform !: FormGroup;
  passwordform !: FormGroup;
  selectFile !: File;
  loading: boolean = false;
  validotp = false;
  issendOTP =false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(res : any): void {
    
    this.forgotform = this.fb.group({
      otp : ['', [Validators.required,Validators.min(4)],Validators.max(4)],
    });
    this.passwordform = this.fb.group({
      password : ['', [Validators.required,]],
    });
    this.sendOTPform = this.fb.group({
      email : ['', [Validators.required,Validators.email]],
    });

  }
  onsendOTPsubmit(){
    if (this.forgotform.valid) {
      this.loading = true;
      this.authService.sendOTP().subscribe({
        next : (resData : any)=>{
          Swal.fire({
            icon :'success',
            title: 'OTP sent!!!',
            text: resData.message,
          })
        }
      })
    }
    else {
      Object.values(this.forgotform.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  onsubmit(){

    if (this.forgotform.valid) {
      this.loading = true;
      this.authService.verifyOTP(this.forgotform.value).subscribe({
        next: (resdata: any) => {
          if (resdata.data) {
            this.validotp = true
          }
        },
        error: (res) => {
          this.loading = false;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.error.message,
          })
        }
      })
    }
    else {
      Object.values(this.forgotform.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
  onPasswordsubmit(){

    if (this.passwordform.valid) {
      this.loading = true;
      this.authService.update(this.passwordform.value , this.selectFile).subscribe({
        next: (resdata: any) => {
          if (resdata.data) {
            Swal.fire({
              icon : "success",
              title : "Password Changed",
              text : "Your Password is Changed"
            })
          }
        },
        error: (res) => {
          this.loading = false;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.error.message,
          })
        }
      })
    }
    else {
      Object.values(this.forgotform.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
