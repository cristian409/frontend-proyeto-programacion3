import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { CiudadService } from 'src/app/servicio/ciudad.service';
import { ProyectoService } from 'src/app/servicio/proyecto.service';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  listaCiudades: CiudadModelo[] = [];
  codigo: number = 0;
  constructor(private fb: FormBuilder,
    private servicio: ProyectoService,
    private router: Router,
    private servicioCiudad:CiudadService,
    private route: ActivatedRoute) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required],
      ciudadId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.cargarCiudades();


  }

  cargarCiudades() {
    this.servicioCiudad.listarRegistros().subscribe(
      (datos) => {
        this.listaCiudades = datos;
        this.buscarRegistro();
      },
      (error) => {
        alert("Error cargando los paises");
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
        this.obtenerFGV.imagen.setValue(datos.imagen);
        this.obtenerFGV.ciudadId.setValue(datos.ciudadId);
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
    let img = this.obtenerFGV.imagen.value;
    let cId = this.obtenerFGV.ciudadId.value;
    let codigo = this.obtenerFGV.codigo.value;
    let obj = new ProyectoModelo();
    obj.codigo = codigo;
    obj.nombre = nom;
    obj.descripcion = des;
    obj.imagen = img;
    obj.ciudadId = cId;
    this.servicio.actualizarRegistro(obj).subscribe(
      (datos) => {
        alert("proyecto almacenado correctamente");
        this.router.navigate(["/parametros/listar-proyectos"]);
      },
      (error) => {
        alert("Error guardando el proyecto");
      }
    );
  }

}
