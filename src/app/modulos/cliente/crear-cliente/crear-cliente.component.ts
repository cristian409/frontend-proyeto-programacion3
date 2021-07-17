import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicio/cliente.service';

declare var abrirModalMensaje: any;
declare var modalConfirmacion: any;

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder,
    private servicio: ClienteService,
    private router: Router) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', Validators.required],
      fotografia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  GuardarRegistro() {
    let nombre = this.obtenerFGV.nombre.value;
    let apellidos = this.obtenerFGV.apellidos.value;
    let fechaNacimiento = this.obtenerFGV.fechaNacimiento.value;
    let telefono = parseInt(this.obtenerFGV.telefono.value);
    let direccion = this.obtenerFGV.direccion.value;
    let correo = this.obtenerFGV.correo.value;
    let fotografia = this.obtenerFGV.fotografia.value;

    let obj = new ClienteModelo();
    obj.nombre = nombre;
    obj.apellidos = apellidos;
    obj.fechaNacimiento = fechaNacimiento;
    obj.telefono = telefono;
    obj.direccion = direccion;
    obj.email = correo;
    obj.fotografia = fotografia;

    this.servicio.GuardarRegistro(obj).subscribe(
      (datos: ClienteModelo) => {
        this.abrirConfirmacion();
        setInterval(() => {
          this.router.navigate(["/listar-clientes"]);
        }, 6000);
      },
      (error: any) =>{
        this.abrirError();
      }
    );
  }

  abrirConfirmacion(){
    modalConfirmacion("mensajeExito", "¡Registro Existosos!", "Registro almacenado correctamente.");
  }

  abrirError(){
    abrirModalMensaje("mensajeError", "¡Error!", "Error guardando el registro.");
  }

}
