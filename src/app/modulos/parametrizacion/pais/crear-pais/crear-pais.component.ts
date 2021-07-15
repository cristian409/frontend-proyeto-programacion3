import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { PaisService } from 'src/app/servicio/pais.service';

@Component({
  selector: 'app-crear-pais',
  templateUrl: './crear-pais.component.html',
  styleUrls: ['./crear-pais.component.css']
})
export class CrearPaisComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder,
    private servicio: PaisService,
    private router: Router) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      pais: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  GuardarRegistro(){
    let nom = this.obtenerFGV.pais.value;
    let obj = new PaisModelo();
    obj.nombre = nom;
    this.servicio.guardarRegistro(obj).subscribe(
      (datos) => {
        alert("Pais almacenado correctamente");
        this.router.navigate(["/parametros/listar-pais"]);
      },
      (error) => {
        alert("Error guardando el pais");
      }
    );
  }

}
