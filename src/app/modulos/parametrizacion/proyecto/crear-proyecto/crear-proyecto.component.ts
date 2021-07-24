import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { CiudadService } from 'src/app/servicio/ciudad.service';
import { ProyectoService } from 'src/app/servicio/proyecto.service';

declare const abrirModal: any;
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
    private servicioCiudad: CiudadService) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      foto: ['', Validators.required],
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
        abrirModal("¡Error!", "Error cargando las ciudades")
      }
    );
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  GuardarRegistro() {

    const formData = new FormData();
    formData.append('file', this.obtenerFGV.foto.value);

    let nom = this.obtenerFGV.nombre.value;
    let des = this.obtenerFGV.descripcion.value;
    let cId = this.obtenerFGV.ciudadId.value;

    this.servicio.GuardarImagen(formData).subscribe(
      (datos) => {
        this.obtenerFGV.foto.setValue(datos.filename)
        let foto = this.obtenerFGV.foto.value;

        let obj = new ProyectoModelo();
        obj.nombre = nom;
        obj.descripcion = des;
        obj.imagen = foto;
        obj.ciudadId = cId;
        this.servicio.guardarRegistro(obj).subscribe(
          (datos) => {
            abrirModal("Información", "Proyecto almacenado correctamente");
            this.router.navigate(["/parametros/listar-proyectos"]);
          },
          (error) => {
            abrirModal("¡Error!", "Error guardando el proyecto");
          }
        );
      },
      (error: any) => {
        abrirModal('Error', 'Error al guardar la imagen.');
      }
    );
  }

  archivoSeleccionado(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.obtenerFGV.foto.setValue(file);
    }
  }
}
