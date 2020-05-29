import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.mode';
import { HospitalService } from '../../services/hospital/hospital.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  cargando: boolean = true;
  totalRegistros: number = 0;

  constructor(
    public _hospitalService: HospitalService,
    public _modalService: ModalUploadService
    )
    { }

  ngOnInit(): void {
    this.cargarHospitales();
    this._modalService.notificacion.subscribe( () => this.cargarHospitales());
  }

  // =========================================================
  // CARGAR HOSPITALES
  // =========================================================

  cargarHospitales(){
    this.cargando = true;
    this._hospitalService.cargarHospitales( this.desde )
    .subscribe( hospitales => {
      this.totalRegistros = this._hospitalService.totalHospitales;
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  // =========================================================
  // OBTENER HOSPITAL POR ID
  // =========================================================

  obtenerHospital( id: string ){
    this._hospitalService.obtenerHospital( id)
    .subscribe( res => {
      console.log(res);

    });
  }

  // =========================================================
  // BUSCAR HOSPITALES
  // =========================================================

  buscarHospital( termino: string ){

    if ( termino.length <= 0){
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospitales( termino )
      .subscribe( (hospitales: Hospital[]) => {

        this.hospitales = hospitales;
        this.cargando = false;
      });

  }


  // =========================================================
  // CREAR HOSPITAL
  // =========================================================

  alertCrearHospital(){

    Swal.fire({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del Hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((valor) => {
      if ( !valor.value || valor.value.length === 0) {
        return;
      }
 
      this._hospitalService.crearHospital( valor.value )
            .subscribe( () => this.cargarHospitales());
    });
 
  
    
  }

  // =========================================================
  // ACTUALIZAR HOSPITAL
  // =========================================================
  
  guardarHospital( hospital: Hospital ){
    hospital.nombre = hospital.nombre.toUpperCase();
    this._hospitalService.actualizarHospital( hospital )
    .subscribe();
  }

  // =========================================================
  // BORRAR HOSPITAL
  // =========================================================

  borrarHospital( hospital: Hospital ){
    Swal.fire({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then(borrar => {
      if (borrar.value) {

        this._hospitalService.borrarHospital( hospital._id)
        .subscribe( resp => {
          this.totalRegistros--;

          if ( this.desde === this.totalRegistros ){
            this.desde -= 5;
          }

          this.cargarHospitales();
        });

      }
    });

  }

  // =========================================================
  // MOSTRAAR MODAL
  // =========================================================

  mostrarModal( hospital: Hospital ){
    this._modalService.mostrarModal( 'hospitales', hospital._id );
  }

  // =========================================================
  // PAGINACION DE HOSPITALES
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
    this.cargarHospitales();


  }



}
