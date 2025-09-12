import { computed, inject, Injectable, resource } from '@angular/core';
import { UserApi } from '../data/user.api';
import { User } from '../../../shared/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateUser } from '../models/createUser.model';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private userApi = inject(UserApi);

  currentUserResource = resource<User | null, HttpErrorResponse>({
    loader: async () => {
      try {
        return await this.userApi.currentUser();
      } catch (e) {
        if (e instanceof HttpErrorResponse && e.status === 401) {
          return null;
        }
        throw e;
      }
    },
  });

  user = computed(() => this.currentUserResource.value());
  isProducer = computed(() => this.user()?.role === 'producer');
  isAdmin = computed(() => this.user()?.role === 'admin');
  loading = computed(() => this.currentUserResource.isLoading());
  error = computed(() => this.currentUserResource.error());

  async createUser(user: CreateUser): Promise<User> {
    return await this.userApi.createUser(user);
  }

  reload() {
    this.currentUserResource.reload();
  }
  clear() {
    this.currentUserResource.reload();
  }
}
