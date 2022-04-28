import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateItemRequest,
  DeleteItemResponse,
  GetItemsResponse,
  TodoItem,
  UpdateItemRequest,
} from '@todo/api-interfaces';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getItems() {
    return this.httpClient.get<GetItemsResponse>(this.baseUrl);
  }

  createItem(payload: CreateItemRequest) {
    return this.httpClient.post<TodoItem>(this.baseUrl, { ...payload });
  }

  updateItem(payload: UpdateItemRequest) {
    return this.httpClient.patch<TodoItem>(this.baseUrl, {
      ...payload,
    });
  }

  deleteItem(id: number) {
    return this.httpClient.delete<DeleteItemResponse>(`${this.baseUrl}/${id}`);
  }
}
