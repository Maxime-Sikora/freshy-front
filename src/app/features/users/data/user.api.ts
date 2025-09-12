import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { User } from '../../../shared/models/user.model';
import { CreateUser } from '../models/createUser.model';

@Injectable({ providedIn: 'root' })
export class UserApi {
  private http = inject(HttpClient);

  async currentUser(): Promise<User> {
    return await firstValueFrom(this.http.get<User>(`${environment.apiBaseUrl}/user`));
  }

  async createUser(user: CreateUser): Promise<User> {
    return await firstValueFrom(this.http.post<User>(`${environment.apiBaseUrl}/user`, user));
  }
}
