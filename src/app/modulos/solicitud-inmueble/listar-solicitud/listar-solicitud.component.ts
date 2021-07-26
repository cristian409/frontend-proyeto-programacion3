import { Component, OnInit } from '@angular/core';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { SolicitudModelo } from 'src/app/modelos/solicitud.modelo';
import { ClienteService } from 'src/app/servicio/cliente.service';
import { InmuebleService } from 'src/app/servicio/inmueble.service';
import { SolicitudService } from 'src/app/servicio/solicitud.service';

declare const abrirModal: any;
declare const confirmarModal: any;
@Component({
  selector: 'app-listar-solicitud',
  templateUrl: './listar-solicitud.component.html',
  styleUrls: ['./listar-solicitud.component.css']
})
export class ListarSolicitudComponent implements OnInit {

  pagina: number = 1;
  listaRegistros: SolicitudModelo[] = [];
  listaInmueble: InmuebleModelo[] = [];
  listaClientes: ClienteModelo[] = [];

  constructor(private servicio: SolicitudService,
    private servicioCliente: ClienteService,
    private servicioInmueble: InmuebleService) { }

  ngOnInit(): void {
    this.ListarRegistrosS();
  }

  ListarRegistrosS() {
    this.servicio.ListarRegistros().subscribe(
      (datos) => {
        this.listaRegistros = datos;
      },
      (error) => {
        abrirModal("Error", `Error listando las solicitudes.`);
      }
    );
  }

  verificarEliminacion() {
    confirmarModal("Confirmar Borrado", "Está seguro que quiere eliminar el registro?");
  }

  Eliminacion(codigo?: Number) {
    this.servicio.BuscarRegistro(codigo).subscribe(
      (solicitud) => {
        this.servicioInmueble.buscarRegistro(solicitud.inmuebleId).subscribe(
          (inmueble) => {
            inmueble.solicitud = "Pendiente";
            this.servicioInmueble.actualizarRegistro(inmueble).subscribe(
              ()=>{
                this.servicio.EliminarRegistro(solicitud).subscribe(
                  (datos) => {
                    abrirModal("Información", `La Solicitud numero ${codigo} a sido eliminado correctamente`);
                    this.listaRegistros = this.listaRegistros.filter(x => x.id != codigo);
                  },
                  (error) => {
                    abrirModal("¡Error!", `Error eliminando la solicitud numero ${codigo}`);
                  }
                );
              },
              (error: any)=>{
                abrirModal("¡Error!", `Error actualizando el registro del inmueble`);
              }
            );
          },
          (error: any) => {
            abrirModal("¡Error!", `Error buscando el registro del inmueble`);
          }
        );
      },
      (error: any) => {
        abrirModal("¡Error!", `Error buscando la solicitud`);
      }
    );
  }
}
