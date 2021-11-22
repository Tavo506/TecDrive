import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {



  constructor( private authService : AuthService) {}


  ngOnInit(): void { }
  
  sendUserName(){
    var username = (<HTMLInputElement>document.getElementById("inputUser")).value;
    if(username === ''){
      Swal.fire({
        title : "Error 101",
        text : "Debe introducir su nombre de usuario.",
        icon : 'error'
        
      })
      return
    ;}
    this.authService.login(username);
  }
}
