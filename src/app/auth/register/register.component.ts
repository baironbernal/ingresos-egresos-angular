import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService ,
              private router: Router  
    ) {this.registerForm = this.fb.group({})}

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  createUser() {
    if (this.registerForm.invalid) {return;}

    const { nombre,  correo, password} = this.registerForm.value;
    this.authService.createUser(nombre, correo, password)
        .then(credentials => {
          this.router.navigate(['/'])
          console.log(credentials)
        })
        .catch(err => console.error(err))
  }
}
