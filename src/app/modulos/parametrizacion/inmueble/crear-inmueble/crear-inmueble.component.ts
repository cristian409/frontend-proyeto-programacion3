import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { BloqueService } from 'src/app/servicio/bloque.service';
import { InmuebleService } from 'src/app/servicio/inmueble.service';

@Component({
  selector: 'app-crear-inmueble',
  templateUrl: './crear-inmueble.component.html',
  styleUrls: ['./crear-inmueble.component.css']
})
export class CrearInmuebleComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  listaBloques: BloqueModelo[] = []; 

  constructor(private fb: FormBuilder,
    private servicio: InmuebleService,
    private router: Router,
    private servicioBloque:BloqueService) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      identificador: ['', Validators.required],
      valor: ['', Validators.required],
      bloqueId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.servicioBloque.listarRegistros().subscribe(
      (datos) => {
        this.listaBloques = datos;
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
    let ide = parseInt(this.obtenerFGV.identificador.value);
    let val = parseInt(this.obtenerFGV.valor.value);
    let bId = this.obtenerFGV.bloqueId.value;
    let obj = new InmuebleModelo();
    obj.identificador = ide;
    obj.valor = val;
    obj.bloqueId = bId;
    this.servicio.guardarRegistro(obj).subscribe(
      (datos) => {
        alert("Inmueble almacenada correctamente");
        this.router.navigate(["/parametros/listar-inmuebles"]);
      },
      (error) => {
        alert("Error guardando el Inmueble");
      }
    );
  }


}
