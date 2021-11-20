export interface Contenido {
    contenido : Archivo | Carpeta
}



export interface Archivo {
    nombre : string,
    tipo : "archivo",
    extension : string,
    creacion : string,
    modificacion : string,
    tamaño : number,
    contenido : string,
    compartido : string[]
}


export interface Carpeta {
    nombre : string,
    tipo : "carpeta",
    creacion : string,
    modificacion : string,
    tamaño : number,
    contenido? : Contenido[]
    compartido : string[],
}
