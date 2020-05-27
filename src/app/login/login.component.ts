import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css' ] // forma correcta
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  auth2: any;

  constructor( public router: Router,
               public _usuarioService: UsuarioService) { }


  // =========================================================
  // ngOnInit
  // =========================================================

  ngOnInit(): void {
    init_plugins();
    this.googleInit();
    // recordar correo en caso hubiese y para evitar el undefined usar || ' '
    this.email = localStorage.getItem('email') || '';
    // luego que el check persista
    if ( this.email.length > 1 ){
      this.recuerdame = true;
    }
  }


  // =========================================================
  // OBTENER TOKEN GOOGLE
  // =========================================================

  googleInit( ) {
    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '269414083490-hnipo60v4ju88chfm3q8nldibl588fhu.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn( document.getElementById('btnGoogle'));

    });
  }

  attachSignIn( element ){

    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      // Ver informacion del usuario logeado
      // let profile = googleUser.getBasicProfile();
      // Ver informacion del token
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token)
        // tslint:disable-next-line: max-line-length
        .subscribe(e => window.location.href = '#/dashboard' ); // uso vanilla js por un problema al hacer router.navigate y me muestra el dashboard como no cargado
    });
  }


  // =========================================================
  // DEL LOGIN NORMAL
  // =========================================================


  ingresar( forma: NgForm) {

    if ( !forma.valid ){
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password );

    this._usuarioService.login( usuario, forma.value.recuerdame )
      .subscribe( e => this.router.navigate(['/dashboard']));



  }
}
