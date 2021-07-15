import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { datosGenerales } from '../config/datos.generales';
import { CiudadModelo } from '../modelos/ciudad.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  url: String = datosGenerales.urlBackend;
  token?: String = "";
  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = servicioSeguridad.obtenerToken();
  }

  listarRegistros(): Observable<CiudadModelo[]> {
    return this.http.get<CiudadModelo[]>(`${this.url}/ciudades/`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  buscarRegistro(codigo: number): Observable<CiudadModelo> {
    return this.http.get<CiudadModelo>(`${this.url}/ciudades/${codigo}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  guardarRegistro(modelo: CiudadModelo): Observable<CiudadModelo> {
    let idPais = 0;
    if (modelo.paisId) {
      idPais = parseInt(modelo.paisId.toString());
    }
    return this.http.post<CiudadModelo>(`${this.url}/ciudades`, {
      nombre: modelo.nombre,
      paisId: idPais
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  actualizarRegistro(modelo: CiudadModelo): Observable<CiudadModelo> {
    let idPais = 0;
    if (modelo.paisId) {
      idPais = parseInt(modelo.paisId.toString());
    }
    return this.http.put<CiudadModelo>(`${this.url}/ciudades/${modelo.codigo}`, {
      nombre: modelo.nombre,
      paisId: idPais
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  eliminarRegistro(modelo: CiudadModelo): Observable<any> {
    return this.http.delete<any>(`${this.url}/ciudades/${modelo.codigo}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
}
