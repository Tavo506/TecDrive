import { Injectable } from '@angular/core';
import { Archivo, Contenido } from '../models/Contenido.model';

@Injectable({
    providedIn: 'root'
})
export class DriveService {

    constructor() { }



    dummy: any = {
        "Usuario_1": {
            "limite":500000,
            "nombre": "root",
            "tipo": "carpeta",
            "creacion": "16/11/2021",
            "modificacion": "16/11/2021",
            "tamaño": 5000,
            "compartido": [],
            "contenido": [
                {
                    "nombre": "Compartidos",
                    "tipo": "carpeta",
                    "creacion": "16/11/2021",
                    "modificacion": "16/11/2021",
                    "tamaño": 5000,
                    "contenido": [
                        {
                            "nombre": "Usuario 2",
                            "tipo": "carpeta",
                            "creacion": "16/11/2021",
                            "modificacion": "16/11/2021",
                            "tamaño": 5000,
                            "contenido": [
                                {
                                    "nombre": "Ejemplo 2",
                                    "tipo": "archivo",
                                    "extension": "txt",
                                    "creacion": "16/11/2021",
                                    "modificacion": "16/11/2021",
                                    "tamaño": 5000,
                                    "contenido": "Hola Mundo 2!!",
                                    "compartido": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "nombre": "Ejemplo",
                    "tipo": "archivo",
                    "extension": "txt",
                    "creacion": "16/11/2021",
                    "modificacion": "16/11/2021",
                    "tamaño": 5000,
                    "contenido": "Hola Mundo!!\nEsta es una prueba de un archivo txt y su contenido, esperando que funcione correctamente... Aunque aún le falta un poco más para llegar al extremo de la página, así que escribiré un poco más para probarlo, creo que ya debió haber llegado",
                    "compartido": []
                },
                {
                    "nombre": "Programa",
                    "tipo": "archivo",
                    "extension": "py",
                    "creacion": "22/11/2021",
                    "modificacion": "22/11/2021",
                    "tamaño": 2651,
                    "contenido": "def main():\n\tprint('Hola Mundo')\n\nmain()",
                    "compartido": []
                },
                {
                    "nombre": "Lorem ipsum",
                    "tipo": "archivo",
                    "extension": "txt",
                    "creacion": "21/11/2021",
                    "modificacion": "21/11/2021",
                    "tamaño": 10000,
                    "contenido": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc libero nunc, tempor vitae nulla a, ullamcorper molestie sem. Suspendisse faucibus lectus non ligula feugiat vehicula. Aliquam posuere hendrerit est in faucibus. Quisque et augue ut augue scelerisque pellentesque at at ante. Integer euismod id massa ac feugiat. Cras a enim a ipsum rutrum sollicitudin. Phasellus ac pretium quam. Nulla sit amet tempus nulla, eu facilisis ante. Vestibulum sed interdum dui. Nulla vitae lectus vel nunc elementum elementum eget sed leo.\n\nSed quis tempor dui. Suspendisse potenti. Mauris metus augue, blandit sit amet sapien eget, mattis maximus ex. Donec convallis neque in placerat pulvinar. Duis nec dictum ipsum, vel placerat sem. Fusce diam nibh, dictum ac eleifend vitae, hendrerit at ligula. Duis pretium lacus vel elit imperdiet euismod. Aliquam dignissim hendrerit ligula porta ultricies. Integer id risus blandit, pharetra lorem a, condimentum nulla.\n\nVestibulum blandit imperdiet dictum. Praesent molestie, nunc sit amet consequat tempus, nibh est fringilla odio, eget gravida nibh justo non libero. Ut a rhoncus purus. Aliquam pellentesque at metus sed vulputate. Aenean orci quam, fermentum suscipit purus ut, dictum vestibulum ante. Duis ac augue non libero ornare maximus in sed nisl. Duis tortor velit, tempor sit amet libero et, lobortis efficitur dui.\n\nSed ornare accumsan augue convallis commodo. Aenean at scelerisque erat, vitae lobortis ante. Nulla lectus metus, auctor id vestibulum ut, feugiat at nulla. Suspendisse auctor fermentum quam, eget pulvinar urna rutrum a. Nullam quis suscipit eros, vitae viverra libero. Proin porta dictum velit vitae mollis. Sed erat mi, blandit volutpat suscipit ac, malesuada sit amet risus. Vivamus consectetur mattis eros consequat pellentesque. Mauris ornare leo nec turpis volutpat tincidunt. Ut sed nulla magna. Nam rutrum nunc a risus suscipit, nec ornare leo dapibus.\n\nDonec vitae nunc a ipsum malesuada egestas eget non tellus. Aenean vitae sapien non ipsum molestie varius at eu eros. Pellentesque bibendum interdum eros ut commodo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin fermentum blandit lorem, non ornare tellus euismod in. Nulla risus velit, ullamcorper id dictum at, rhoncus vel erat. Cras interdum velit a lorem bibendum commodo. Quisque porta gravida turpis. Pellentesque suscipit quam posuere, iaculis augue et, porta leo. Cras euismod sit amet orci in dignissim. Suspendisse lorem nulla, tristique vestibulum justo non, auctor congue arcu. Sed scelerisque, lectus ut convallis ultricies, lorem dui efficitur enim, nec dictum metus nisi ut turpis. Quisque scelerisque, nibh eget cursus hendrerit, sem leo convallis ipsum, eget eleifend dui nibh non ligula. Morbi posuere nunc vitae libero mollis porttitor id eu leo.",
                    "compartido": []
                }
                ]
        },

        "Usuario_2": {
            "limite":350000,
            "nombre": "root",
            "tipo": "carpeta",
            "creacion": "16/11/2021",
            "modificacion": "16/11/2021",
            "tamaño": 5000,
            "compartido": [],
            "contenido": [
                {
                    "nombre": "Compartidos",
                    "tipo": "carpeta",
                    "creacion": "16/11/2021",
                    "modificacion": "16/11/2021",
                    "tamaño": 5000,
                    "contenido": []
                },
                {
                    "nombre": "Ejemplo 2",
                    "tipo": "archivo",
                    "extension": "txt",
                    "creacion": "16/11/2021",
                    "modificacion": "16/11/2021",
                    "tamaño": 5000,
                    "contenido": "Hola Mundo 2!!",
                    "compartido": [
                        "Usuario 1"
                    ]
                }
            ]
        }
    }






    getDrive(userName: string): Contenido {

        return this.dummy[userName] as Contenido;
    }


    crearArchivo(path:String, nombre:String, extension:String, contenido:String){
        // Revisa si hay un nombre repetido y hay espacio
        return // json de respuesta
    }
    
    
    
    crearDirectorio(path:String, nombre:String){
        // Revisa si hay un nombre repetido y hay espacio
        return // json de respuesta
    }
    


    modificarArchivo(path:String, archivo: Archivo){
        const nombre = archivo.nombre;
        const tipo = archivo.extension;
        const contenido = archivo.contenido;


        //modificarArchivo(path, nombre, tipo, contenido);
        
    }



    compartir(usuario: string, nuevoUsuario:string, path: string, nombre:string, tipoArchivo:string){
        console.log(usuario);
        console.log(nuevoUsuario);
        console.log(path);
        console.log(nombre);
        console.log(tipoArchivo);
        
        //if nuevoUsuario existe
        //compartir(usuario, nuevoUsuario, path, nombre, tipoArchivo);
    }




    copiar(path:String, nombre:String, tipoArchivo:String, nuevoPath:String){
        console.log(path);
        console.log(nombre);
        console.log(tipoArchivo);
        console.log(nuevoPath);

        //copiar(path, nombre, tipoArchivo, nuevoPath);

    }



    mover(path:String, nombre:String, tipoArchivo:String, nuevoPath:String){

        this.copiar(path, nombre, tipoArchivo, nuevoPath);

        this.eliminar(path, [nombre], [tipoArchivo])

    }




    eliminar(path:String, nombres:String[], tiposArchivo:String[]){
        console.log(path);
        console.log(nombres);
        console.log(tiposArchivo);

        

        //eliminar(path, nombres, tiposArchivo);
        
    }

}
