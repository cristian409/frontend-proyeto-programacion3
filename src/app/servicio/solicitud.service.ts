import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { datosGenerales } from '../config/datos.generales';
import { InmuebleModelo } from '../modelos/inmueble.modelo';
import { SolicitudModelo } from '../modelos/solicitud.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  url: String = datosGenerales.urlBackend;
  token?: String = "";

  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = servicioSeguridad.obtenerToken();

  }

  ListarRegistros(): Observable<SolicitudModelo[]> {
    return this.http.get<SolicitudModelo[]>(`${this.url}/solicitud-inmuebles/`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  BuscarRegistro(id?: Number): Observable<SolicitudModelo> {
    return this.http.get<SolicitudModelo>(`${this.url}/solicitud-inmuebles/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  GuardarRegistro(modelo: SolicitudModelo): Observable<SolicitudModelo> {
    return this.http.post<SolicitudModelo>(`${this.url}/solicitud-inmuebles/`, {
      fecha: modelo.fecha,
      ofertaEconomica: modelo.ofertaEconomica,
      estado: modelo.estado,
      inmuebleId: modelo.inmuebleId,
      clienteId: modelo.clienteId,
      aceptarCancelarSolicitud: modelo.aceptarCancelarSolicitud
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }


  ActualizarRegistro(modelo: SolicitudModelo): Observable<SolicitudModelo> {
    return this.http.put<SolicitudModelo>(`${this.url}/solicitud-inmuebles/${modelo.id}`, modelo, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  EliminarRegistro(modelo: SolicitudModelo): Observable<any> {
    return this.http.delete<any>(`${this.url}/solicitud-inmuebles/${modelo.id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }


}
