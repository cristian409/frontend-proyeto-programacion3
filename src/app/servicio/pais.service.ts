import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { datosGenerales } from '../config/datos.generales';
import { PaisModelo } from '../modelos/pais.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  url: String = datosGenerales.urlBackend;
  token?:String = "";
  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = servicioSeguridad.obtenerToken();
  }

  listarRegistros(): Observable<PaisModelo[]> {
    return this.http.get<PaisModelo[]>(`${this.url}/pais/`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  buscarRegistro(codigo: number): Observable<PaisModelo> {
    return this.http.get<PaisModelo>(`${this.url}/pais/${codigo}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  guardarRegistro(modelo: PaisModelo): Observable<PaisModelo> {
    return this.http.post<PaisModelo>(`${this.url}/pais`, {
      nombre: modelo.nombre
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  actualizarRegistro(modelo: PaisModelo): Observable<PaisModelo> {
    return this.http.put<PaisModelo>(`${this.url}/pais/${modelo.codigo}`, modelo, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  eliminarRegistro(modelo: PaisModelo): Observable<any> {
    return this.http.delete<any>(`${this.url}/pais/${modelo.codigo}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
}
