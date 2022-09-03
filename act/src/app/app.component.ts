import { Component } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';

@Component({
  selector: 'app-root',
  template: `
  <app-home></app-home>
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
