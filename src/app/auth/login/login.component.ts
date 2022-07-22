import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  

  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: AuthService ,
    private router: Router  
  ) {this.loginForm = this.fb.group({})}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }

  loginUser() {
    if (this.loginForm.invalid) {return;}
    const {email, password} = this.loginForm.value;
    this.authService.loginUser(email, password)
        .then(success => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/'])
        })
        .catch( err =>  Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Datos incorrectos',
          })
        )
  }

}
