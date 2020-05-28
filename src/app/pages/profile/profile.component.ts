import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string;


  constructor(public _usuarioService: UsuarioService) { 

    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  // =========================================================
  // GUARDAR NOMBRE EMAIL
  // =========================================================

  guardar( forma: NgForm ) {

    this.usuario.nombre = forma['nombre'];
    if( !this.usuario.google ){
      this.usuario.email = forma['email'];
    }
    
    this._usuarioService.actualizarUsuario( this.usuario )
      .subscribe();
    
  }

  // =========================================================
  // SELECCION DE IMAGEN
  // =========================================================

  seleccionImage( archivo: File ){ // este event tiene toda la informacion de la imagen en target.files[0]
    console.log(event);

    if( !archivo ){
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0){
      Swal.fire({ title: 'Sólo Imagenes', text: 'El archivo seleccionado no es una imagen', icon: 'error' });
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result.toString();
    
  }

  // =========================================================
  // SUBIDA DE IMAGEN
  // =========================================================

  cambiarImagen(){
      this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }

}
