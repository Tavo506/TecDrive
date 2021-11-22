import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  sendInformation(username: String,tamanoBytes: number){
    if(username==='' || (isNaN(tamanoBytes) || tamanoBytes <= 9)){
      Swal.fire({
        title : "Error 101",
        text : "Los campos no pueden ir vacíos.",
        icon : 'error'
      })
      return
    }
    this.authService.register(tamanoBytes,username);
    console.log(username)
    console.log(tamanoBytes)

  }
  
}
