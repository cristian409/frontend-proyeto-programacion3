import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { BloqueService } from 'src/app/servicio/bloque.service';
import { ProyectoService } from 'src/app/servicio/proyecto.service';

@Component({
  selector: 'app-crear-bloque',
  templateUrl: './crear-bloque.component.html',
  styleUrls: ['./crear-bloque.component.css']
})
export class CrearBloqueComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  listaProyectos: ProyectoModelo[] = []; 

  constructor(private fb: FormBuilder,
    private servicio: BloqueService,
    private router: Router,
    private servicioProyecto:ProyectoService) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      proyectoId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.servicioProyecto.listarRegistros().subscribe(
      (datos) => {
        this.listaProyectos = datos;
      },
      (error) => {
        alert("Error cargando los bloques");
      }
    );
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  GuardarRegistro(){
    let nom = this.obtenerFGV.nombre.value;
    let des = this.obtenerFGV.descripcion.value;
    let pId = this.obtenerFGV.proyectoId.value;
    let obj = new BloqueModelo();
    obj.nombre = nom;
    obj.descripcion = des;
    obj.proyectoId = pId;
    this.servicio.guardarRegistro(obj).subscribe(
      (datos) => {
        alert("Bloque almacenada correctamente");
        this.router.navigate(["/parametros/listar-bloques"]);
      },
      (error) => {
        alert("Error guardando el bloque");
      }
    );
  }

}
