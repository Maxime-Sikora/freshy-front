import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthApi } from '../data/auth.api';
import { SigninFormDto } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private authApi = inject(AuthApi);

  private readonly _token = signal<string | null>(null);
  token = this._token.asReadonly();
  isAuthenticated = computed(() => !!this._token());

  async signin(signinForm: SigninFormDto): Promise<void> {
    const { access_token } = await this.authApi.signin(signinForm);
    this._token.set(access_token);
    localStorage.setItem('access_token', access_token);
  }

  signout() {
    this._token.set(null);
    localStorage.removeItem('access_token');
  }
}
