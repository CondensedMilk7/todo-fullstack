export interface TodoItem {
  id: number;
  description: string;
  done: boolean;
  userId?: number;
}

export interface GetItemsResponse {
  data: TodoItem[];
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

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
}

export interface DecodedToken {
  userId: number;
  username: string;
  iat: number;
  exp: number;
}

export interface CreateItemRequest {
  description: string;
  done?: boolean;
}

export interface UpdateItemRequest {
  id: number;
  description?: string;
  done?: boolean;
}
