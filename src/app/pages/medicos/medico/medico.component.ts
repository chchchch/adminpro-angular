import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicoService } from '../../../services/medicos/medico.service';
import { HospitalService } from '../../../services/hospital/hospital.service';
import { Hospital } from 'src/app/models/hospital.mode';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { URL_SERVICIOS } from '../../../config/config';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {

    activatedRoute.params.subscribe( params => {
      const id = params.id;

      if ( id !== 'nuevo' ) {
        this.cargarMedico( id );
      }
    });

  }

  ngOnInit(): void {

    this._hospitalService.cargarHospitales()
      .subscribe( hospitales => this.hospitales = hospitales );

    this._modalUploadService.notificacion
      .subscribe( res => {
        this.medico.img = res.medico.img;
      });
  }

  guardarMedico(f: NgForm) {

    console.log(f.valid);
    console.log(f.value);

    if ( f.valid ){

      this._medicoService.guardarMedico(this.medico)
      .subscribe( medico => {

        this.medico._id = medico._id;
        this.router.navigate(['/medico', medico._id]);

      });
    }else{
      return;

    }


  }

  cargarMedico( id: string ){
    this._medicoService.cargarMedico(id)
        .subscribe( medico => {
          this.medico = medico;
          this.medico.hospital = medico.hospital._id;
          this.cambioHospital( this.medico.hospital ); // recordemos que el hospital es el ID en este caso, por q asi lo inicializamos
        });
  }

  cambioHospital( id: string ){

    this._hospitalService.obtenerHospital( id )
      .subscribe( hospital => {
        this.hospital = hospital;
        

      });

  }

  cambiarFoto() {
      this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }


}
