import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { usuarioModelo } from 'src/app/modelos/usuario.modelo';
import { SeguridadService } from 'src/app/servicio/seguridad.service';


declare const abrirModal: any;
@Component({
  selector: 'app-resetear-clave',
  templateUrl: './resetear-clave.component.html',
  styleUrls: ['./resetear-clave.component.css']
})
export class ResetearClaveComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      correo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  ValidarCorreo() {
    let correo = this.obtenerFGV.correo.value;
    let modelo = new usuarioModelo();
    modelo.email = correo;
    
    this.servicioSeguridad.validarCorreo(modelo).subscribe(
      (data) => {
        let respuesta = data;
        if (respuesta.enviado == 'ok') {
          this.router.navigate(["/solicitud/listar-solicitud"]);
        }                
      },
      (error: any) => {
        abrirModal("¡Datos Invalidos!", error.error.error.message);
      }
    );
  }

}
