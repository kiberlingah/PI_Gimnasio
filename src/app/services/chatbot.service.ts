import { Injectable } from '@angular/core';

// Interfaz para definir el tipo de las opciones del chat de Watson Assistant
interface WatsonAssistantChatOptions {
  integrationID: string;
  region: string;
  serviceInstanceID: string;
  onLoad: (instance: any) => Promise<void>;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  constructor() { }

  initializeChat() {
  
  }
}
