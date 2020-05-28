import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  // =========================================================
  // EN ESTE SERVICIO SE DEBERIA PODER CAPTURAR EL TIPO Y EL ID (USUARIO, MEDICO, HOSPITAL)DESDE CUALQUIER PAGINA
  // =========================================================

  public tipo: string;
  public id: string;

  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() { }

  ocultarModal(){
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;
  }

  mostrarModal( tipo: string, id: string ){
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }
}
