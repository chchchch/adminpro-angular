import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medicos/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  cargando: boolean;
  totalRegistros: number = 0;
  desde: number = 0;

  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }
  // =========================================================
  // CARGAR MEDICOS
  // =========================================================

  cargarMedicos(){
    this.cargando = true;
    this._medicoService.cargarMedicos( this.desde )
    .subscribe( medicos => {
      this.totalRegistros = this._medicoService.totalMedicos;
      this.medicos = medicos;
      this.cargando = false;
    });
  }

  // =========================================================
  // BUSACR MEDICO
  // =========================================================

  buscarMedicos( termino: string ){

    if ( termino.length <= 0){
      this.cargarMedicos();
      return;
    }

    this._medicoService.buscarMedicos( termino )
      .subscribe( (medicos: Medico[]) => {

        this.medicos = medicos;
        this.cargando = false;
      });

  }

  // =========================================================
  // BORRAR MEDICO
  // =========================================================

  borrarMedico( medico: Medico ){
    Swal.fire({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then(borrar => {
      if (borrar.value) {

        this._medicoService.borrarMedico( medico._id)
        .subscribe( resp => {
          this.totalRegistros--;

          if ( this.desde === this.totalRegistros ){
            this.desde -= 5;
          }

          this.cargarMedicos();
        });

      }
    });


      
    
  }

  mostrarModal(medico: Medico){

  }

  // =========================================================
  // PAGINACION
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
    this.cargarMedicos();


  }
}
