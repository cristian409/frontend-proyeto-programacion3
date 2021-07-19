import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { CiudadService } from 'src/app/servicio/ciudad.service';
import { ClienteService } from 'src/app/servicio/cliente.service';

declare const abrirModal: any;

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  listaCiudad: CiudadModelo[] = [];
  id: Number = 0;
  constructor(private fb: FormBuilder,
    private servicioCiudad: CiudadService,
    private router: Router,
    private servicioCliente: ClienteService,
    private route: ActivatedRoute) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      id: ['', Validators.required],
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
    this.cargarCiudad();
  }

  cargarCiudad() {
    this.servicioCiudad.listarRegistros().subscribe(
      (datos) => {
        this.listaCiudad = datos;
        this.buscarRegistro();
      },
      (error) => {
        abrirModal("¡Errror!", "Error cargando las ciudades");
      }
    );
  }

  buscarRegistro() {
    this.id = this.route.snapshot.params["id"];
    this.servicioCliente.BuscarRegistro(this.id).subscribe(
      (datos) => {
        this.obtenerFGV.id.setValue(datos.id);
        this.obtenerFGV.nombre.setValue(datos.nombre);
        this.obtenerFGV.apellidos.setValue(datos.apellidos);
        this.obtenerFGV.fechaNacimiento.setValue(datos.fechaNacimiento);
        this.obtenerFGV.telefono.setValue(datos.telefono);
        this.obtenerFGV.direccion.setValue(datos.direccion);
        this.obtenerFGV.correo.setValue(datos.email);
        this.obtenerFGV.fotografia.setValue(datos.fotografia);
        this.obtenerFGV.ciudadId.setValue(datos.ciudadId);
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

    const formData = new FormData();
    formData.append('file', this.obtenerFGV.fotografia.value);

    let nombre = this.obtenerFGV.nombre.value;
    let apellidos = this.obtenerFGV.apellidos.value;
    let fechaNacimiento = this.obtenerFGV.fechaNacimiento.value;
    let telefono = this.obtenerFGV.telefono.value;
    let direccion = this.obtenerFGV.direccion.value;
    let correo = this.obtenerFGV.correo.value;
    let ciudadId = parseInt(this.obtenerFGV.ciudadId.value);

    this.servicioCliente.GuardarImagen(formData).subscribe(
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
        
        this.servicioCliente.AutualizarRegistro(obj).subscribe(
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
