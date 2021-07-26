import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { SolicitudModelo } from 'src/app/modelos/solicitud.modelo';
import { ClienteService } from 'src/app/servicio/cliente.service';
import { InmuebleService } from 'src/app/servicio/inmueble.service';
import { SolicitudService } from 'src/app/servicio/solicitud.service';
import { SolicitudInmuebleModule } from '../solicitud-inmueble.module';

declare const abrirModal: any;
@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  listaInmueble: InmuebleModelo[] = [];
  listaClientes: ClienteModelo[] = [];

  constructor(private fb: FormBuilder,
    private servicio: SolicitudService,
    private servicioCliente: ClienteService,
    private router: Router,
    private servicioInmueble: InmuebleService) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      fecha: ['', Validators.required],
      inmuebleId: ['', Validators.required],
      clienteId: ['', Validators.required],
      oferta: ['', Validators.required],
      estudio: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.ListarInmuebles();
    this.ListarClientes();
  }

  ListarInmuebles() {
    this.servicioInmueble.listarRegistros().subscribe(
      (datos) => {
        datos.forEach(inmueble => {
          if (inmueble.solicitud == "Pendiente") {
            this.listaInmueble.push(inmueble);
          }
        });
      },
      (error: any) => {
        abrirModal('¡Error!', 'Error cargando los inmuebles');
      }
    );
  }


  ListarClientes() {
    this.servicioCliente.ListarRegistros().subscribe(
      (datos) => {
        this.listaClientes = datos;
      },
      (error: any) => {
        abrirModal('¡Error!', 'Error cargando los clientes.');
      }
    );
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  GuardarRegistro() {
    let fecha = this.obtenerFGV.fecha.value;
    let inmuebleId = parseInt(this.obtenerFGV.inmuebleId.value);
    let clienteId = parseInt(this.obtenerFGV.clienteId.value);
    let oferta = this.obtenerFGV.oferta.value;
    let estudio = this.obtenerFGV.estudio.value;

    let obj = new SolicitudModelo();
    obj.fecha = fecha;
    obj.inmuebleId = inmuebleId;
    obj.clienteId = clienteId;
    obj.ofertaEconomica = oferta;
    obj.estado = estudio;

    obj.aceptarCancelarSolicitud = "Pendiente"

    this.servicioInmueble.buscarRegistro(inmuebleId).subscribe(
      (inmueble) =>{
        inmueble.solicitud = estudio;
        this.servicioInmueble.actualizarRegistro(inmueble).subscribe(
          (datos)=>{
            this.servicio.GuardarRegistro(obj).subscribe(
              (datos) => {
                abrirModal('Información', 'Registro almacenado correctamente.');
                this.router.navigate(["/solicitud/listar-solicitud"]);
              },
              (error: any) => {
                abrirModal('Error', 'Error al guardar el registro.');
              }
            );
          },
          (error: any)=>{
            abrirModal('Error', 'Error al acutlizar el registro del inmueble.');
          }
        );
      },
      (error: any) =>{
        abrirModal('Error', 'Error al buscar el registro del inmueble.');
      }
    );
  }

}
