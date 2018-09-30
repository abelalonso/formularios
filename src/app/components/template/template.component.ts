import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form){
      border: 1px solid red;
      border-left: 20px solid red;
    }
  `]
})
export class TemplateComponent {

  usuario: any = {
    nombre: null,
    apellido: null,
    email: null,
    pais: '',
    sexo: 'Hombre',
    acepta: false
  };

  paises = [{
    codigo: 'CRI',
    nombre: 'Costa Rica'
  },
  {
    codigo: 'ESP',
    nombre: 'España'
  }
];

  constructor() { }

  guardar(formulario: NgForm) {
    console.log('Formulario', formulario);
    console.log('Datos:', formulario.value);
  }
}
