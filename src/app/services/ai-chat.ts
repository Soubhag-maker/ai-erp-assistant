import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  answer: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiChatService {

  private apiUrl = 'http://localhost:5161/api/ai/chat';

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<ChatResponse> {
    const request: ChatRequest = {
      message: message
    };

    return this.http.post<ChatResponse>(
      this.apiUrl,
      request
    );
  }
}