  import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { LoginService } from '../services/Auth/login.service';
import { Router } from '@angular/router';

  declare global {
    interface Window {
      watsonAssistantChatOptions: any;
    }
  }

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent { /*implements OnInit {

  /*userLoginOn:boolean=false;
  constructor(private loginService:LoginService, private router:Router) { }
  ngOnInit(): void {

    this.loginService.currentUserLoginOn.subscribe((loggedIn: boolean) => {
      this.userLoginOn = loggedIn;
      if (this.userLoginOn) {
        // Define las opciones del chat de Watson Assistant
        window.watsonAssistantChatOptions = {
          integrationID: "7a1e455a-d6e6-4864-8062-2f4dc83fc4c4",
          region: "au-syd",
          serviceInstanceID: "cedcb222-cd0a-4c2f-a0af-8e3c9abffa8e",
          onLoad: async (instance: { render: () => any; }) => { await instance.render(); }
        };

        // Crea un script y establece su src al script de Watson Assistant Chat
        const script = document.createElement('script');
        script.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";

        // Agrega el script al head del documento
        document.head.appendChild(script);
      }
    });
  }*/
}
