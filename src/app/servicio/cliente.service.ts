import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { datosGenerales } from '../config/datos.generales';
import { ClienteModelo } from '../modelos/cliente.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url: String = datosGenerales.urlBackend;
  token?: String = "";

  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = servicioSeguridad.ObtenerToken();

  }

  ListarRegistros(): Observable<ClienteModelo[]> {
    return this.http.get<ClienteModelo[]>(`${this.url}/clientes`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  BuscarRegistro(id: Number): Observable<ClienteModelo> {
    return this.http.get<ClienteModelo>(`${this.url}/clientes/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  GuardarRegistro(modelo: ClienteModelo): Observable<ClienteModelo> {
    return this.http.post<ClienteModelo>(`${this.url}/clientes`, {
      nombre: modelo.nombre,
      apellidos: modelo.apellidos,
      fechaNacimiento: modelo.fechaNacimiento,
      fotografia: modelo.fotografia,
      email: modelo.email,
      telefono: modelo.telefono,
      direccion: modelo.direccion
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  AutualizarRegistro(modelo: ClienteModelo): Observable<ClienteModelo> {
    return this.http.put<ClienteModelo>(`${this.url}/clientes/${modelo.id}`, modelo, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  EliminarRegistro(modelo: ClienteModelo): Observable<any> {
    return this.http.delete<any>(`${this.url}/clientes/${modelo.id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }


}
