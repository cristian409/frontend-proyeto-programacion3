import { Component, OnInit } from '@angular/core';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { InmuebleService } from 'src/app/servicio/inmueble.service';

@Component({
  selector: 'app-listar-inmueble',
  templateUrl: './listar-inmueble.component.html',
  styleUrls: ['./listar-inmueble.component.css']
})
export class ListarInmuebleComponent implements OnInit {

  pagina: number = 1;
  listaRegistros: InmuebleModelo[] = [];
  constructor(private servicio: InmuebleService) { }

  ngOnInit(): void {
    this.servicio.listarRegistros().subscribe(
      (datos) => {
        this.listaRegistros = datos;
      },
      (error) => {
        alert("Error listando los inmuebles");
      }
    );
  }

  verificarEliminacion(codigo?: Number, identificador?: String) {
    if (window.confirm("confirme que desea eliminar el inmueble " + identificador)) {
      let modelo = new InmuebleModelo();
      modelo.codigo = codigo;
      modelo.identificador = identificador;
      this.servicio.eliminarRegistro(modelo).subscribe(
        (datos) => {
          alert("El inmueble " + identificador + " a sido eliminado correctamente");
          this.listaRegistros = this.listaRegistros.filter(x => x.codigo != codigo);
        },
        (error) => {
          alert("Error elimiando el bloque " + identificador);
        }
      );
    }
  }

}
