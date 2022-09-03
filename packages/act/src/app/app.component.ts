import { Component } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet> </router-outlet>
  `
})
export class AppComponent {
  greetingMessage = '';

  greet(name: string): void {
    invoke<string>('greet', { name }).then((text) => {
      this.greetingMessage = text;
    });
  }
}
