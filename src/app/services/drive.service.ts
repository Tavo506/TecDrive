import { Injectable } from '@angular/core';
import { Contenido } from '../models/Contenido.model';

@Injectable({
  providedIn: 'root'
})
export class DriveService {

  constructor() { }



  dummy: any = {
    "Usuario_1" : {
        "nombre" : "root",
        "tipo" : "carpeta",
        "creacion" : "16/11/2021",
        "modificacion" : "16/11/2021",
        "tamaño" : 5000,
        "compartido" : [
            {
                "nombre" : "Usuario 2",
                "tipo" : "carpeta",
                "creacion" : "16/11/2021",
                "modificacion" : "16/11/2021",
                "tamaño" : 5000,
                "contenido" : [
                    {
                        "nombre" : "Ejemplo 2",
                        "tipo" : "archivo",
                        "extension" : "txt",
                        "creacion" : "16/11/2021",
                        "modificacion" : "16/11/2021",
                        "tamaño" : 5000,
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
                "tamaño" : 5000,
                "contenido" : []
            },
            {
                "nombre" : "Ejemplo",
                "tipo" : "archivo",
                "extension" : "txt",
                "creacion" : "16/11/2021",
                "modificacion" : "16/11/2021",
                "tamaño" : 5000,
                "contenido" : "Hola Mundo!!",
                "compartido" : []
            }
        ]
    },

    "Usuario_2" : {
        "nombre" : "root",
        "tipo" : "carpeta",
        "creacion" : "16/11/2021",
        "modificacion" : "16/11/2021",
        "tamaño" : 5000,
        "compartido" : [],
        "contenido" : [
            {
                "nombre" : "Compartidos",
                "tipo" : "carpeta",
                "creacion" : "16/11/2021",
                "modificacion" : "16/11/2021",
                "tamaño" : 5000,
                "contenido" : []
            },
            {
                "nombre" : "Ejemplo 2",
                "tipo" : "archivo",
                "extension" : "txt",
                "creacion" : "16/11/2021",
                "modificacion" : "16/11/2021",
                "tamaño" : 5000,
                "contenido" : "Hola Mundo 2!!",
                "compartido" : [
                    "Usuario 1"
                ]
            }
        ]
    }
}






getDrive(userName: string) : Contenido {

  return this.dummy[userName] as Contenido;
}

}
