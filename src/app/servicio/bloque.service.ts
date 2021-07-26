import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { datosGenerales } from '../config/datos.generales';
import { BloqueModelo } from '../modelos/bloque.modelo';
import { InmuebleModelo } from '../modelos/inmueble.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class BloqueService {

  url: String = datosGenerales.urlBackend;
  token?: String = "";
  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = servicioSeguridad.obtenerToken();
  }

  listarRegistros(): Observable<BloqueModelo[]> {
    return this.http.get<BloqueModelo[]>(`${this.url}/bloques/`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  buscarRegistro(codigo: number): Observable<BloqueModelo> {
    return this.http.get<BloqueModelo>(`${this.url}/bloques/${codigo}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  buscarRegistroInmuble(codigo: number): Observable<InmuebleModelo[]> {
    return this.http.get<InmuebleModelo[]>(`${this.url}/bloques/${codigo}/inmuebles`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  guardarRegistro(modelo: BloqueModelo): Observable<BloqueModelo> {
    let idProyecto = 0;
    if (modelo.proyectoId) {
      idProyecto = parseInt(modelo.proyectoId.toString());
    }
    return this.http.post<BloqueModelo>(`${this.url}/bloques`, {
      codigo: modelo.codigo,
      nombre: modelo.nombre,
      descripcion: modelo.descripcion,
      proyectoId: idProyecto
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  actualizarRegistro(modelo: BloqueModelo): Observable<BloqueModelo> {
    let idProyecto = 0;
    if (modelo.proyectoId) {
      idProyecto = parseInt(modelo.proyectoId.toString());
    }
    return this.http.put<BloqueModelo>(`${this.url}/bloques/${modelo.codigo}`, {
      nombre: modelo.nombre,
      descripcion: modelo.descripcion,
      proyectoId: idProyecto
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  eliminarRegistro(modelo: BloqueModelo): Observable<any> {
    return this.http.delete<any>(`${this.url}/bloques/${modelo.codigo}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
}
