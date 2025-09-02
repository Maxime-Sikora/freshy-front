import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { AccessToken } from '../models/auth.model';
import { SigninFormDto } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthApi {
  private http = inject(HttpClient);

  async signin(signinForm: SigninFormDto): Promise<AccessToken> {
    return await firstValueFrom(
      this.http.post<AccessToken>(`${environment.apiBaseUrl}/auth`, signinForm),
    );
  }
}
