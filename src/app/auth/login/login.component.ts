import { Component, NgZone, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
    const emailStorage = localStorage.getItem('email');
    console.log('emailStorage: ' + emailStorage);
    if(emailStorage !== null ){
      console.log('Dentro de patchValue')
      this.loginForm.patchValue({
        email: emailStorage,
        remember: true
      })
    }

  }

  login() {
    console.log("Formulario: " + JSON.stringify(this.loginForm.value));
    this.usuarioService.login( this.loginForm.value ).subscribe(
      resp => {
        console.log(resp);
        this.router.navigate(['/']);
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    )

    //console.log(this.loginForm.value);
    //
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }

  startApp()  {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '946499126951-db51q2queuab1omqinpt5bfgvt9g68ci.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  }

  attachSignin(element) {

    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
            const id_token = googleUser.getAuthResponse().id_token;
            this.usuarioService.loginGoogle(id_token).subscribe(
              resp => {
                // Navegar al dashboard
                this.ngZone.run( () => {
                  this.router.navigate(['/'])
                })
              }
            );


        }, (error) =>  {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
