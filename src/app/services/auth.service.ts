import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(userName:String) : any{
    // Muestra drive (redirigir)
    return { res : true }// json de respuesta
  }

  register(bytes:Number, userName:String) : JSON{
    //Comprobar user
    //Crear dos carpetas
    //Mostrar drive (redirigir)
    return // json de respuesta
  }

}
