import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { CiudadService } from 'src/app/servicio/ciudad.service';
import { PaisService } from 'src/app/servicio/pais.service';

declare const abrirModal: any;
@Component({
  selector: 'app-crear-ciudad',
  templateUrl: './crear-ciudad.component.html',
  styleUrls: ['./crear-ciudad.component.css']
})
export class CrearCiudadComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  listaPaises: PaisModelo[] = [];

  constructor(private fb: FormBuilder,
    private servicio: CiudadService,
    private router: Router,
    private servicioPais: PaisService) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      correo: ['', Validators.required],
      paisId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.ListarPaises();
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  ListarPaises() {
    this.servicioPais.listarRegistros().subscribe(
      (datos) => {
        this.listaPaises = datos;
      },
      (error) => {
        abrirModal("¡Error!", "Error cargando los paises");
      }
    );
  }

  GuardarRegistro() {
    let nom = this.obtenerFGV.nombre.value;
    let pId = this.obtenerFGV.paisId.value;
    let obj = new CiudadModelo();
    obj.nombre = nom;
    obj.paisId = pId;
    this.servicio.guardarRegistro(obj).subscribe(
      (datos) => {
        abrirModal("Información", "ciudad almacenada correctamente");
        this.router.navigate(["/parametros/listar-ciudades"]);
      },
      (error) => {
        abrirModal("¡Datos Invalidos!", "Error al guardar el registro");
      }
    );
  }
}
