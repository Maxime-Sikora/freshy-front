import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { User } from '../../../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserApi {
  private http = inject(HttpClient);

  async currentUser(): Promise<User> {
    return await firstValueFrom(this.http.get<User>(`${environment.apiBaseUrl}/user`));
  }
}
