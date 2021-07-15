import { Component, OnInit } from '@angular/core';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { CiudadService } from 'src/app/servicio/ciudad.service';

@Component({
  selector: 'app-listar-ciudad',
  templateUrl: './listar-ciudad.component.html',
  styleUrls: ['./listar-ciudad.component.css']
})
export class ListarCiudadComponent implements OnInit {

  pagina: number = 1;
  listaRegistros: CiudadModelo[] = [];
  constructor(private servicio:CiudadService) { }

  ngOnInit(): void {
    this.servicio.listarRegistros().subscribe(
      (datos) => {
        this.listaRegistros = datos;
      },
      (error) => {
        alert("Error listando las ciudades");
      }
    );
  }

  verificarEliminacion(codigo?: number, nombre?:String){
    if(window.confirm("realmente desea eliminar el ciudad "+ nombre)){
      let modelo = new CiudadModelo();
      modelo.codigo = codigo;
      modelo.nombre = nombre;
      this.servicio.eliminarRegistro(modelo).subscribe(
        (datos) => {
          alert("La ciudad " + nombre + " a sido eliminado correctamente");
          this.listaRegistros = this.listaRegistros.filter(x => x.codigo != codigo);
        },
        (error) => {
          alert("Error elimiando la ciudad " + nombre);
        }
      );
    }
  }

}
