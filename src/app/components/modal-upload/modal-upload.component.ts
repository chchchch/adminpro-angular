import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subirArchivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {



  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _cargaArchivoService : SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) { 


  }

  ngOnInit(): void {

  }

  // =========================================================
  // CERRAR MODAL
  // =========================================================

  cerrarModal(){
    this.imagenTemp= null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }

  // =========================================================
  // SELECCION DE IAMGEN EN MODAL
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
  // subir imagen desde modal
  // =========================================================

  subirImagen(){

    this._cargaArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
    .then( resp => {

      console.log(resp);
      
      this._modalUploadService.notificacion.emit( resp );
      this.cerrarModal();

    }).catch( err => {
      console.log('Error en la carga...');
      
    })
  }

}
