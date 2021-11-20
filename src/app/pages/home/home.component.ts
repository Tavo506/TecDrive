import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriveService } from 'src/app/services/drive.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  datos = {}
  usuario : string;

  constructor(private driveService : DriveService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.usuario = params["user"]
    })

    this.datos = this.driveService.getDrive(this.usuario);
  }

}
