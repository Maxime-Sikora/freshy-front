// core/interceptors/credentials.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environments';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  return req.url.startsWith(environment.apiBaseUrl)
    ? next(req.clone({ withCredentials: true }))
    : next(req);
};
