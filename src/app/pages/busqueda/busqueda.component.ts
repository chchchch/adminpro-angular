import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.mode';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) { 
     activatedRoute.params.subscribe( params => {
       let termino = params['termino'];
       console.log(termino);
       this.buscar( termino );
     });
  }

  ngOnInit(): void {
  }

  buscar( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this.http.get( url )
      .subscribe( (res: any) => {
        console.log(res);
        
          this.usuarios = res.usuarios;
          this.medicos = res.medicos;
          this.hospitales = res.hospitales;
          
      });

  }

}