import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { rolModelo } from 'src/app/modelos/rol.modelo';
import { usuarioModelo } from 'src/app/modelos/usuario.modelo';
import { CiudadService } from 'src/app/servicio/ciudad.service';
import { UsuariosService } from 'src/app/servicio/usuarios.service';

declare const abrirModal: any;

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  ciudadListado: CiudadModelo[] = [];
  listaRoles: rolModelo[] = [];
  
  constructor(private fb: FormBuilder,
    private servicio: UsuariosService,
    private router: Router,
    private servicioCiudad: CiudadService) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      documento: ['', Validators.required],
      telefono: ['', Validators.required],
      rolId: ['', Validators.required],
      email: ['', Validators.required],
      ciudadId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.ListarCiudades();
    this.ListaRoles();
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

  ListaRoles(){
    this.servicio.ListarRegistrosRoles().subscribe(
      (datos) => {
        this.listaRoles = datos;
      },
      (error: any) => {
        abrirModal("Error", `Error listando los roles`);
      }
    );
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  GuardarRegistro() {
    let nombre = this.obtenerFGV.nombre.value;
    let apellidos = this.obtenerFGV.apellidos.value;
    let documento = this.obtenerFGV.documento.value;
    let telefono = this.obtenerFGV.telefono.value;
    let rolId = this.obtenerFGV.rolId.value;
    let email = this.obtenerFGV.email.value;
    let ciudadId = parseInt(this.obtenerFGV.ciudadId.value);
    

    let obj = new usuarioModelo();
    obj.nombre = nombre;
    obj.apellidoss = apellidos;
    obj.documento = documento;
    obj.telefono = telefono;
    obj.rolId = rolId;
    obj.email = email;
    obj.id_ciudad = ciudadId;


    this.servicio.GuardarRegistro(obj).subscribe(
      (datos) => {
        abrirModal('Información', 'Registro almacenado correctamente.');
        this.router.navigate(["/usuarios/listar-usuarios/"]);
      },
      (error: any) => {
        abrirModal('Error', 'Error al guardar el registro.');
      }
    );
  }



}
