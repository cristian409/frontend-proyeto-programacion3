import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { datosGenerales } from '../config/datos.generales';
import { BloqueModelo } from '../modelos/bloque.modelo';
import { CargaArchivoModel } from '../modelos/carga.archivo.modelo';
import { ProyectoModelo } from '../modelos/proyecto.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  url: String = datosGenerales.urlBackend;
  token?: String = "";
  tipoProyecto: Number= 1;
  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = servicioSeguridad.obtenerToken();
  }

  listarRegistros(): Observable<ProyectoModelo[]> {
    return this.http.get<ProyectoModelo[]>(`${this.url}/proyectos/`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  buscarRegistro(codigo: Number): Observable<ProyectoModelo> {
    return this.http.get<ProyectoModelo>(`${this.url}/proyectos/${codigo}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  buscarRegistroBloque(codigo?: Number): Observable<BloqueModelo[]>{
    return this.http.get<BloqueModelo[]>(`${this.url}/proyectos/${codigo}/bloques`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  guardarRegistro(modelo: ProyectoModelo): Observable<ProyectoModelo> {
    let idCiudad = 0;
    if (modelo.ciudadId) {
      idCiudad = parseInt(modelo.ciudadId.toString());
    }
    return this.http.post<ProyectoModelo>(`${this.url}/proyectos`, {
      codigo: modelo.codigo,
      nombre: modelo.nombre,
      descripcion: modelo.descripcion,
      imagen: modelo.imagen,
      ciudadId: idCiudad
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  actualizarRegistro(modelo: ProyectoModelo): Observable<ProyectoModelo> {
    let idCiudad = 0;
    if (modelo.ciudadId) {
      idCiudad = parseInt(modelo.ciudadId.toString());
    }
    return this.http.put<ProyectoModelo>(`${this.url}/proyectos/${modelo.codigo}`, {
      nombre: modelo.nombre,
      descripcion: modelo.descripcion,
      imagen: modelo.imagen,
      ciudadId: idCiudad
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  eliminarRegistro(modelo: ProyectoModelo): Observable<any> {
    return this.http.delete<any>(`${this.url}/proyectos/${modelo.codigo}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  GuardarImagen(formData: FormData): Observable<CargaArchivoModel> {
    return this.http.post<CargaArchivoModel>(`${this.url}/CargarImagenProyecto`,  formData, {
      headers: new HttpHeaders({
       
      })
    });
  }

  DescargarImagen(proyecto: ProyectoModelo): Observable<any> {
    return this.http.post<any>(`${this.url}/${this.tipoProyecto}/${proyecto.imagen}`, {
      headers: new HttpHeaders({
       
      })
    });
  }
}