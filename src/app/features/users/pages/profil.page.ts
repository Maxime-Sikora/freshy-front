import { Component, computed, inject } from '@angular/core';
import { UserStore } from '../store/user.store';

@Component({
  selector: 'app-profil',
  imports: [],
  template: `
    @if (user()) {
      <p>Le profil de :</p>
      <p>{{ user()?.firstName }}</p>
    } @else {
      <p>{{ error() }}</p>
    }
  `,
  styles: ``,
})
export class ProfilPage {
  private userStore = inject(UserStore);

  user = computed(() => this.userStore.user());
  error = computed(() => this.userStore.error());
  loading = computed(() => this.userStore.loading());
}
