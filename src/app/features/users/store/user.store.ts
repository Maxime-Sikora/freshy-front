import { computed, effect, inject, Injectable, resource } from '@angular/core';
import { UserApi } from '../data/user.api';
import { AuthStore } from '../../auth/store/auth.store';
import { User } from '../../../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private userApi = inject(UserApi);
  private authStore = inject(AuthStore);

  currentUserResource = resource({
    loader: async (): Promise<User> => {
      return this.userApi.currentUser();
    },
  });

  user = computed(() => this.currentUserResource.value());
  loading = computed(() => this.currentUserResource.isLoading());
  error = computed(() => this.currentUserResource.error());
  isAuthenticated = computed(() => !!this.authStore.token());

  private logEffect = effect(() => {
    console.log(this.authStore.token());
    console.log(this.currentUserResource.value());
    console.log(this.currentUserResource.error());
  });
}
