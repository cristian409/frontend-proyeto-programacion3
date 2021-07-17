import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { CiudadService } from 'src/app/servicio/ciudad.service';
import { ProyectoService } from 'src/app/servicio/proyecto.service';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {

  
  fgValidacion: FormGroup = this.fb.group({});
  listaCiudades: CiudadModelo[] = []; 

  constructor(private fb: FormBuilder,
    private servicio: ProyectoService,
    private router: Router,
    private servicioCiudad:CiudadService) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required],
      ciudadId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.servicioCiudad.listarRegistros().subscribe(
      (datos) => {
        this.listaCiudades = datos;
      },
      (error) => {
        alert("Error cargando las ciudades");
      }
    );
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  GuardarRegistro(){
    let nom = this.obtenerFGV.nombre.value;
    let des = this.obtenerFGV.descripcion.value;
    let img = this.obtenerFGV.imagen.value;
    let cId = this.obtenerFGV.ciudadId.value;
    let obj = new ProyectoModelo();
    obj.nombre = nom;
    obj.descripcion = des;
    obj.imagen = img;
    obj.ciudadId = cId;
    this.servicio.guardarRegistro(obj).subscribe(
      (datos) => {
        alert("Proyecto almacenada correctamente");
        this.router.navigate(["/parametros/listar-proyectos"]);
      },
      (error) => {
        alert("Error guardando el proyecto");
      }
    );
  }


}
