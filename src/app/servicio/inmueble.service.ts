import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { datosGenerales } from '../config/datos.generales';
import { InmuebleModelo } from '../modelos/inmueble.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  url: String = datosGenerales.urlBackend;
  token?: String = "";
  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = servicioSeguridad.obtenerToken();
  }

  listarRegistros(): Observable<InmuebleModelo[]> {
    return this.http.get<InmuebleModelo[]>(`${this.url}/inmuebles/`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  buscarRegistro(codigo: number): Observable<InmuebleModelo> {
    return this.http.get<InmuebleModelo>(`${this.url}/inmuebles/${codigo}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  guardarRegistro(modelo: InmuebleModelo): Observable<InmuebleModelo> {
    let idBloque = 0;
    if (modelo.bloqueId) {
      idBloque = parseInt(modelo.bloqueId.toString());
    }
    return this.http.post<InmuebleModelo>(`${this.url}/inmuebles`, {
      codigo: modelo.codigo,
      identificador: modelo.identificador,
      valor: modelo.valor,
      bloqueId: idBloque
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  actualizarRegistro(modelo: InmuebleModelo): Observable<InmuebleModelo> {
    let idBloque = 0;
    if (modelo.bloqueId) {
      idBloque = parseInt(modelo.bloqueId.toString());
    }
    return this.http.put<InmuebleModelo>(`${this.url}/inmuebles/${modelo.codigo}`, {
      identificador: modelo.identificador,
      valor: modelo.valor,
      bloqueId: idBloque
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  eliminarRegistro(modelo: InmuebleModelo): Observable<any> {
    return this.http.delete<any>(`${this.url}/inmuebles/${modelo.codigo}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
}
