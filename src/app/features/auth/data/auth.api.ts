import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { SigninFormDto } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthApi {
  private http = inject(HttpClient);

  async signin(signinForm: SigninFormDto): Promise<void> {
    return await firstValueFrom(
      this.http.post<void>(`${environment.apiBaseUrl}/auth/signin`, signinForm),
    );
  }

  async signout() {
    await firstValueFrom(this.http.post<void>(`${environment.apiBaseUrl}/auth/logout`, {}));
  }
}
