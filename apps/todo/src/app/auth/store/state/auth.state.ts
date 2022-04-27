export interface AuthState {
  authenticated: boolean;
  error: string;
  loading: boolean;
  user: {
    username: string;
    id: number;
  };
  token: {
    iat: number;
    exp: number;
  };
}
