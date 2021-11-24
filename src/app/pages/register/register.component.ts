import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  sendInformation(username: String, tamanoBytes: number) {
    if (username === '' || (isNaN(tamanoBytes) || tamanoBytes <= 9)) {
      Swal.fire({
        title: "Error 101",
        text: "Los campos no pueden ir vacíos.",
        icon: 'error'
      })
      return
    }
    this.authService.register(tamanoBytes, username).then(res => {

      if (res.Error) {
        Swal.fire(
          "Error!",
          res.Error,
          "error"
        )
      } else {
        console.log(res);
        
        this.router.navigate(["/home",username.replace(/ /gi, "_")]);
      }

    });


  }

}
