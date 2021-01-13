import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public _menuItems: any[];
  public usuario: Usuario;

  constructor(private sidebarService: SidebarService,
              private usuarioService: UsuarioService) {
    //this._menuItems = sidebarService.menu;
    //console.log('Menu en Side Component ts: ' +sidebarService.menu)
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
  }

  get menuItems(): any[] {
    const menuItems = this.sidebarService.menu
    console.log('Menu en Side Component ts: ' + menuItems)
    return menuItems;
  }

}
