import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Archivo, Carpeta, Contenido } from 'src/app/models/Contenido.model';
import { DriveService } from 'src/app/services/drive.service';
import { fileViewModal } from 'src/app/widgets/modals/fileView';
import { propiedadesModal } from 'src/app/widgets/modals/propiedades';

import Swal from 'sweetalert2'





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  datos : Contenido;
  usuario : string = "";

  pathActual : Contenido;

  path : string[] = [];

  constructor(
    private driveService : DriveService,
    private activatedRoute:ActivatedRoute, 
    private modalService : NgbModal,
    private modalConfig: NgbModalConfig
    ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.usuario = params["user"]
    })

    this.datos = this.driveService.getDrive(this.usuario);
    this.pathActual = this.clone(this.datos);    

    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
  }


  clone(lista : Contenido) : Contenido{
    var res : Contenido;
    
    res = {...lista}

    return lista
  }


  open(archivo : Archivo){
    const modalRef = this.modalService.open(fileViewModal, {size: 'xl', scrollable: true, centered: true});
    modalRef.componentInstance.archivo = archivo;
    modalRef.componentInstance.texto = archivo.contenido;

    modalRef.result.then((result) => {
      
      if (result.accion == 'guardar' && result.res != archivo.contenido) {
        
        console.log("Hay cambios");
        archivo.contenido = result.res;

        this.driveService.modificarArchivo(this.path.join("/"), archivo)
        
      }
      
    }, (reason) => {
      //`Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  verPropiedades(contenido : Archivo | Carpeta){

    const modalRef = this.modalService.open(propiedadesModal, {scrollable: true, centered: true});
    modalRef.componentInstance.contenido = contenido;
    modalRef.componentInstance.build();

  
  }



  goToPath(path : string[], carpeta : string){
    path.push(carpeta);
    this.go(path);
  }


  go(path : string[]){
    this.pathActual = this.clone(this.datos);
    var lista;
    path.forEach(e => {
      lista = this.pathActual.contenido as Object;
      lista = lista.filter(n => n.nombre == e )[0] as Contenido
      this.pathActual = lista;
           
    })
    
  }


  goBackTo(ruta : string){ 
    var newPath : string[] = [];
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


  goToRoot(){
    this.pathActual = this.clone(this.datos);
    this.path = []
  }


}
