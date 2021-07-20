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
  public isActive: boolean = false;
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
    this.servicioCliente.BuscarRegistroFinanciera(this.id).subscribe(
      (datos) => {
        this.isActive = true;
        this.obtenerFGV.id.setValue(datos.clienteId);
        this.obtenerFGV.ingreso.setValue(datos.totalIngresos);
        this.obtenerFGV.nombre.setValue(datos.datosTrabajo);
        this.obtenerFGV.tiempoTrabajo.setValue(datos.tiempoTrabajoActual);
        this.obtenerFGV.nombreFamilia.setValue(datos.nombreReferenciaFamiliar);
        this.obtenerFGV.telefonoFamilia.setValue(datos.telefonoReferenciaFamiliar);
        this.obtenerFGV.nombrePersonal.setValue(datos.nombreReferenciaPersonal);
        this.obtenerFGV.telefonoPersonal.setValue(datos.telefonoReferenciaPersonal);
      },
      (error) => {
        abrirModal("Información", "Inserte un registro de financiera");
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

    let obj = new FinancieraModelo();
    obj.totalIngresos = ingreso;
    obj.datosTrabajo = nombre;
    obj.tiempoTrabajoActual = tiempoTrabajo;
    obj.nombreReferenciaFamiliar = nombreFamilia;
    obj.telefonoReferenciaFamiliar = telefonoFamilia;
    obj.nombreReferenciaPersonal = nombrePersonal;
    obj.telefonoReferenciaPersonal = telefonoPersonal;
    obj.clienteId = this.id;

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

  ActualizarRegistro() {
    this.id = this.route.snapshot.params["id"];

    let ingreso = this.obtenerFGV.ingreso.value;
    let nombre = this.obtenerFGV.nombre.value;
    let tiempoTrabajo = this.obtenerFGV.tiempoTrabajo.value;
    let nombreFamilia = this.obtenerFGV.nombreFamilia.value;
    let telefonoFamilia = this.obtenerFGV.telefonoFamilia.value;
    let nombrePersonal = this.obtenerFGV.nombrePersonal.value;
    let telefonoPersonal = this.obtenerFGV.telefonoPersonal.value;

    let obj = new FinancieraModelo();
    obj.totalIngresos = ingreso;
    obj.datosTrabajo = nombre;
    obj.tiempoTrabajoActual = tiempoTrabajo;
    obj.nombreReferenciaFamiliar = nombreFamilia;
    obj.telefonoReferenciaFamiliar = telefonoFamilia;
    obj.nombreReferenciaPersonal = nombrePersonal;
    obj.telefonoReferenciaPersonal = telefonoPersonal;
    obj.clienteId = this.id;

    this.servicioCliente.AutualizarRegistroFinanciera(obj.clienteId, obj).subscribe(
      (datos) => {
        abrirModal('Información', 'Registro almacenado correctamente.');
        this.router.navigate(["/clientes/listar-clientes"]);
      },
      (error: any) => {
        abrirModal('Error', 'Error al actualizar el registro.');
      }
    );

  }

}
