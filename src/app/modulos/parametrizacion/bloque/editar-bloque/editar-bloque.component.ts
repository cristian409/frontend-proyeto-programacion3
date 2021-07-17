import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { BloqueService } from 'src/app/servicio/bloque.service';
import { ProyectoService } from 'src/app/servicio/proyecto.service';

@Component({
  selector: 'app-editar-bloque',
  templateUrl: './editar-bloque.component.html',
  styleUrls: ['./editar-bloque.component.css']
})
export class EditarBloqueComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  listaProyectos: ProyectoModelo[] = [];
  codigo: number = 0;
  constructor(private fb: FormBuilder,
    private servicio: BloqueService,
    private router: Router,
    private servicioProyecto:ProyectoService,
    private route: ActivatedRoute) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      proyectoId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.cargarCiudades();
  }

  cargarCiudades() {
    this.servicioProyecto.listarRegistros().subscribe(
      (datos) => {
        this.listaProyectos = datos;
        this.buscarRegistro();
      },
      (error) => {
        alert("Error cargando los proyectos");
      }
    );
  }

  buscarRegistro() {
    this.codigo = this.route.snapshot.params["codigo"];
    this.servicio.buscarRegistro(this.codigo).subscribe(
      (datos) => {
        this.obtenerFGV.codigo.setValue(datos.codigo);
        this.obtenerFGV.nombre.setValue(datos.nombre);
        this.obtenerFGV.descripcion.setValue(datos.descripcion);
        this.obtenerFGV.proyectoId.setValue(datos.proyectoId);
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
    let nom = this.obtenerFGV.nombre.value;
    let des = this.obtenerFGV.descripcion.value;
    let pId = this.obtenerFGV.proyectoId.value;
    let codigo = this.obtenerFGV.codigo.value;
    let obj = new BloqueModelo();
    obj.codigo = codigo;
    obj.nombre = nom;
    obj.descripcion = des;
    obj.proyectoId = pId;
    this.servicio.actualizarRegistro(obj).subscribe(
      (datos) => {
        alert("Bloque actualizado correctamente");
        this.router.navigate(["/parametros/listar-bloques"]);
      },
      (error) => {
        alert("Error guardando el bloque");
      }
    );
  }

}
