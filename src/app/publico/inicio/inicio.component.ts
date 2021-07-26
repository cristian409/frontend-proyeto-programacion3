import { Component, OnInit } from '@angular/core';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { ProyectoService } from 'src/app/servicio/proyecto.service';

declare const abrirModal: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {

  listaProyectos: ProyectoModelo[] = [];
  nuevaDes?: String = "";
  constructor(private servicioProyecto: ProyectoService) { }

  ngOnInit(): void {
    this.ListarProyectos();
  }

  ListarProyectos() {
    this.servicioProyecto.listarRegistros().subscribe(
      (datos) => {
        datos.forEach(proyecto => {
          this.nuevaDes = proyecto.descripcion?.substring(0,101);
          proyecto.descripcion = this.nuevaDes
        });
        this.listaProyectos = datos;
      },
      (error: any) => {
        abrirModal("¡Error!", "Error cargando los proyectos");
      }
    );
  }

}
