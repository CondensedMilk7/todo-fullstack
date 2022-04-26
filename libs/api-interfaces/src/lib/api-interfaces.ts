export interface TodoItem {
  id: number;
  description: string;
  done: boolean;
  userId?: number;
}

export interface DeleteItemResponse {
  message: string;
  itemId: number;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

export interface SigninResponse {
  access_token: string;
}

export interface SignupResponse {
  access_token: string;
}
