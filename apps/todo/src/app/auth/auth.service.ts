import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SigninResponse, SignupResponse } from '@todo/api-interfaces';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authUrl = environment.authUrl;

  constructor(private httpClient: HttpClient) {}

  signup(credentials: { username: string; email: string; password: string }) {
    return this.httpClient.post<SignupResponse>(
      `${this.authUrl}/signup`,
      credentials
    );
  }

  signin(credentials: { email: string; password: string }) {
    return this.httpClient.post<SigninResponse>(
      `${this.authUrl}/signin`,
      credentials
    );
  }
}
