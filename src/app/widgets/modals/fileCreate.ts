import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
    selector: 'file-create-modal',
    template: `
    <div class="modal-header">

        
        <div class="input-group mb-3">
            <input type="text" class="form-control"  placeholder="Nombre" [value]="nombre" (input)="nombre = $event.target.value" aria-label="Nombre" aria-describedby="basic-addon1">
        </div>
        <br>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon2">Tipo</span>
            </div>
            <input type="text" class="form-control"  placeholder="txt" [value]="extension" (input)="extension = $event.target.value" aria-label="Tipo" aria-describedby="basic-addon2">
        </div>

      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('cancelado')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <div class="form-group">
            <textarea class="form-control" id="contenido" rows="20"  [value]="texto" (input)="texto = $event.target.value"></textarea>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-outline-danger" (click)="activeModal.close({accion: 'cancelado', res: {}})">Cerrar</button>
        <button type="button" class="btn btn-outline-success" (click)="guardar()">Guardar</button>
    </div>
  `
})
export class fileCreateModal {
    nombre: string = "";
    extension: string = "";
    texto: string = "";

    constructor(public activeModal: NgbActiveModal) { }

    guardar(){

        if (this.nombre.trim() == "" || this.nombre.includes('/') || this.nombre.includes('&') || this.nombre.includes('=') || this.nombre.includes(':') || this.nombre.includes('\\')) {
            Swal.fire({
                title: "Error",
                html: "<p>Nombre inválido</p> <p>caracteres no permitidos: ('/', '&', '=', ':'. '\\')</p>",
                icon: "warning"
            });
            return;
        }else if (this.extension.trim() == "" || this.extension == "carpeta" || this.nombre.trim() == "" || this.nombre.includes('/') || this.nombre.includes('&') || this.nombre.includes('=') || this.nombre.includes(':') || this.nombre.includes('\\')) {
            Swal.fire({
                title: "Error",
                html: "<p>Nombre inválido</p> <p>caracteres no permitidos: ('/', '&', '=', ':'. '\\')</p><p>No se permite la extensión 'carpeta'</p>",
                icon: "warning"
            });
            return;
        }

        this.activeModal.close({accion: 'guardar', res: {nombre: this.nombre, extension: this.extension, texto: this.texto}})
    }
}