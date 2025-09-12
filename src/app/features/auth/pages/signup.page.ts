import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { passwordMatchValidator } from '../validators/password-match.validator';
import { CreateUser } from '../../users/models/createUser.model';
import { UserStore } from '../../users/store/user.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  template: `
    <section class="container">
      <mat-card class="auth-card">
        <mat-card-header>
          <mat-card-title>S'inscrire</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="signupForm" (submit)="submit()">
            <mat-form-field appearance="outline" class="full">
              <mat-label>Email</mat-label>
              <input
                matInput
                type="email"
                id="email"
                formControlName="email"
                placeholder="Saisir votre email"
              />
              @if (email.touched && email.hasError('email')) {
                <mat-error>Veuillez saisir un email valide</mat-error>
              } @else if (email.touched && email.hasError('required')) {
                <mat-error>L'email est requis</mat-error>
              }
            </mat-form-field>
            <mat-form-field appearance="outline" class="full">
              <mat-label>Mot de passe</mat-label>
              <input
                matInput
                type="password"
                id="password"
                formControlName="password"
                placeholder="Saisir votre mot de passe"
              />
              @if (password.touched && password.hasError('required')) {
                <mat-error>Le mot de passe est requis</mat-error>
              } @else if (password.touched && password.hasError('minlength')) {
                <mat-error>Le mot de passe doit faire 6 caractères minimum</mat-error>
              }
            </mat-form-field>
            <mat-form-field appearance="outline" class="full">
              <mat-label>Confirmer le mot de passe</mat-label>
              <input
                matInput
                type="password"
                id="ctrlPassword"
                formControlName="ctrlPassword"
                placeholder="Confirmer votre mot de passe"
              />
              @if (ctrlPassword.touched && ctrlPassword.hasError('required')) {
                <mat-error>La confirmation du mot de passe est requise</mat-error>
              }
              @if (ctrlPassword.touched && ctrlPassword.hasError('passwordMismatch')) {
                <mat-error>Les mots de passe doivent correspondre</mat-error>
              }
            </mat-form-field>
            <mat-form-field appearance="outline" class="full">
              <mat-label>Nom</mat-label>
              <input
                matInput
                type="text"
                id="lastName"
                formControlName="lastName"
                placeholder="Saisir votre nom"
              />
              @if (lastName.touched && lastName.hasError('required')) {
                <mat-error>Le nom est requis</mat-error>
              } @else if (lastName.touched && lastName.hasError('minlength')) {
                <mat-error>Le nom doit faire 3 caractères minimum</mat-error>
              }
            </mat-form-field>
            <mat-form-field appearance="outline" class="full">
              <mat-label>Prénom</mat-label>
              <input
                matInput
                type="text"
                id="firstName"
                formControlName="firstName"
                placeholder="Saisir votre prénom"
              />
              @if (firstName.touched && firstName.hasError('required')) {
                <mat-error>Le prénom est requis</mat-error>
              } @else if (firstName.touched && firstName.hasError('minlength')) {
                <mat-error>Le prénom doit faire 3 caractères minimum</mat-error>
              }
            </mat-form-field>

            <mat-slide-toggle
              labelPosition="before"
              [checked]="signupForm.value.role === 'producer'"
              (change)="signupForm.patchValue({ role: $event.checked ? 'producer' : 'customer' })"
            >
              Êtes vous un producteur ?
            </mat-slide-toggle>

            <mat-card-actions>
              <button mat-flat-button type="submit" [disabled]="signupForm.invalid">
                S'enregistrer
              </button>
            </mat-card-actions>
          </form>
        </mat-card-content>
      </mat-card>
    </section>
  `,
  styles: `
    .container {
      min-height: 100dvh;
      margin-top: -7dvh;
      display: grid;
      place-items: center;
    }
    form {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .auth-card {
      width: min(420px, 100%);
      padding: 30px 20px;
    }
    .full {
      width: 100%;
      display: block;
      margin-bottom: 10px;
    }
  `,
})
export class SignupPage {
  private fb = inject(FormBuilder);
  private userStore = inject(UserStore);
  private router = inject(Router);

  signupForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      ctrlPassword: ['', [Validators.required, Validators.minLength(6)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      role: ['customer'],
    },
    { validators: passwordMatchValidator('password', 'ctrlPassword') },
  );

  get email() {
    return this.signupForm.get('email') as FormControl;
  }

  get password() {
    return this.signupForm.get('password') as FormControl;
  }

  get ctrlPassword() {
    return this.signupForm.get('ctrlPassword') as FormControl;
  }

  get lastName() {
    return this.signupForm.get('lastName') as FormControl;
  }

  get firstName() {
    return this.signupForm.get('firstName') as FormControl;
  }

  async submit() {
    const signupForm = this.signupForm.getRawValue();
    const signupData: CreateUser = {
      email: signupForm.email as string,
      password: signupForm.password as string,
      lastName: signupForm.lastName as string,
      firstName: signupForm.firstName as string,
      role: signupForm.role as 'customer' | 'producer',
    };
    try {
      await this.userStore.createUser(signupData);
      this.router.navigateByUrl('/auth');
    } catch (error) {
      console.error(error);
    }
  }
}
