import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [{
    titulo: 'Dashboard',
    icono: 'mdi mdi-gauge',
    submenu: [
      {titulo: 'Gráficas', url: '/dashboard/grafica1'},
      {titulo: 'Main', url: '/dashboard'},
      {titulo: 'ProgressBar', url: '/dashboard/progress'},
      {titulo: 'Promesas', url: '/dashboard/promesas'},
      {titulo: 'Rxjs', url: '/dashboard/rxjs'}


    ]
  }];

  constructor() { }
}
