import { Archivo } from "../models/Contenido.model";

export function newArchivo() : Archivo{

    return {
        compartido: [],
        contenido: "",
        creacion: "",
        extension: "",
        modificacion: "",
        nombre: "",
        tamaño: 0,
        tipo: "archivo"
    }

}


export function newCarpeta(){

}


export function getToday(){

}