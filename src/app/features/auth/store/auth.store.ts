import { inject, Injectable, signal } from '@angular/core';
import { AuthApi } from '../data/auth.api';
import { SigninFormDto } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private authApi = inject(AuthApi);

  token = signal<string | null>(localStorage.getItem('access_token'));

  async signin(signinForm: SigninFormDto): Promise<void> {
    const { access_token } = await this.authApi.signin(signinForm);
    this.token.set(access_token);
    localStorage.setItem('access_token', access_token);
  }
}
