import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { SolicitudModelo } from 'src/app/modelos/solicitud.modelo';
import { ClienteService } from 'src/app/servicio/cliente.service';
import { InmuebleService } from 'src/app/servicio/inmueble.service';
import { SolicitudService } from 'src/app/servicio/solicitud.service';

declare const abrirModal: any;
@Component({
  selector: 'app-editar-solicitud',
  templateUrl: './editar-solicitud.component.html',
  styleUrls: ['./editar-solicitud.component.css']
})
export class EditarSolicitudComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  listaInmueble: InmuebleModelo[] = [];
  listaClientes: ClienteModelo[] = [];
  id: number = 0;

  constructor(private fb: FormBuilder,
    private servicio: SolicitudService,
    private servicioCliente: ClienteService,
    private router: Router,
    private servicioInmueble: InmuebleService,
    private route: ActivatedRoute) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      id: ['', Validators.required],
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
    this.buscarRegistro();
  }

  ListarInmuebles() {
    this.servicioInmueble.listarRegistros().subscribe(
      (datos) => {
        this.listaInmueble = datos;
      },
      (error: any) => {
        abrirModal('Información', 'Error cargando los inmuebles');
      }
    );
  }

  ListarClientes() {
    this.servicioCliente.ListarRegistros().subscribe(
      (datos) => {
        this.listaClientes = datos;
      },
      (error: any) => {
        abrirModal('Información', 'Error cargando los clientes.');
      }
    );
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  buscarRegistro() {
    this.id = this.route.snapshot.params["id"];
    this.servicio.BuscarRegistro(this.id).subscribe(
      (datos) => {
        this.obtenerFGV.id.setValue(datos.id);
        this.obtenerFGV.fecha.setValue(datos.fecha);
        this.obtenerFGV.inmuebleId.setValue(datos.inmuebleId);
        this.obtenerFGV.clienteId.setValue(datos.clienteId);
        this.obtenerFGV.oferta.setValue(datos.ofertaEconomica);
        this.obtenerFGV.estudio.setValue(datos.estado);
      },
      (error) => {
        abrirModal("¡Error!", "No se encuentran los datos");
      }
    );
  }

  GuardarRegistro() {
    let id = this.obtenerFGV.id.value;
    let fecha = this.obtenerFGV.fecha.value;
    let inmuebleId = this.obtenerFGV.inmuebleId.value;
    let clienteId = this.obtenerFGV.clienteId.value;
    let oferta = this.obtenerFGV.oferta.value;
    let estudio = this.obtenerFGV.estudio.value;

    let obj = new SolicitudModelo();
    obj.id = id;
    obj.fecha = fecha;
    obj.inmuebleId = inmuebleId;
    obj.clienteId = clienteId;
    obj.ofertaEconomica = oferta;
    obj.estado = estudio;

    this.servicio.ActualizarRegistro(obj).subscribe(
      (datos) => {
        abrirModal('Información', 'Registro almacenado correctamente.');
        this.router.navigate(["/solicitud/listar-solicitud"]);
      },
      (error: any) => {
        abrirModal('Error', 'Error al guardar el registro.');
      }
    );
  }

}
