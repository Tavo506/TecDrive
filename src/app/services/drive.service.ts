import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DriveService {

  constructor() { }

  dummy = {
    "Usuario 1" : {
        "nombre" : "root",
        "tipo" : "carpeta",
        "creacion" : "16/11/2021",
        "modificacion" : "16/11/2021",
        "tamaño" : "5000",
        "compartido" : [
            {
                "nombre" : "Usuario 2",
                "tipo" : "carpeta",
                "creacion" : "16/11/2021",
                "modificacion" : "16/11/2021",
                "tamaño" : "5000",
                "contenido" : [
                    {
                        "nombre" : "Ejemplo 2",
                        "tipo" : "archivo",
                        "extension" : "txt",
                        "creacion" : "16/11/2021",
                        "modificacion" : "16/11/2021",
                        "tamaño" : "5000",
                        "contenido" : "Hola Mundo 2!!",
                        "compartido" : []
                    }
                ]
            }
        ],
        "contenido" : [
            {
                "nombre" : "Compartidos",
                "tipo" : "carpeta",
                "creacion" : "16/11/2021",
                "modificacion" : "16/11/2021",
                "tamaño" : "5000",
                "contenido" : []
            },
            {
                "nombre" : "Ejemplo",
                "tipo" : "archivo",
                "extension" : "txt",
                "creacion" : "16/11/2021",
                "modificacion" : "16/11/2021",
                "tamaño" : "5000",
                "contenido" : "Hola Mundo!!",
                "compartido" : []
            }
        ]
    },

    "Usuario 2" : {
        "nombre" : "root",
        "tipo" : "carpeta",
        "creacion" : "16/11/2021",
        "modificacion" : "16/11/2021",
        "tamaño" : "5000",
        "compartido" : [],
        "contenido" : [
            {
                "nombre" : "Compartidos",
                "tipo" : "carpeta",
                "creacion" : "16/11/2021",
                "modificacion" : "16/11/2021",
                "tamaño" : "5000",
                "contenido" : []
            },
            {
                "nombre" : "Ejemplo 2",
                "tipo" : "archivo",
                "extension" : "txt",
                "creacion" : "16/11/2021",
                "modificacion" : "16/11/2021",
                "tamaño" : "5000",
                "contenido" : "Hola Mundo 2!!",
                "compartido" : [
                    "Usuario 1"
                ]
            }
        ]
    }
}


  getDrive(userName:String) : any {
    return this.dummy["Usuario 1"];
  }

}
