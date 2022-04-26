import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  authUrl = environment.authUrl;

  constructor(private httpClient: HttpClient) {}

  signup(credentials: { username: string; email: string; password: string }) {
    return this.httpClient.post(`${this.authUrl}/signup`, credentials);
  }

  signin(credentials: { email: string; password: string }) {}
}
