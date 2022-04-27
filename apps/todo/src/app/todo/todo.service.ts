import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeleteItemResponse, TodoItem } from '@todo/api-interfaces';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getItems() {
    return this.httpClient.get<TodoItem[]>(this.baseUrl);
  }

  createItem(description: string, done?: boolean) {
    return this.httpClient.post<TodoItem>(this.baseUrl, { description, done });
  }

  updateItem(id: number, description?: string, done?: boolean) {
    return this.httpClient.patch<TodoItem>(this.baseUrl, {
      id,
      description,
      done,
    });
  }

  deleteItem(id: number) {
    return this.httpClient.delete<DeleteItemResponse>(`${this.baseUrl}/${id}`);
  }
}
