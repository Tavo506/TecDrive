export interface Contenido {
    contenido : Archivo | Carpeta
}



export interface Archivo {
    nombre : string,
    tipo : "archivo",
    extension : string,
    creacion : string,
    modificacion : string,
    tamano : number,
    contenido : string,
    compartido : string[]
}


export interface Carpeta {
    limite? : number,
    nombre : string,
    tipo : "carpeta",
    creacion : string,
    modificacion : string,
    tamano : number,
    contenido? : Contenido[]
    compartido : string[],
}
