import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { CiudadService } from 'src/app/servicio/ciudad.service';
import { InmuebleService } from 'src/app/servicio/inmueble.service';
import { ProyectoService } from 'src/app/servicio/proyecto.service';

declare const abrirModal: any;

@Component({
  selector: 'app-info-proyecto',
  templateUrl: './info-proyecto.component.html',
  styleUrls: ['./info-proyecto.component.css']
})
export class InfoProyectoComponent implements OnInit {

  id: Number = 0;
  proyecto?: ProyectoModelo;
  ciudad?: CiudadModelo;
  pais?: PaisModelo;
  listaInfoInmuebles: InmuebleModelo[] = [];
  constructor(private route: ActivatedRoute,
    private servicioProyecto: ProyectoService,
    private servicioCiudad: CiudadService,
    private servicioInmueble: InmuebleService) { }

  ngOnInit(): void {
    this.CargarInfo();   
  }

  CargarInfo(){
    this.id = this.route.snapshot.params["id"];
    this.servicioProyecto.buscarRegistro(this.id).subscribe(
      (datos) =>{
        this.proyecto = datos; 
        this.InfoCiudad(this.proyecto);
        this.InfoInmuebles(this.proyecto);

      },
      (error: any) =>{
        abrirModal("¡Error!", "Error buscando el registro del Proyecto.");
      }
    );
  }

  InfoCiudad(proyecto: ProyectoModelo){
    this.servicioCiudad.buscarRegistro(proyecto.ciudadId).subscribe(
      (datos) =>{
        this.ciudad = datos;
        this.servicioCiudad.buscarRegistroPais(this.ciudad.paisId).subscribe(
          (datos) =>{
            this.pais = datos;
          },
          (error: any) =>{
            abrirModal("¡Error!", "Error buscando el registro del pais.");    
          }
        );
      },
      (error: any) =>{
        abrirModal("¡Error!", "Error buscando el registro del ciudad.");
      }
    );
  }

  InfoInmuebles(proyecto: ProyectoModelo){
    this.servicioProyecto.buscarRegistroBloque(proyecto.codigo).subscribe(
      (bloques) =>{
         this.servicioInmueble.listarRegistros().subscribe(
          (inmuebles) =>{
            bloques.forEach(bloque => {
              inmuebles.forEach(inmueble => {
                if (bloque.codigo == inmueble.bloqueId) {
                  this.listaInfoInmuebles.push(inmueble);
                }
              });
            });
          },
          (error: any) =>{
            abrirModal("¡Error!", "Error buscando el registro de los inmuebles.");
          }
        );
      },
      (error: any) =>{
        abrirModal("¡Error!", "Error buscando el registro de los bloques.");
      }
    );
  }




}
