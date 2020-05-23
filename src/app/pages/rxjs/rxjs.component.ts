import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  constructor() {


    this.regresaObservable().pipe(
    
  )


  .subscribe( num => {
    console.log('subs', num);

  }, err => {
    console.error('Error: ', err);

  }, () => {
    console.log('El observador termino!');

  });

  }

  ngOnInit(): void {
  }

  regresaObservable(): Observable<any> {
    const obs = new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval( () => {
          contador += 1;
          observer.next(contador);
          if (contador === 3){
            clearInterval(intervalo);
            observer.complete();
          }
         /*  if ( contador === 2 )
   {
    clearInterval(intervalo);
    observer.error('Auxilio!');
   }  */     }, 1000);
    });

    return obs;
  }

}
