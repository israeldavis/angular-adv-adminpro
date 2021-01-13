import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[];

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
    console.log('El menu: ' + JSON.stringify(this.menu))
  }

//   menu: any[] = [
//     {
//       titulo: 'Dashboard',
//       icono: 'mdi mdi-gauge',
//       submenu: [
//         {titulo: 'Gráficas', url: '/grafica1'},
//         {titulo: 'Main', url: '/dashboard'},
//         {titulo: 'ProgressBar', url: '/progress'},
//         {titulo: 'Promesas', url: '/promesas'},
//         {titulo: 'Rxjs', url: '/rxjs'}
//         ]
//     },
//     {
//       titulo: 'Catálogos',
//       icono: 'mdi mdi-folder-lock-open',
//       submenu: [
//         {titulo: 'Usuarios', url: '/usuarios'},
//         {titulo: 'Hospitales', url: '/hospitales'},
//         {titulo: 'Médicos', url: '/medicos'},

//         ]
//     }
// ];

  constructor() { }
}
