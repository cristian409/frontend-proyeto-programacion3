import { Component, OnInit } from '@angular/core';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { ProyectoService } from 'src/app/servicio/proyecto.service';

@Component({
  selector: 'app-listar-proyecto',
  templateUrl: './listar-proyecto.component.html',
  styleUrls: ['./listar-proyecto.component.css']
})
export class ListarProyectoComponent implements OnInit {

  pagina: number = 1;
  listaRegistros: ProyectoModelo[] = [];
  constructor(private servicio: ProyectoService) { }

  ngOnInit(): void {
    this.servicio.listarRegistros().subscribe(
      (datos) => {
        this.listaRegistros = datos;
      },
      (error) => {
        if (this.listaRegistros.length == 0) {
          alert("No hay proyectos en curso por el momento");
        } else {
          alert("Error listando los proyectos");
        }
      }
    );
  }

  verificarEliminacion(codigo?: number, nombre?: String) {
    if (window.confirm("realmente desea eliminar el ciudad " + nombre)) {
      let modelo = new ProyectoModelo();
      modelo.codigo = codigo;
      modelo.nombre = nombre;
      this.servicio.eliminarRegistro(modelo).subscribe(
        (datos) => {
          alert("El proyecto " + nombre + " a sido eliminado correctamente");
          this.listaRegistros = this.listaRegistros.filter(x => x.codigo != codigo);
        },
        (error) => {
          alert("Error elimiando el proyecto " + nombre);
        }
      );
    }
  }

}
