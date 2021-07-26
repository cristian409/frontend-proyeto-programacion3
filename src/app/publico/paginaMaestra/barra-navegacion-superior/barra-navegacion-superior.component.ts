import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { usuarioModelo } from 'src/app/modelos/usuario.modelo';
import { SeguridadService } from 'src/app/servicio/seguridad.service';

@Component({
  selector: 'app-barra-navegacion-superior',
  templateUrl: './barra-navegacion-superior.component.html',
  styleUrls: ['./barra-navegacion-superior.component.css']
})
export class BarraNavegacionSuperiorComponent implements OnInit {

  isLoggedIn: boolean = false;
  rol?: String;

  suscripcion: Subscription = new Subscription;

  constructor(private servicioSeguridad: SeguridadService) { }

  ngOnInit(): void {
    this.suscripcion = this.servicioSeguridad.obtenerDatosSession().subscribe((datos: usuarioModelo) => {
      this.isLoggedIn = datos.isLoggedIn;
      this.rol = datos.nombreRol;
    });
  }

}
