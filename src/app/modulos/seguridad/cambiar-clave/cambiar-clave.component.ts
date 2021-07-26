import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MD5 } from 'crypto-js';
import { CambioContraseñaModelo } from 'src/app/modelos/cambio-contraseña.modelo';
import { SeguridadService } from 'src/app/servicio/seguridad.service';

declare const abrirModal: any;
@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html',
  styleUrls: ['./cambiar-clave.component.css']
})
export class CambiarClaveComponent implements OnInit {
  
  fgValidacion: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private service:SeguridadService,
    private router: Router
  ) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      correo: ['', Validators.required],
      contrasena_actual: ['', Validators.required],
      contrasena_nueva: ['', Validators.required],
      contrasena_nueva2: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  cambioContrasena(){
    if(this.obtenerFGV.contrasena_nueva.value != this.obtenerFGV.contrasena_nueva2.value){
      abrirModal("¡Datos Invalidos!", "los campos de contraseña nueva deben ser iguales");
    }else{
      let cor = this.obtenerFGV.correo.value;
      let coa = MD5(this.obtenerFGV.contrasena_actual.value).toString();
      let con = MD5(this.obtenerFGV.contrasena_nueva.value).toString();
      let obj = new CambioContraseñaModelo();
      obj.correo = cor;
      obj.contrasena_actual = coa;
      obj.contrasena_nueva = con;
      this.service.cambiarContrasena(obj).subscribe(
        (datos) => {
          abrirModal("Información", "Su contraseña a sido cambiada exitosamente");
          this.router.navigate(["/home"]);
        },
        (error) => {
          abrirModal("¡Error!, No a sido posible cambiar la contraseña");
        }
      )
    }
  }
}
