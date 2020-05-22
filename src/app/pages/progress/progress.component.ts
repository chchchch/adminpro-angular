import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: [
  ]
})
export class ProgressComponent implements OnInit {

  progreso1: number = 20;
  progreso2: number = 30;

  constructor() { }

  ngOnInit(): void {
  }

/* 
  actualizarBarraA( event:number){
    console.log('Evento1: ', event);
    this.progreso1=event;
  }
  actualizarBarraB( event:number){
    console.log('Evento2: ', event);
    this.progreso2=event;
  } */

}
