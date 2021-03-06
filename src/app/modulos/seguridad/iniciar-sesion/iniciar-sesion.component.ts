import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usuarioModelo } from 'src/app/modelos/usuario.modelo';
import * as crypto from 'crypto-js'
import { SeguridadService } from 'src/app/servicio/seguridad.service';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicio/usuarios.service';


declare const abrirModal: any;
@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router,
    private servicioUsuario: UsuariosService) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      correo: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  identificarUsuario() {
    let usuario = this.obtenerFGV.correo.value;
    let clave = this.obtenerFGV.clave.value;
    let modelo = new usuarioModelo();
    modelo.email = usuario;
    modelo.contraseña = crypto.MD5(clave).toString();
    this.servicioSeguridad.identificarUsuario(modelo).subscribe(
      (data: usuarioModelo) => {
        this.servicioUsuario.BuscarRegistroRol(data.user?.id).subscribe(
          (datos) => {
            data.nombreRol = datos.nombre;
            this.servicioSeguridad.guardarDatosEnLocal(data);
            this.router.navigate(["/"]);
          },
          (error: any) => {
            abrirModal("¡Error!", "Registro de rol no encontrado");
          }
        );
      },
      (error: any) => {
        abrirModal("¡Datos Invalidos!", error.error.error.message);
      }
    );
  }

}
