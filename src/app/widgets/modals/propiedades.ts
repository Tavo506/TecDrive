import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Archivo, Carpeta } from 'src/app/models/Contenido.model';
import { formatBytes } from "src/app/functions/sizeFunctions";

@Component({
    selector: 'propiedades-modal',
    templateUrl: 'propiedades.html'
})
export class propiedadesModal {
    @Input() contenido: Archivo | Carpeta;
    nombre = "";
    nombreConExtension = ""
    extension = "";
    creacion = "";
    modificacion = "";
    tamanno = "";
    maximo;
    mensajeMaximo;

    constructor(public activeModal: NgbActiveModal) { }


    build() {
        this.nombre = this.contenido.nombre;
        this.nombreConExtension = this.contenido.nombre;

        if (this.contenido.tipo == 'archivo') {
            this.extension = (this.contenido as (Archivo)).extension;
            this.nombreConExtension += `.${this.extension}`;

        } else {
            this.extension = "Directorio";
        }

        this.creacion = this.contenido.creacion;
        this.modificacion = this.contenido.modificacion;
        this.tamanno = formatBytes(this.contenido.tamano);

    }



}