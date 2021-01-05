import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [{
    titulo: 'Dashboard',
    icono: 'mdi mdi-gauge',
    submenu: [
      {titulo: 'Gráficas', url: '/grafica1'},
      {titulo: 'Main', url: '/dashboard'},
      {titulo: 'ProgressBar', url: '/progress'},
      {titulo: 'Promesas', url: '/promesas'},
      {titulo: 'Rxjs', url: '/rxjs'}


    ]
  }];

  constructor() { }
}
