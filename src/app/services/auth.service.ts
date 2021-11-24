import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from "./config";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = `http://${config.IP}${config.base}`


  constructor(private http: HttpClient) { }


  async callService(enlace): Promise<any> {
    return new Promise((response, reject) => {

      this.http.get(enlace).subscribe(res => {
        response(res);
      })

    })
  }




  async getDrive(userName: string): Promise<any> {

    const enlace = `${this.url}LogIn?username=${userName}`;

    const res = await this.callService(enlace);

    return res;
  }



  async login(userName: String): Promise<any> {
    const user = userName.replace(/ /gi, "_")

    const enlace = `${this.url}LogIn?username=${user}`;

    const res = await this.callService(enlace);

    return res;

  }

  async register(bytes: Number, userName: String): Promise<any> {
    const user = userName.replace(/ /gi, "_")
    
    const enlace = `${this.url}Register?nombre=${user}&bytes=${bytes}`;

    console.log(enlace);
    
    const res = await this.callService(enlace);

    return res;
  }

}
