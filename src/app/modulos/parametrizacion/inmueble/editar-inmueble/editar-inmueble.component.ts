import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { BloqueService } from 'src/app/servicio/bloque.service';
import { InmuebleService } from 'src/app/servicio/inmueble.service';

@Component({
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css']
})
export class EditarInmuebleComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  listaBloque: BloqueModelo[] = [];
  codigo: number = 0;
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
        alert("Error cargando los bloques");
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
      },
      (error) => {
        alert("no se encuentran los datos");
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
    this.servicio.actualizarRegistro(obj).subscribe(
      (datos) => {
        alert("Inmueble actualizado correctamente");
        this.router.navigate(["/parametros/listar-inmuebles"]);
      },
      (error) => {
        alert("Error guardando el inmueble");
      }
    );
  }


}
