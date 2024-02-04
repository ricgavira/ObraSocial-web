import { Router, RouterOutlet } from '@angular/router';
import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ILogin } from '../../services/interfaces/ILogin';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, 
            MatInputModule, 
            MatFormFieldModule, 
            MatButtonModule,
            MatIconModule,
            NgOptimizedImage, 
            ReactiveFormsModule,
            RouterOutlet
          ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading = signal(false);

  constructor(private loginService: LoginService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      login: ['ricgavira@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]]
    });
  }

  onSubmit() {
    this.loading.set(true);
    if(this.loginForm.valid)
    {
      const payload: ILogin = this.loginForm.value;

      this.loginService.login(payload).subscribe({
        next: (response) => {
          if (response.token !== 'Login inválido!') {
            Swal.fire({
              title: 'Sucesso!',
              text: 'Login realizado com sucesso!',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            }).then(() => {
                localStorage.clear;
                localStorage.setItem('token', response.token);
                this.loginForm.reset();
                this.loading.set(false);
                this.router.navigate(['home']);
            });
          }
          else {
            Swal.fire({
              title: 'Erro!',
              text: response.token,
              icon: 'error',
              timer: 2000,
              showConfirmButton: false
            }).then(() => {
              this.loading.set(false);
            });
          }
        },
        error: (response) => {
          Swal.fire({
            title: 'Erro!',
            text: response.token,
            icon: 'error',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.loading.set(false);
          });
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}