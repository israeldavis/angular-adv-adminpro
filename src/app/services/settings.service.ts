import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {
    console.log('Settings Service init');
    const url = localStorage.getItem('theme');
    if(url) {
      this.linkTheme.setAttribute('href', url);
    } else {
      this.linkTheme.setAttribute('href', 'assets/css/colors/purple-dark.css');
    }
   }

   changeTheme(theme: string): void {

    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {

    const links= document.querySelectorAll('.selector');

    links.forEach( elem => {
      elem.classList.remove('working');
        const btnTheme = elem.getAttribute('data-theme');
        const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`
        const currentTheme = this.linkTheme.getAttribute('href');

        if(btnThemeUrl === currentTheme) {
          elem.classList.add('working');
        }
    })
  }
}
