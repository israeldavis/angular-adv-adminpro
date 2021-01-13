import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

import { map, tap, catchError, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
      this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  get role():  'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }

  guardarLocalStorage(token: string, menu: any) {
        localStorage.setItem('token', token);
        localStorage.setItem('menu', JSON.stringify(menu));
  }

  googleInit() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '946499126951-db51q2queuab1omqinpt5bfgvt9g68ci.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      });

    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then( () => {

      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      })
    });


  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {headers: {'x-token': this.token} }).pipe(
      map( (resp:any) => {
        const { email, google, nombre, role, img = '', uid } = resp.usuario;

        this.usuario = new Usuario( nombre, email, '', img, google, role, uid);
        console.log('Usuario en el service: ' + JSON.stringify(this.usuario));
        this.guardarLocalStorage(resp.token, resp.menu);

        return true;
      }),
      catchError( error => of(false) )
    )
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap( (resp: any)=> {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      )
  }

  actualizarPerfil( data: { email: string, nombre: string, role: string }) {
    data = {
      ...data,
      role: this.usuario.role
    }
    console.log('Actualizar Perfil service. La data: ' + JSON.stringify(data));

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {headers: {'x-token': this.token} })
  }

  login(formData: LoginForm) {

    if(formData.remember) {
      localStorage.setItem('email',formData.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(`${base_url}/login`, formData).pipe(
      map( (resp: any) => {
        console.log('Resp: ' + JSON.stringify(resp));
        localStorage.setItem('id', resp.id);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario) );
        this.guardarLocalStorage(resp.token, resp.menu);
        return true;
      })
    )
  }

  loginGoogle(token) {

    return this.http.post(`${base_url}/login/google`, {token}).pipe(
      tap( (resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    )
  }

  cargarUsuarios( desde: number = 0): Observable<CargarUsuario> {
    // localhost:3000/api/usuarios?desde=0
    const url = `${ base_url }/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>( url , this.headers )
      .pipe(
        //delay(5000),
        map( resp => {
          const usuarios = resp.usuarios.map(
            user => new Usuario(user.nombre, user.email, '', user.img,user.google, user.role, user.uid)
          );
          return {
            total: resp.total,
            usuarios
          }
        })
      )
  }

  eliminarUsuario( usuario: Usuario) {
    // /usuarios/5fecfbe5bf75f45b286c338a
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers );

    //console.log('eliminando');
  }

  guardarUsuario( usuario: Usuario) {
    return this.http.put(`${base_url}/usuarios/${ usuario.uid }`, usuario, this.headers);
  }

}
