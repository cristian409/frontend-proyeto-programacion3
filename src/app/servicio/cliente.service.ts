import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { datosGenerales } from '../config/datos.generales';
import { CargaArchivoModel } from '../modelos/carga.archivo.modelo';
import { ClienteModelo } from '../modelos/cliente.modelo';
import { FinancieraModelo } from '../modelos/financiera.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url: String = datosGenerales.urlBackend;
  token?: String = "";

  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = servicioSeguridad.obtenerToken();

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
      direccion: modelo.direccion,
      ciudadId: modelo.ciudadId
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  GuardarImagen(formData: FormData): Observable<CargaArchivoModel> {
    return this.http.post<CargaArchivoModel>(`${this.url}/CargarImagenCliente`, formData, {
      headers: new HttpHeaders({

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

  BuscarRegistroFinanciera(id: Number): Observable<FinancieraModelo> {
    return this.http.get<FinancieraModelo>(`${this.url}/clientes/${id}/financiera`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  AutualizarRegistroFinanciera(id: Number, modelo: FinancieraModelo): Observable<FinancieraModelo> {
    return this.http.patch<FinancieraModelo>(`${this.url}/clientes/${id}/financiera`, modelo, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  GuardarRegistroFinanciera(modelo: FinancieraModelo): Observable<FinancieraModelo> {
    let idCliente = 0;
    if (modelo.clienteId) {
      idCliente = parseInt(modelo.clienteId.toString());
    }
    return this.http.post<FinancieraModelo>(`${this.url}/clientes/${modelo.clienteId}/financiera`, {
      totalIngresos: modelo.totalIngresos,
      datosTrabajo: modelo.datosTrabajo,
      tiempoTrabajoActual: modelo.tiempoTrabajoActual,
      nombreReferenciaFamiliar: modelo.nombreReferenciaFamiliar,
      telefonoReferenciaFamiliar: modelo.telefonoReferenciaFamiliar,
      nombreReferenciaPersonal: modelo.nombreReferenciaPersonal,
      telefonoReferenciaPersonal: modelo.telefonoReferenciaPersonal,
      clienteId: idCliente
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }


}
