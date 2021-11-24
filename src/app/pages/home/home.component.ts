import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Archivo, Carpeta, Contenido } from 'src/app/models/Contenido.model';
import { DriveService } from 'src/app/services/drive.service';
import { directorySearchModal } from 'src/app/widgets/modals/directorySearch';
import { fileCreateModal } from 'src/app/widgets/modals/fileCreate';
import { fileViewModal } from 'src/app/widgets/modals/fileView';
import { propiedadesModal } from 'src/app/widgets/modals/propiedades';
import { newArchivo, newCarpeta } from 'src/app/functions/fileFunctions';
import Swal from 'sweetalert2'
import { HtmlParser } from '@angular/compiler';
import { sizeOfFile } from 'src/app/functions/sizeFunctions';





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

  nombresSeleccionados: string[] = []
  tiposSeleccionados: string[] = []
  indexSeleccionados: number[] = []

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

    this.driveService.getDrive(this.usuario).then(res => {
      this.datos = res;
      this.pathActual = this.clone(this.datos);

    });
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
  }


  clone(lista: Contenido): Contenido {
    var res: Contenido;

    res = { ...lista }

    return res
  }



  getUserPath(): string {
    return `${this.usuario}/${this.path.join("/")}`;
  }



  refresh() {
    this.driveService.getDrive(this.usuario).then(res => {
      this.datos = res;
      this.pathActual = this.clone(this.datos);

      this.go(this.path);
      this.limpiarSeleccion();

    });
  }


  seleccionarArchivo(archivo: Archivo | Carpeta, i: number) {

    const tipo = archivo.tipo == "carpeta" ? archivo.tipo : archivo.extension
    const nombre = archivo.nombre;

    var iNombre, iTipo;
    var agregar = true;
    var index;

    for (let i = 0; i < this.nombresSeleccionados.length; i++) {
      iNombre = this.nombresSeleccionados[i];
      iTipo = this.tiposSeleccionados[i];

      if (tipo == iTipo && nombre == iNombre) {
        agregar = false;
        index = i;
        break;
      }
    }


    if (agregar) {
      this.nombresSeleccionados.push(nombre);
      this.tiposSeleccionados.push(tipo);
      this.indexSeleccionados.push(i);
    } else {
      this.nombresSeleccionados.splice(index, 1);
      this.tiposSeleccionados.splice(index, 1);
      this.indexSeleccionados.splice(index, 1);
    }

  }


  verInfo(){
    const modalRef = this.modalService.open(propiedadesModal, { scrollable: true, centered: true });
    modalRef.componentInstance.contenido = this.datos;
    modalRef.componentInstance.build();
  }



  estaSeleccionado(i: number) {

    return this.indexSeleccionados.includes(i);
  }


  limpiarSeleccion() {

    this.nombresSeleccionados = [];
    this.tiposSeleccionados = [];
    this.indexSeleccionados = [];
  }


  get haySeleccion() {
    return this.nombresSeleccionados.length > 0
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

        var nombre = result.res.nombre;
        var extension = result.res.extension
        var texto = result.res.texto;


        this.driveService.crearArchivo(this.getUserPath(), nombre, extension, texto).then(res => {

          console.log(res);
          
          if (res.OK) {
            this.refresh();
          } else if (res.Error == `El nombre '${nombre}' ya existe en la ruta actual.`) {
            Swal.fire({
              title: `¿Sobreescribir archivo?`,
              text: "Esta acción no se puede deshacer",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Aceptar',
              cancelButtonText: 'Cancelar'
            }).then((result) => {
              if (result.isConfirmed) {
                this.driveService.modificarArchivo(this.getUserPath(), nombre, extension, texto, true).then(res2 => {
                  if (!res2.OK) {
                    Swal.fire(
                      "Error",
                      "Error al sobreescribir el archivo",
                      "error"
                    )
                  } else {
                    this.refresh();
                  }
                })
              }
            });
          }else{
            Swal.fire(
              "Error",
              res.Error,
              "error"
            )
          }

        })


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
        const nombre = result.value;

        this.driveService.crearDirectorio(this.getUserPath(), nombre).then(res => {

          if (res.OK) {

            this.refresh()

          } else {

            Swal.fire({
              title: `¿Sobreescribir directorio?`,
              text: "Esta acción no se puede deshacer",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Aceptar',
              cancelButtonText: 'Cancelar'
            }).then((result) => {
              if (result.isConfirmed) {
                this.driveService.crearDirectorio(this.getUserPath(), nombre, true);
                this.refresh();
              }

            });

          }

        });

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
        var file: Archivo = this.parsearArchivo(result.value);
        this.sendFileBackEnd(file)
      }
    })

  }



  cargarCarpeta() {

    Swal.fire({
      title: "Cargar una carpeta",
      html: "<input type='file' webkitdirectory directory multiple id=directory >",
      preConfirm: () => { return document.getElementById('directory') },
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        var directoryName = this.getDirectoryName((<any>(<HTMLInputElement>result.value).files[0]).webkitRelativePath)
        console.log(directoryName)
        var ruta = this.getUserPath() + '/' + directoryName;
        ruta = ruta.replace('//','/')
        this.driveService.crearDirectorio(this.getUserPath(), this.getDirectoryName((<any>(<HTMLInputElement>result.value).files[0]).webkitRelativePath)).then(res => {
          if (res.OK) {

            this.refresh();
            setTimeout(() => {


              for (let i = 0; i < (<HTMLInputElement>result.value).files.length; i++) {
                var file: Archivo = this.parsearArchivo((<HTMLInputElement>result.value).files[i]);
                console.log(file)
                this.sendFileBackEnd(file, ruta);
              }
            }, 2000);

          } else {
            Swal.fire(
              "Error",
              res.Error,
              "error"
            )
          }

        });
        //Carga el archivo
      }
    })

  }

  parsearArchivo(file: File): Archivo {
    var archivo: Archivo = newArchivo();
    var spliData = file.name.split('.')
    archivo.nombre = spliData[0];
    archivo.extension = spliData[1];
    archivo.tamano = file.size;
    file.text().then(data => { archivo.contenido = data });

    return archivo;
  }

  getDirectoryName(string: string): string {
    var splitString = string.split('/');
    return (splitString[0])
  }

  sendFileBackEnd(file: Archivo, directory: string = this.getUserPath()) {

    setTimeout(() => {

      console.log(file)

      this.driveService.crearArchivo(directory, file.nombre, file.extension, file.contenido).then(res => {

        if (res.OK) {
          this.refresh();
        } else {
          Swal.fire({
            title: `¿Sobreescribir archivo?`,
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.driveService.modificarArchivo(directory, file.nombre, file.extension, file.contenido, true).then(res2 => {
                if (!res2.OK) {
                  Swal.fire(
                    "Error",
                    "Error al sobreescribir el archivo",
                    "error"
                  )
                } else {
                  this.refresh();
                }
              })
            }
          });
        }

      })

    }, 500);
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
        archivo.contenido = result.res;

        this.driveService.modificarArchivo(this.getUserPath(), archivo.nombre, archivo.extension, archivo.contenido).then(res => {

          if (res.OK) {
            this.refresh();
          }
        })

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
        const usuario = result.value.replace(/ /gi, "_");
        const tipo = contenido.tipo == "archivo" ? contenido.extension : "carpeta";
        this.driveService.compartir(this.usuario, usuario, this.getUserPath(), contenido.nombre, tipo).then(res => {

          if (res.OK) {
            Swal.fire({
              title: "Archivo compartido!",
              icon: "success"
            })
          } else {
            Swal.fire({
              title: "Error!",
              icon: "error",
              text: res.Error
            })
          }

        });

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

        this.driveService.copiar(this.getUserPath(), archivo.nombre, tipo, this.usuario + "/" + rutaCopiar.value.join("/")).then(res => {

          if (res.OK) {
            this.refresh();
            Swal.fire({
              title: "Archivo copiado!",
              icon: "success"
            })
          } else {
            Swal.fire({
              title: "Error",
              icon: "error",
              text: "El archivo ya existe en la ruta seleccionada"
            })
          }

        });
      }

    });

  }


  mover(archivo: Archivo | Carpeta) {

    this.seleccionarCarpeta().then(rutaCopiar => {

      if (rutaCopiar.confirm) {

        const tipo = archivo.tipo == "archivo" ? archivo.extension : "carpeta";

        this.driveService.mover(this.getUserPath(), archivo.nombre, tipo, this.usuario + "/" + rutaCopiar.value.join("/")).then(res => {

          if (res.OK) {
            this.refresh();
            Swal.fire({
              title: "Archivo movido!",
              icon: "success"
            })
          } else {
            Swal.fire({
              title: "Error",
              icon: "error",
              text: "El archivo ya existe en la ruta seleccionada"
            })
          }

        });
      }

    });

  }





  eliminar() {
    Swal.fire({
      title: `¿Eliminar los ${this.nombresSeleccionados.length} archivos seleccionados?`,
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.driveService.eliminar(this.getUserPath(), this.nombresSeleccionados, this.tiposSeleccionados).then(res => {

          this.refresh();
          this.limpiarSeleccion();

          Swal.fire(
            'Eliminado!',
            'El contenido se ha eliminado',
            'success'
          )
        });
      }
    })
  }


  eliminarUno(archivo: Archivo | Carpeta) {
    var nombre = archivo.nombre;
    var extension = "";
    var mensaje = nombre;

    if (archivo.tipo == 'archivo') {
      extension = (archivo as (Archivo)).extension;
      mensaje += `.${extension}`;

    } else {
      extension = "carpeta";
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
        this.driveService.eliminar(this.getUserPath(), [nombre], [extension]).then(res => {

          this.refresh();

          Swal.fire(
            'Eliminado!',
            'El contenido se ha eliminado',
            'success'
          )
        });
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
    this.limpiarSeleccion()

  }


  go(path: string[]) {
    this.pathActual = this.clone(this.datos);
    var lista;

    for (let index = 0; index < path.length; index++) {
      const e = path[index];


      lista = this.pathActual.contenido as Object;
      lista = lista.filter(n => n.nombre == e && n.tipo == 'carpeta')[0] as Contenido
      this.pathActual = lista;
    }

    return

  }


  goBackTo(ruta: string) {
    var newPath: string[] = [];
    var parar = false;
    this.path.forEach(e => {


      if (!parar) {

        newPath.push(e);

        if (e == ruta) {
          parar = true;

          if (this.path != newPath) {


            this.path = newPath;

            this.go(newPath);
            this.limpiarSeleccion()
          }
        }
      }
    });

    return

  }


  goToRoot() {


    if (this.path.length > 0) {


      this.pathActual = this.clone(this.datos);
      this.path = []

      this.limpiarSeleccion()
    }


    return
  }


}
