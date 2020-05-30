import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, PRIMARY_OUTLET } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService
  ){}

  canActivate(): Promise<boolean> | boolean {

    console.log(' TOKEN GUARD');

    let token = this._usuarioService.token;
    let payload = JSON.parse( atob( token.split('.')[1] )); // payload es el contenido del token, atob decodifica cadena en base64

    
    let expirado = this.expirado( payload.exp );
    
    if(expirado) {
      return false; // GUARD NO DEJA PASAR, es canActive, es decir el usaurio no podra ingresar a esta pagina si el token esta expirado
    }
    // pero si no a expirado el token

    /* console.log(payload); */

    return this.verificaRenueva(payload.exp);
  }


  // =========================================================
  // VERIFICA SI HAY QUE RENOVAR EL TOKEN, CUANDO ESTE PROXIMO A VENCER
  // =========================================================

  verificaRenueva( fechaExp: number ): Promise<boolean> {

    return new Promise( (resolve, reject) => {

      let tokenExp = new Date( fechaExp * 1000 );
     /*  console.log(tokenExp); */
      
      let ahora = new Date();
     /*  console.log(ahora); */
      

      ahora.setTime( ahora.getTime() + (1 * 60 * 60 * 1000)  ); // le sumo 1 horas a la hora actual
     /*  console.log(ahora); */
      

      // tslint:disable-next-line: max-line-length
      if ( tokenExp.getTime() > ahora.getTime() ){ // comparo el fecha exp de token guardado, con la fecha actual sumada mas 1hora. Si exp > actual deja pasar.
        resolve(true); // GUARD DEJA PASAR
      }else{
        this._usuarioService.renuevaToken()
        .subscribe( () => {
          resolve(true); // RENUEVA Y GUARD DEJA PASAR
        }, () => {
          reject(false); // GUARD NO DEJA PASAR
        });
      }
    });


  }


  // =========================================================
  // FUNCION PARA VERIFICAR SI YA EXPIRO EL TOKEN
  // =========================================================
  
  expirado( fechaExp: number ){

    let ahora = new Date().getTime() / 1000;

    if ( fechaExp < ahora ) {
      return true;
    }else {
      return false;
    }
  }
}
