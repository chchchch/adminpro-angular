import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = []; 

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
    ) {
      
      this.cargarStorage();
      
    }
    
    
    // =========================================================
    // CARGAR USUARIOS EN MANTENEDOR DE USUARIOS
    // =========================================================
    
    cargarUsuarios( desde: number = 0 ){
      const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    
      return this.http.get( url);
    }
    
    // =========================================================
    // BUSCAR USUARIOS PARA EL MANTENEDOR DE USUARIOS
    // =========================================================
    
    buscarUsuarios( termino: string ) {
    
      const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
      return this.http.get( url ).pipe(
        map( (resp: any) => resp.usuarios )
      );
    
    }
    
    // =========================================================
    // ELIMINAR USUARIO EN MANTENEDOR DE USAURIO
    // =========================================================
    
    
    borrarUsuario( id: string ){
    
    
      let url = URL_SERVICIOS + '/usuario/' + id;
      url += '?token=' + this.token;
      return this.http.delete( url )
      .pipe(
        map( resp => {
    
          Swal.fire(
            'Eliminado!',
            `El usuario ha sido eliminado`,
            'success'
          );
          return true;
        }
        )
      );
    }

  // =========================================================
  // STORAGE
  // =========================================================  

  cargarStorage() {

    if ( localStorage.getItem('token')){

      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    }else{
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  
  guardarStorage( id: string, token: string, usuario: Usuario, menu: any){

    
    
    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify( usuario ));
    localStorage.setItem('menu', JSON.stringify(menu));
    
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
    
  }

  // =========================================================
  // VALIDACION DE TOKEN - MEJORAR
  // =========================================================
      estaLogueado() {
    
        return ( this.token.length > 5 ) ? true : false ;
    
      }

  // =========================================================
  // CREAR USUARIO
  // =========================================================

  crearUsuario( usuario: Usuario){

    const url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario )
        .pipe(map( (resp: any) => {
          Swal.fire({ title: 'Usuario creado', text: usuario.email, icon: 'success' });
          return resp.usuario;
        }),
        catchError( err => {
            Swal.fire(err.error.mensaje, err.error.errors.message, 'error');
            return throwError(err.message);
        })
      );
  }


  // =========================================================
  // ACTUALIZAR USUARIO DESDE PERFIL
  // =========================================================

  actualizarUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    console.log(url);

    return this.http.put( url, usuario )
    .pipe(map( (res: any) => {

      if ( usuario._id === this.usuario._id ){
        this.guardarStorage( res.usuario._id, this.token, res.usuario, this.menu);
      }
      Swal.fire({ title: 'Usuario actualizado', text: usuario.nombre, icon: 'success' });
      return true;
    }),
    catchError( err => {
        Swal.fire(err.error.mensaje, err.error.errors.message, 'error');
        return throwError(err.message);
    })
    );


  }

  // =========================================================
  // CAMBIAR IMAGEN DESDE PERFIL
  // =========================================================


  cambiarImagen( archivo: File, id: string ){

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id)
      .then( (resp: any) => {
          console.log(resp);
          this.usuario.img = resp.usuario.img;
          Swal.fire({ title: 'Imagen actualizada', text: this.usuario.nombre, icon: 'success' });
          this.guardarStorage( id, this.token, this.usuario, this.menu );
      })
      .catch( resp => {
        console.log(resp);
      });
  }


  // =========================================================
  // LOG OUT
  // =========================================================


  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

// =========================================================
// LOGIN GOOGLE
// =========================================================

loginGoogle( token: string ){

  const url = URL_SERVICIOS + '/login/google';

  return this.http.post( url, { token }  )
  .pipe(map( (resp: any) => {
      this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Bienvenido',
        showConfirmButton: false,
        timer: 1000
      });

      return true;

  }));
}

// =========================================================
// LOGIN NORMAL
// =========================================================

login( usuario: Usuario, recuerdame: boolean= false ){

  if ( recuerdame ){
    localStorage.setItem('email', usuario.email );
  }else {
    localStorage.removeItem('email');
  }

  const url = URL_SERVICIOS + '/login';

  return this.http.post( url, usuario )
      .pipe(map( (resp: any) => {

        this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bienvenido',
          showConfirmButton: false,
          timer: 1000
        });

        return true;

      }),
      catchError( err => {
          Swal.fire('Error en el login', err.error.mensaje, 'error');
          return throwError(err.message);
      })
    );

}


}
