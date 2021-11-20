export interface Contenido {
    contenido : Archivo | Carpeta
}

export interface Drive{
    usuario : Contenido[]
}


export interface Archivo {
    nombre : string,
    tipo : "archivo",
    extension : string,
    creacion : Date,
    modificacion : Date,
    tamaño : number,
    contenido : string,
    compartido : string[]
}


export interface Carpeta {
    nombre : string,
    tipo : "carpeta",
    creacion : Date,
    modificacion : Date,
    tamaño : number,
    contenido : Contenido[]
    compartido : string[],
}
