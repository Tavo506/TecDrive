import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Archivo, Carpeta, Contenido } from 'src/app/models/Contenido.model';
import { DriveService } from 'src/app/services/drive.service';
import { directorySearchModal } from 'src/app/widgets/modals/directorySearch';
import { fileCreateModal } from 'src/app/widgets/modals/fileCreate';
import { fileViewModal } from 'src/app/widgets/modals/fileView';
import { propiedadesModal } from 'src/app/widgets/modals/propiedades';

import Swal from 'sweetalert2'





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  datos: Contenido;
  usuario: string = "";

  pathActual: Contenido;

  path: string[] = [];

  constructor(
    private driveService: DriveService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
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


  clone(lista: Contenido): Contenido {
    var res: Contenido;

    res = { ...lista }

    return res
  }




  refresh() {

  }


  /*
      ========================================
                Funciones de crear
      ========================================
  */


  crearArchivo() {
    const modalRef = this.modalService.open(fileCreateModal, { size: 'xl', scrollable: true, centered: true });

    modalRef.result.then((result) => {

      if (result.accion == 'guardar') {

        console.log(result.res);


      }

    }, (reason) => {
      //`Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  crearCarpeta() {

    Swal.fire({
      title: "Crear directorio",
      input: "text",
      inputPlaceholder: "Nombre",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const archivo = result.value;
        console.log(archivo);

      }
    })

  }





  /*
       ========================================
                 Funciones de cargar
       ========================================
   */



  cargarArchivo() {

    Swal.fire({
      title: "Cargar un archivo",
      input: "file",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result);

      }
    })

  }



  cargarCarpeta() {

    Swal.fire({
      title: "Cargar una carpeta",
      html: "<input type='file' id='ctrl' webkitdirectory directory multiple>",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        //Carga el archivo
      }
    })

  }







  /*
      ========================================
        Funciones de la ventana de acciones
      ========================================
  */


  // Editar / Ver un archivo
  open(archivo: Archivo) {
    const modalRef = this.modalService.open(fileViewModal, { size: 'xl', scrollable: true, centered: true });
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



  verPropiedades(contenido: Archivo | Carpeta) {

    const modalRef = this.modalService.open(propiedadesModal, { scrollable: true, centered: true });
    modalRef.componentInstance.contenido = contenido;
    modalRef.componentInstance.build();
  }



  compartir(contenido: Archivo | Carpeta) {

    Swal.fire({
      title: "Compartir",
      input: "text",
      inputPlaceholder: "Usuario para compartir",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const usuario = result.value.replace(" ", "_");
        const tipo = contenido.tipo == "archivo" ? contenido.extension : "carpeta";
        this.driveService.compartir(this.usuario, usuario, this.path.join("/"), contenido.nombre, tipo)

      }
    })

  }




  descargar(archivo: Archivo) {
    if (archivo.tipo == "archivo") {
      const text = archivo.contenido;
      const filename = archivo.nombre + "." + archivo.extension;

      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
  }





  seleccionarCarpeta(): Promise<{ confirm: boolean, value: any }> {

    return new Promise((resolve, reject) => {


      const modalRef = this.modalService.open(directorySearchModal, { size: 'lg', scrollable: true, centered: true });
      modalRef.componentInstance.datos = this.datos;
      modalRef.componentInstance.usuario = this.usuario;
      modalRef.componentInstance.build();

      modalRef.result.then((result) => {

        if (result.accion == 'guardar') {

          resolve({ confirm: true, value: result.res });
        } else {
          resolve({ confirm: false, value: "" });
        }

      }, (reason) => {
        resolve({ confirm: false, value: "" });
      });

    })
  }



  copiar(archivo: Archivo | Carpeta) {

    this.seleccionarCarpeta().then(rutaCopiar => {

      if (rutaCopiar.confirm) {      

        const tipo = archivo.tipo == "archivo" ? archivo.extension : "carpeta";

        this.driveService.copiar(this.path.join("/"), archivo.nombre, tipo, rutaCopiar.value.join("/"));
      }

    });

  }


  mover(archivo: Archivo | Carpeta) {

    this.seleccionarCarpeta().then(rutaCopiar => {

      if (rutaCopiar.confirm) {

        const tipo = archivo.tipo == "archivo" ? archivo.extension : "carpeta";

        this.driveService.mover(this.path.join("/"), archivo.nombre, tipo, rutaCopiar.value.join("/"));
      }

    });

  }





  prepararParaEliminar(listaArchivos: string[], listaTipos: string[], archivo) {

  }


  eliminarUno(path: string[], archivo: Archivo | Carpeta) {
    var nombre = archivo.nombre;
    var extension = "";
    var mensaje = nombre;

    if (archivo.tipo == 'archivo') {
      extension = (archivo as (Archivo)).extension;
      mensaje += `.${extension}`;

    } else {
      extension = "Directorio";
    }


    Swal.fire({
      title: `¿Eliminar ${mensaje}?`,
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.driveService.eliminar(path.join("/"), [nombre], [extension]);

        Swal.fire(
          'Eliminado!',
          'El contenido se ha eliminado',
          'success'
        )
      }
    })

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
