import { computed, inject, Injectable } from '@angular/core';
import { AuthApi } from '../data/auth.api';
import { SigninFormDto } from '../models/auth.model';
import { UserStore } from '../../users/store/user.store';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private authApi = inject(AuthApi);
  private userStore = inject(UserStore);

  isAuthenticated = computed(() => !!this.userStore.user());

  async signin(signinForm: SigninFormDto): Promise<void> {
    await this.authApi.signin(signinForm);
    this.userStore.reload();
  }

  async signout(): Promise<void> {
    await this.authApi.signout();
    this.userStore.clear();
  }
}
