import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'file-view-modal',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">{{archivo.nombre}}.{{archivo.extension}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <div class="form-group">
            <textarea class="form-control" id="contenido" rows="20">{{archivo.contenido}}</textarea>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-outline-danger" (click)="activeModal.close('Close click')">Cerrar</button>
        <button type="button" class="btn btn-outline-success" (click)="activeModal.close('Save click')">Guardar</button>
    </div>
  `,
    styleUrls: ['./fileView.scss']
})
export class fileViewModal {
    @Input() archivo;

    constructor(public activeModal: NgbActiveModal) { }
}