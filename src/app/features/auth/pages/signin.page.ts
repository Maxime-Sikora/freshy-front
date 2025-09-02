import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SigninFormDto } from '../models/auth.model';
import { AuthStore } from '../store/auth.store';

@Component({
  selector: 'app-signin',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
  ],
  template: `
    <section class="container">
      <mat-card class="auth-card">
        <mat-card-header class="flex justify-content-center">
          <mat-card-title>Se connecter</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="signinForm" (submit)="submit()">
            <mat-form-field appearance="outline" class="full">
              <mat-label>Email</mat-label>
              <input
                matInput
                placeholder="Saisir votre Email"
                formControlName="email"
                type="email"
                id="email"
              />
            </mat-form-field>
            <mat-form-field appearance="outline" class="full">
              <mat-label>Mot de passe</mat-label>
              <input
                matInput
                placeholder="Saisir le mot de passe"
                formControlName="password"
                type="password"
                id="password"
              />
            </mat-form-field>
            <mat-card-actions class="full">
              <button mat-flat-button class="btn-pill btn-lg full">Connexion</button>
            </mat-card-actions>
          </form>
        </mat-card-content>
        <mat-card-footer class="flex justify-content-center">
          <mat-card-content class="full">
            <p>Pas de compte ?</p>
            <mat-card-actions>
              <button routerLink="/auth/signup" mat-flat-button class="btn-pill btn-lg full">
                Inscription
              </button>
            </mat-card-actions>
          </mat-card-content>
        </mat-card-footer>
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
    }
    .btn-pill {
      border-radius: 9999px;
      font-weight: 600;
      padding-inline: 20px;
    }
    .btn-lg {
      height: 46px;
      font-size: 0.95rem;
    }
  `,
})
export class SigninPage {
  readonly fb = inject(FormBuilder);
  readonly authStore = inject(AuthStore);
  readonly router = inject(Router);

  signinForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async submit() {
    const signinForm = this.signinForm.getRawValue() as SigninFormDto;
    try {
      await this.authStore.signin(signinForm);
      this.router.navigateByUrl('/users/profil');
    } catch (e) {
      console.error(e);
    }
  }
}
