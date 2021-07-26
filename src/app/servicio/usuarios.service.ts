import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { datosGenerales } from '../config/datos.generales';
import { rolModelo } from '../modelos/rol.modelo';
import { usuarioModelo } from '../modelos/usuario.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url: String = datosGenerales.urlBackend;
  token?: String = "";

  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = servicioSeguridad.obtenerToken();

  }

  ListarRegistros(): Observable<usuarioModelo[]> {
    return this.http.get<usuarioModelo[]>(`${this.url}/usuarios/`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  BuscarRegistro(id: String): Observable<usuarioModelo> {
    return this.http.get<usuarioModelo>(`${this.url}/usuarios/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  BuscarRegistroRol(id?: String): Observable<rolModelo>  {
    return this.http.get<rolModelo>(`${this.url}/usuarios/${id}/rol/`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  ListarRegistrosRoles(): Observable<rolModelo[]> {
    return this.http.get<rolModelo[]>(`${this.url}/roles/`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  GuardarRegistro(modelo: usuarioModelo): Observable<usuarioModelo> {
    let ciudadId = 0;
    let rolId: String = "";
    if (modelo.rolId && modelo.id_ciudad) {
      ciudadId = parseInt(modelo.id_ciudad.toString());
      rolId = modelo.rolId;
    }
    return this.http.post<usuarioModelo>(`${this.url}/usuarios/`, {
      nombre: modelo.nombre,
      apellidoss: modelo.apellidoss,
      telefono: modelo.telefono,
      documento: modelo.documento,
      email: modelo.email,
      id_ciudad: ciudadId,
      rolId: rolId
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  AutualizarRegistro(modelo: usuarioModelo): Observable<usuarioModelo> {
    return this.http.put<usuarioModelo>(`${this.url}/usuarios/${modelo.id}/`, modelo, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  EliminarRegistro(modelo: usuarioModelo): Observable<any> {
    return this.http.delete<any>(`${this.url}/usuarios/${modelo.id}/`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }


}
