import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { Hospital } from '../../models/hospital.mode';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService,
    public _usuarioService: UsuarioService
  ) {
   }


  // =========================================================
  // CARGAR HOSPITALES
  // =========================================================

  cargarHospitales(desde: number = 0){
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get( url)
    .pipe(map( (resp:any) => {
      this.totalHospitales = resp.total;
      return resp.hospitales;
    }));
  }

  // =========================================================
  // OBTENER HOSPITAL POR ID
  // =========================================================

  obtenerHospital( id: string ){
    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get( url )
    .pipe(map( (resp:any) => resp.hospital));
  }

  // =========================================================
  // BUSCAR HOSPITALES
  // =========================================================

  buscarHospitales( termino: string ) {
    
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url ).pipe(
      map( (resp: any) => resp.hospitales )
    );
  
  }

  // =========================================================
  // BORRAR HOSPITAL
  // =========================================================

  borrarHospital( id: string ){

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete( url)
    .pipe( map ( res => {

      Swal.fire(
        'Eliminado!',
        `El hospital ha sido eliminado`,
        'success'
      );
      return true;

    }));
  }

  // =========================================================
  // CREAR HOSPITAL
  // =========================================================

  crearHospital( nombre: string ){
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;
    return this.http.post( url, {nombre: nombre} )
    .pipe(map( (res:any) => res.hospital));
  }

  // =========================================================
  // ACTUALIZAR HOSPITAL
  // =========================================================

  actualizarHospital( hospital: Hospital ) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, hospital )
    .pipe(map( (res: any) => {
      Swal.fire({ title: 'Hospital actualizado', text: hospital.nombre, icon: 'success' });
      return true;
    }));


  }
}
