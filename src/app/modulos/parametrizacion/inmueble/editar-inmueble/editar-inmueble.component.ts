import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { BloqueService } from 'src/app/servicio/bloque.service';
import { InmuebleService } from 'src/app/servicio/inmueble.service';

declare const abrirModal: any;
@Component({
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css']
})
export class EditarInmuebleComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  listaBloque: BloqueModelo[] = [];
  codigo: number = 0;
  solicitud?: String="";
  constructor(private fb: FormBuilder,
    private servicio: InmuebleService,
    private router: Router,
    private servicioInmueble:BloqueService,
    private route: ActivatedRoute) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      codigo: ['', Validators.required],
      identificador: ['', Validators.required],
      valor: ['', Validators.required],
      bloqueId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.cargarProyectos();
  }

  cargarProyectos() {
    this.servicioInmueble.listarRegistros().subscribe(
      (datos) => {
        this.listaBloque = datos;
        this.buscarRegistro();
      },
      (error) => {
        abrirModal("¡Error!", "Error cargando los proyecto.");
      }
    );
  }

  buscarRegistro() {
    this.codigo = this.route.snapshot.params["codigo"];
    this.servicio.buscarRegistro(this.codigo).subscribe(
      (datos) => {
        this.obtenerFGV.codigo.setValue(datos.codigo);
        this.obtenerFGV.identificador.setValue(datos.identificador);
        this.obtenerFGV.valor.setValue(datos.valor);
        this.obtenerFGV.bloqueId.setValue(datos.bloqueId);
        this.solicitud = datos.solicitud;
      },
      (error) => {
        abrirModal("¡Error!", "Error no se encontro registro de inmueble.");
      }
    );
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  GuardarRegistro() {
    let ide = this.obtenerFGV.identificador.value;
    let val = parseInt(this.obtenerFGV.valor.value);
    let bId = this.obtenerFGV.bloqueId.value;
    let codigo = this.obtenerFGV.codigo.value;
    let obj = new InmuebleModelo();
    obj.codigo = codigo;
    obj.identificador = ide;
    obj.valor = val;
    obj.bloqueId = bId;
    obj.solicitud = this.solicitud;
    this.servicio.actualizarRegistro(obj).subscribe(
      (datos) => {
        abrirModal("Información", "Registro del inmueble actulizado.");
        this.router.navigate(["/parametros/listar-inmuebles"]);
      },
      (error) => {
        abrirModal("¡Error!", "Error no se concluyo el guardado del registro.");
      }
    );
  }


}
