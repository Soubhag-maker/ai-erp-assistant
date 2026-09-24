import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiChatService } from '../../services/ai-chat';
import { ChangeDetectorRef } from '@angular/core';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ai-chat.html',
  styleUrl: './ai-chat.css'
})
export class AiChatComponent {

  question = '';

  loading = false;

  messages: ChatMessage[] = [];

  constructor(
    private aiChatService: AiChatService,private cdr: ChangeDetectorRef
  ) {}

  sendMessage(): void {

    const text = this.question.trim();

    if (!text || this.loading) {
      return;
    }

    // Add user's message to the chat
    this.messages.push({
      role: 'user',
      content: text
    });

    // Clear input
    this.question = '';

    // Show loading message
    this.loading = true;

    // Call ASP.NET Core API
    this.aiChatService.sendMessage(text).subscribe({

      next: (response) => {

        this.messages.push({
          role: 'assistant',
          content: response.answer
        });

        this.loading = false;
        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('AI API Error:', error);

        this.messages.push({
          role: 'assistant',
          content: 'Sorry, I could not connect to the AI service.'
        });

        this.loading = false;
        this.cdr.detectChanges();
      }

    });
  }

  clearChat(): void {
    this.messages = [];
    this.question = '';
  }

  onEnter(event: Event): void {

    const keyboardEvent = event as KeyboardEvent;

    // Enter = send
    // Shift + Enter = new line
    if (!keyboardEvent.shiftKey) {

      event.preventDefault();

      this.sendMessage();
    }
  }
}