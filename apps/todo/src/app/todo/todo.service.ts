import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeleteItemResponse, TodoItem } from '@todo/api-interfaces';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TodoService {
  baseUrl = environment.baseUrl;
  authUrl = environment.authUrl;

  constructor(private httpClient: HttpClient) {}

  getItems() {
    // const headers = new HttpHeaders();
    // headers.set(
    //   'Authorization',
    //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiTnVnemFyIiwiaWF0IjoxNjUwODk4ODU3LCJleHAiOjE2NTA5ODUyNTd9.qSRjQYicCt7mwjO6wIr7tPItUV8KliqOYHe3Kf4-Wxc'
    // );
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
