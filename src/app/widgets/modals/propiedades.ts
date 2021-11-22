import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Archivo, Carpeta } from 'src/app/models/Contenido.model';
import { formatBytes } from "src/app/functions/sizeFunctions";

@Component({
    selector: 'propiedades-modal',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Propiedades de "{{nombreConExtension}}"</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <p>
            <strong>Nombre: </strong>
            {{nombre}}
        </p>
        <hr>
        <p>
            <strong>Tipo: </strong>
            {{extension}}
        </p>
        <p>
            <strong>Fecha de creación: </strong>
            {{creacion}}
        </p>
        <p>
            <strong>Última modificación: </strong>
            {{modificacion}}
        </p>
        <p>
            <strong>Tamaño: </strong>
            {{tamanno}}
        </p>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="activeModal.close(contenido)">Cerrar</button>
    </div>
  `,
    styleUrls: ['./fileView.scss']
})
export class propiedadesModal {
    @Input() contenido: Archivo | Carpeta;
    nombre = "";
    nombreConExtension = ""
    extension = "";
    creacion = "";
    modificacion = "";
    tamanno = "";

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
        this.tamanno = formatBytes(this.contenido.tamaño);

    }



}