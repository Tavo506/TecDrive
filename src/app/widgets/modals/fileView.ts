import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'file-view-modal',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">{{archivo.nombre}}.{{archivo.extension}}</h4>
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
        <button type="button" class="btn btn-outline-danger" (click)="activeModal.close({accion: 'cancelado', res: ''})">Cerrar</button>
        <button type="button" class="btn btn-outline-success" (click)="activeModal.close({accion: 'guardar', res: texto})">Guardar</button>
    </div>
  `,
    styleUrls: ['./fileView.scss']
})
export class fileViewModal {
    @Input() archivo;
    texto : string = "";

    constructor(public activeModal: NgbActiveModal) { }
}