import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public imgSubs: Subscription;
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(private usuarioService: UsuarioService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe( img => this.cargarUsuarios());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe(
      resp => {
        this.totalUsuarios = resp.total;
        this.usuarios = resp.usuarios;
        this.usuariosTemp = resp.usuarios;
        this.cargando = false;
      }
    )
  }

  cambiarPagina( valor: number) {
    this.desde += valor;

    if( this.desde < 0 ) {
      this.desde = 0;
    } else if( this.desde > this.totalUsuarios ) {
      this.desde -= valor
    }

    this.cargarUsuarios();
  }

  buscar(termino: string) {

    if(termino.length == 0) {
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscar('usuarios', termino).subscribe(
      resp => {
        this.usuarios = resp;
      }
    )
  }

  eliminarUsuario( usuario: Usuario ) {

    if( usuario.uid === this.usuarioService.uid ) {
      return Swal.fire('Error', 'No puede borrarse a si mismo.', 'error');
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Está a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.eliminarUsuario(usuario).subscribe(
          resp => {

            Swal.fire(
              '¡Usuario Borrado!',
              `${ usuario.nombre } fue eliminado correctamente.`,
              'success'
            );

            this.cargarUsuarios();

          }
        )

      }
    })
  }

  cambiarRole( usuario: Usuario ) {
    this.usuarioService.guardarUsuario(usuario).subscribe(
      resp => {
        console.log(resp)
      }
    )
  }

  abrirModal( usuario: Usuario ) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

}
