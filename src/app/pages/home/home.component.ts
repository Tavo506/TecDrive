import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Archivo, Contenido } from 'src/app/models/Contenido.model';
import { DriveService } from 'src/app/services/drive.service';

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

  constructor(private driveService : DriveService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.usuario = params["user"]
    })

    this.datos = this.driveService.getDrive(this.usuario);
    this.pathActual = this.clone(this.datos);    
  }


  clone(lista : Contenido) : Contenido{
    var res : Contenido;
    
    res = {...lista}

    return lista
  }


  open(archivo : Archivo){
    Swal.fire({
      title: `${archivo.nombre}.${archivo.extension}`
    })
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
