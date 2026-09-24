import { Routes } from '@angular/router';

export const routes: Routes = [

    {
    path: 'ai-assistant',
    loadComponent: () =>
    import('./pages/ai-chat/ai-chat')
    .then(m => m.AiChatComponent)
    },
    
    {
    path: '',
    redirectTo: 'ai-assistant',
    pathMatch: 'full'
    }
    
    ];
