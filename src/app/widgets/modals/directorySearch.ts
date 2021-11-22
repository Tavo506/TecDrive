import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contenido } from 'src/app/models/Contenido.model';

@Component({
    selector: 'directory-search-modal',
    templateUrl: './directorySearch.html',
    styleUrls: ['./directorySearch.scss']
})
export class directorySearchModal {
    @Input() datos;
    @Input() usuario = "";
    pathActual: Contenido;
    path: string[] = [];


    constructor(public activeModal: NgbActiveModal) { }


    build(){
        this.pathActual = this.clone(this.datos);
    }


    clone(lista: Contenido): Contenido {
        var res: Contenido;
    
        res = { ...lista }
    
        return res
    }




    /*
        ========================================
          Funciones de navegación con el path
        ========================================
    */


    goToPath(path: string[], carpeta: string) {
        path.push(carpeta);
        this.go(path);
    }


    go(path: string[]) {
        this.pathActual = this.clone(this.datos);
        var lista;
        path.forEach(e => {
            lista = this.pathActual.contenido as Object;
            lista = lista.filter(n => n.nombre == e)[0] as Contenido
            this.pathActual = lista;

        })

    }


    goBackTo(ruta: string) {
        var newPath: string[] = [];
        var parar = false;
        this.path.forEach(e => {


            if (!parar) {

                newPath.push(e);

                if (e == ruta) {
                    parar = true;

                    console.log(newPath);
                    this.path = newPath;

                    this.go(newPath);
                }
            }
        });

    }


    goToRoot() {
        this.pathActual = this.clone(this.datos);
        this.path = []
    }




}