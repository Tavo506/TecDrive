import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {



  constructor( private authService : AuthService, private router : Router) {}


  ngOnInit(): void { }
  
  sendUserName(username:string){
    
    username = username.replace(/ /gi,"_");
    if(username === ''){
      Swal.fire({
        title : "Error 101",
        text : "Debe introducir su nombre de usuario.",
        icon : 'error'
        
      })
      return
    ;}
    
    this.authService.login(username).then(res => {

      if (res.Error) {
        Swal.fire(
          'Error!',
          res.Error,
          'error'
        )
      }else{
        this.router.navigate(["/home",username]);
      }
    });
  

  }
}
