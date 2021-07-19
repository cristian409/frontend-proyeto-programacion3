import { Component, OnInit } from '@angular/core';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { BloqueService } from 'src/app/servicio/bloque.service';

@Component({
  selector: 'app-listar-bloque',
  templateUrl: './listar-bloque.component.html',
  styleUrls: ['./listar-bloque.component.css']
})
export class ListarBloqueComponent implements OnInit {

  pagina: number = 1;
  listaRegistros: BloqueModelo[] = [];
  constructor(private servicio: BloqueService) { }

  ngOnInit(): void {
    this.servicio.listarRegistros().subscribe(
      (datos) => {
        this.listaRegistros = datos;
      },
      (error) => {
        alert("Error listando los proyectos");
      }
    );
  }

  verificarEliminacion(codigo?: number, nombre?: String) {
    if (window.confirm("confirme que desea eliminar el bloque " + nombre)) {
      let modelo = new BloqueModelo();
      modelo.codigo = codigo;
      modelo.nombre = nombre;
      this.servicio.eliminarRegistro(modelo).subscribe(
        (datos) => {
          alert("El bloque " + nombre + " a sido eliminado correctamente");
          this.listaRegistros = this.listaRegistros.filter(x => x.codigo != codigo);
        },
        (error) => {
          alert("Error elimiando el bloque " + nombre);
        }
      );
    }
  }

}
