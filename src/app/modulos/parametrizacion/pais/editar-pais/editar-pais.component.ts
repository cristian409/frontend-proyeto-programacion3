import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { PaisService } from 'src/app/servicio/pais.service';

@Component({
  selector: 'app-editar-pais',
  templateUrl: './editar-pais.component.html',
  styleUrls: ['./editar-pais.component.css']
})
export class EditarPaisComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  codigo: number = 0;

  constructor(private fb: FormBuilder,
    private servicio: PaisService,
    private router: Router,
    private route: ActivatedRoute) { }

  construirFormulario() {
    this.fgValidacion = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.codigo = this.route.snapshot.params["codigo"];
    this.servicio.buscarRegistro(this.codigo).subscribe(
      (datos) =>{
        this.obtenerFGV.codigo.setValue(datos.codigo);
        this.obtenerFGV.nombre.setValue(datos.nombre);
      },
      (error) => {
        alert("no se encuentran los datos");
      }
    );
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  actualizarRegistro(){
    let cod = this.obtenerFGV.codigo.value;
    let nom = this.obtenerFGV.nombre.value;
    let obj = new PaisModelo();
    obj.nombre = nom;
    obj.codigo = cod;
    this.servicio.actualizarRegistro(obj).subscribe(
      (datos) => {
        alert("Pais actualizado correctamente");
        this.router.navigate(["/parametros/listar-pais"]);
      },
      (error) => {
        alert("Error actualizando el pais");
      }
    );
  }

}
