import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { datosGenerales } from '../config/datos.generales';
import { usuarioModelo } from '../modelos/usuario.modelo';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  url: String = datosGenerales.urlBackend;
  datosUsuarioSession = new BehaviorSubject<usuarioModelo>(new usuarioModelo());

  constructor(private http: HttpClient) {
    this.verificarDatosSession();
  }

  verificarDatosSession() {
    let datos = this.obtenerDatosLocalStorage();
    if (datos) {
      let objetoDatos: usuarioModelo = JSON.parse(datos);
      objetoDatos.isLoggedIn = true;
      this.refrescarDatosSession(objetoDatos);
    }
  }

  obtenerDatosLocalStorage() {
    let datos = localStorage.getItem("sessionData");
    return datos;
  }

  refrescarDatosSession(usuario: usuarioModelo) {
    this.datosUsuarioSession.next(usuario);
  }

  obtenerDatosSession() {
    return this.datosUsuarioSession.asObservable();
  }

  identificarUsuario(usuario: usuarioModelo): Observable<any> {
    return this.http.post<any>(`${this.url}/identificar`, {
      correo: usuario.email,
      clave: usuario.contraseña
    }, {
      headers: new HttpHeaders({

      })
    });
  }

  guardarDatosEnLocal(usuario: usuarioModelo): Boolean {
    let datosLocales = localStorage.getItem("sessionData");
    if (datosLocales) {
      return false;
    } else {
      let datos = {
        id: usuario.user?.id,
        username: usuario.user?.email,
        token: usuario.token
      };
      let datosString = JSON.stringify(datos);
      localStorage.setItem("sessionData", datosString);
      usuario.isLoggedIn = true;
      this.refrescarDatosSession(usuario);
      return true;
    }
  }

  cerrarSesion(){
    localStorage.removeItem("sessionData");
    this.refrescarDatosSession(new usuarioModelo());
  }

}
