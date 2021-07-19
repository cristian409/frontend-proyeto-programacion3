import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { CiudadService } from 'src/app/servicio/ciudad.service';
import { PaisService } from 'src/app/servicio/pais.service';


declare const abrirModal: any;
declare const confirmarModal: any;
@Component({
  selector: 'app-editar-ciudad',
  templateUrl: './editar-ciudad.component.html',
  styleUrls: ['./editar-ciudad.component.css']
})
export class EditarCiudadComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  listaPaises: PaisModelo[] = [];
  codigo: number = 0;
  constructor(private fb: FormBuilder,
    private servicio: CiudadService,
    private router: Router,
    private servicioPais: PaisService,
    private route: ActivatedRoute) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      paisId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.cargarPaises();


  }

  cargarPaises() {
    this.servicioPais.listarRegistros().subscribe(
      (datos) => {
        this.listaPaises = datos;
        this.buscarRegistro();
      },
      (error) => {
        abrirModal("!Error¡", "Error cargando los paises");

      }
    );
  }

  buscarRegistro() {
    this.codigo = this.route.snapshot.params["codigo"];
    this.servicio.buscarRegistro(this.codigo).subscribe(
      (datos) => {
        this.obtenerFGV.codigo.setValue(datos.codigo);
        this.obtenerFGV.nombre.setValue(datos.nombre);
        this.obtenerFGV.paisId.setValue(datos.paisId);
      },
      (error) => {
        abrirModal("¡Error!", "No se encuentran los datos");
      }
    );
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  GuardarRegistro() {
    let nom = this.obtenerFGV.nombre.value;
    let pId = this.obtenerFGV.paisId.value;
    let codigo = this.obtenerFGV.codigo.value;
    let obj = new CiudadModelo();
    obj.codigo = codigo;
    obj.nombre = nom;
    obj.paisId = pId;
    this.servicio.actualizarRegistro(obj).subscribe(
      (datos) => {
        abrirModal("Información", "Ciudad almacenada correctamente");
        this.router.navigate(["/parametros/listar-ciudades"]);
      },
      (error) => {
        abrirModal("¡Error!", "Error guardando la ciudad");
      }
    );
  }



}
