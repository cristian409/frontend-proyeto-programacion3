import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FinancieraModelo } from 'src/app/modelos/financiera.modelo';
import { ClienteService } from 'src/app/servicio/cliente.service';

declare const abrirModal: any;
@Component({
  selector: 'app-financiera-cliente',
  templateUrl: './financiera-cliente.component.html',
  styleUrls: ['./financiera-cliente.component.css']
})
export class FinancieraClienteComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  id: Number = 0;
  constructor(private fb: FormBuilder,
    private router: Router,
    private servicioCliente: ClienteService,
    private route: ActivatedRoute) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      id: ['', Validators.required],
      ingreso: ['', Validators.required],
      nombre: ['', Validators.required],
      tiempoTrabajo: ['', Validators.required],
      nombreFamilia: ['', Validators.required],
      telefonoFamilia: ['', Validators.required],
      nombrePersonal: ['', Validators.required],
      telefonoPersonal: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.buscarRegistro();
  }

  buscarRegistro() {
    this.id = this.route.snapshot.params["id"];
    this.servicioCliente.BuscarRegistro(this.id).subscribe(
      (datos) => {
        this.obtenerFGV.id.setValue(datos.id);
        this.obtenerFGV.ingreso.setValue(datos.nombre);
        this.obtenerFGV.nombre.setValue(datos.apellidos);
        this.obtenerFGV.tiempoTrabajo.setValue(datos.fechaNacimiento);
        this.obtenerFGV.nombreFamilia.setValue(datos.telefono);
        this.obtenerFGV.telefonoFamilia.setValue(datos.direccion);
        this.obtenerFGV.nombrePersonal.setValue(datos.email);
        this.obtenerFGV.telefonoPersonal.setValue(datos.fotografia);
      },
      (error) => {
        abrirModal("¡Error!", "No se encuentran los datos");
      }
    );
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  GuardarRegistroFinanciera() {
    this.id = this.route.snapshot.params["id"];
    
    let ingreso = this.obtenerFGV.ingreso.value;
    let nombre = this.obtenerFGV.nombre.value;
    let tiempoTrabajo = this.obtenerFGV.tiempoTrabajo.value;
    let nombreFamilia = this.obtenerFGV.nombreFamilia.value;
    let telefonoFamilia = this.obtenerFGV.telefonoFamilia.value;
    let nombrePersonal = this.obtenerFGV.nombrePersonal.value;
    let telefonoPersonal = this.obtenerFGV.telefonoPersonal.value;
    let clienteId = this.id;

    let obj = new FinancieraModelo();
    obj.totalIngresos = ingreso;
    obj.datosTrabajo = nombre;
    obj.tiempoTabajoActual = tiempoTrabajo;
    obj.nombreReferenciaFamiliar = nombreFamilia;
    obj.telefonoReferenciaFamiliar = telefonoFamilia;
    obj.nombreReferenciaPersonal = nombrePersonal;
    obj.telefonoReferenciaPersonal = telefonoPersonal;
    obj.clienteId = clienteId;

    this.servicioCliente.GuardarRegistroFinanciera(obj).subscribe(
      (datos) => {
        abrirModal('Información', 'Registro almacenado correctamente.');
        this.router.navigate(["/clientes/listar-clientes"]);
      },
      (error: any) => {
        abrirModal('Error', 'Error al guardar la Información Financiera.');
      }
    );
  }

}
