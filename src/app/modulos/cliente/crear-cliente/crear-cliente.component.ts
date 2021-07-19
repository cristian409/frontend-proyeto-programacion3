import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { CiudadService } from 'src/app/servicio/ciudad.service';
import { ClienteService } from 'src/app/servicio/cliente.service';

declare const abrirModal: any;
declare const confirmarModal: any;

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  ciudadListado: CiudadModelo[] = [];

  constructor(private fb: FormBuilder,
    private servicio: ClienteService,
    private router: Router,
    private servicioCiudad: CiudadService) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', Validators.required],
      fotografia: ['', Validators.required],
      ciudadId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.ListarCiudades();
  }

  ListarCiudades() {
    this.servicioCiudad.listarRegistros().subscribe(
      (datos) => {
        this.ciudadListado = datos;
      },
      (error: any) => {
        abrirModal('Información', 'Error cargando las ciudades.');
      }
    );
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  GuardarRegistro() {

    const formData = new FormData();
    formData.append('file', this.obtenerFGV.fotografia.value);

    let nombre = this.obtenerFGV.nombre.value;
    let apellidos = this.obtenerFGV.apellidos.value;
    let fechaNacimiento = this.obtenerFGV.fechaNacimiento.value;
    let telefono = this.obtenerFGV.telefono.value;
    let direccion = this.obtenerFGV.direccion.value;
    let correo = this.obtenerFGV.correo.value;
    let ciudadId = parseInt(this.obtenerFGV.ciudadId.value);

    this.servicio.GuardarImagen(formData).subscribe(
      (datos) => {
        this.obtenerFGV.fotografia.setValue(datos.filename)
        let fotografia = this.obtenerFGV.fotografia.value;
        
        let obj = new ClienteModelo();
        obj.nombre = nombre;
        obj.apellidos = apellidos;
        obj.fechaNacimiento = fechaNacimiento;
        obj.fotografia = fotografia;
        obj.telefono = telefono;
        obj.direccion = direccion;
        obj.email = correo;
        obj.ciudadId = ciudadId;
        
        this.servicio.GuardarRegistro(obj).subscribe(
          (datos) => {
            abrirModal('Información', 'Registro almacenado correctamente.');
            this.router.navigate(["/clientes/listar-clientes"]);
          },
          (error: any) => {
            abrirModal('Error', 'Error al guardar el registro.');
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
      this.obtenerFGV.fotografia.setValue(file);
    }
  }


}
