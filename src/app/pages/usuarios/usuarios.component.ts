import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor(public _usuarioService: UsuarioService,
    public _modalService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this._modalService.notificacion.subscribe( res => this.cargarUsuarios());
  }
  

  mostrarModal( id: string ) {

    this._modalService.mostrarModal( 'usuarios', id );

  }

  // =========================================================
  // CARGAR USUARIO EN LA TABLA - MANTENEDOR DE USUARIOS
  // =========================================================

  cargarUsuarios() {

    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
    .subscribe(  (resp: any) => {
      console.log(resp);
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  // =========================================================
  // PARA PAGINACION - MANTENEDOR DE USUARIIOS
  // =========================================================

  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;
    console.log(desde);

    if ( desde >= this.totalRegistros ){
      return;
    }

    if ( desde < 0 ){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();


  }

  // =========================================================
  // BUSQUEDA DE USUARIOS - MANTENDOR DE USUARIOS -COLECCION USUARIOS BACKEND
  // =========================================================

  buscarUsuario( termino: string ){

    if ( termino.length <= 0){
      this.cargarUsuarios();
      return;
    }

    this._usuarioService.buscarUsuarios( termino )
      .subscribe( (usuarios: Usuario[]) => {

        this.usuarios = usuarios;
        this.cargando = false;
      });

  }

  // =========================================================
  // BORRAR USUARIOS
  // =========================================================


  borrarUsuario( usuario: Usuario ) {

    if ( usuario._id === this._usuarioService.usuario._id) {
      Swal.fire('No seas GIL', 'No se puede borrar a si mismo', 'error');
      return ;
    }

    Swal.fire({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then(borrar => {
      if (borrar.value) {

        this._usuarioService.borrarUsuario( usuario._id)
        .subscribe( resp => {
          console.log(resp);

          this.totalRegistros--;

          if( this.desde === this.totalRegistros ){
            this.desde-= 5;
          }
          
          this.cargarUsuarios();
        });

      }
    });

  }
  // =========================================================
  // GUARDAR USUARIO - EDITANDO MANTENEDOR USUARIOS
  // =========================================================
  guardarUsuario( usuario: Usuario ){
    this._usuarioService.actualizarUsuario( usuario )
    .subscribe();
  }

}
