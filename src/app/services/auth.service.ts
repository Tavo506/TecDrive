import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(userName:String) : any{
    const user = userName.replace(/ /gi, "_")
    // Muestra drive (redirigir)
    return { res : true }// json de respuesta
  }

  register(bytes:Number, userName:String) : JSON{
    const user = userName.replace(/ /gi, "_")
    //Comprobar user
    //Crear dos carpetas
    //Mostrar drive (redirigir)
    return // json de respuesta
  }

}
