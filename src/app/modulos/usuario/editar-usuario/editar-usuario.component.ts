import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { rolModelo } from 'src/app/modelos/rol.modelo';
import { usuarioModelo } from 'src/app/modelos/usuario.modelo';
import { CiudadService } from 'src/app/servicio/ciudad.service';
import { UsuariosService } from 'src/app/servicio/usuarios.service';


declare const abrirModal: any;

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  listaCiudad: CiudadModelo[] = [];
  listaRoles: rolModelo[] = [];
  id: String = '';
  public isActive: boolean = false;
  constructor(private fb: FormBuilder,
    private servicio: UsuariosService,
    private router: Router,
    private servicioCiudad: CiudadService,
    private route: ActivatedRoute) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      id: ['', Validators.required],
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
    this.cargarCiudad();
    this.cargarRol();
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

  cargarRol() {
    this.servicio.ListarRegistrosRoles().subscribe(
      (datos) => {
        this.listaRoles = datos;
        this.buscarRegistro();
      },
      (error) => {
        abrirModal("¡Errror!", "Error cargando los roles");
      }
    );
  }

  buscarRegistro() {
    this.id = this.route.snapshot.params["id"];
    this.servicio.BuscarRegistro(this.id).subscribe(
      (datos) => {
        this.isActive = true;
        this.obtenerFGV.id.setValue(datos.id);
        this.obtenerFGV.nombre.setValue(datos.nombre);
        this.obtenerFGV.apellidos.setValue(datos.apellidoss);
        this.obtenerFGV.documento.setValue(datos.documento);
        this.obtenerFGV.telefono.setValue(datos.telefono);
        this.obtenerFGV.rolId.setValue(datos.rolId);
        this.obtenerFGV.email.setValue(datos.email);
        this.obtenerFGV.ciudadId.setValue(datos.id_ciudad);
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
    let id = this.obtenerFGV.id.value;
    let nombre = this.obtenerFGV.nombre.value;
    let apellidos = this.obtenerFGV.apellidos.value;
    let documento = this.obtenerFGV.documento.value;
    let telefono = this.obtenerFGV.telefono.value;
    let rolId = this.obtenerFGV.rolId.value;
    let email = this.obtenerFGV.email.value;
    let ciudadId = parseInt(this.obtenerFGV.ciudadId.value);

    let obj = new usuarioModelo();
    obj.id = id;
    obj.nombre = nombre;
    obj.apellidoss = apellidos;
    obj.documento = documento;
    obj.telefono = telefono;
    obj.rolId = rolId;
    obj.email = email;
    obj.id_ciudad = ciudadId;

    this.servicio.AutualizarRegistro(obj).subscribe(
      (datos) => {
        abrirModal('Información', 'Registro almacenado correctamente.');
        this.router.navigate(["/clientes/listar-clientes"]);
      },
      (error: any) => {
        abrirModal('Error', 'Error al guardar el registro.');
      }
    );
  }

}
