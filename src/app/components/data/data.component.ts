import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  formulario: FormGroup;

  usuario = {
    nombreCompleto: {
      nombre: 'Fernando',
      apellido: 'Herrera'
    },
    email: 'fernando.herrera@gmail.com',
    pasatiempos: [null]
  };

  constructor() {
    this.formulario = new FormGroup({
      'nombreCompleto': new FormGroup({
        'nombre': new FormControl('', [Validators.required, Validators.minLength(5)]),
        'apellido': new FormControl('', [Validators.required, this.noHerrera])
      }),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'pasatiempos': new FormArray([
        new FormControl('', Validators.required)
      ]),
      username: new FormControl('', Validators.required, this.existeUsuario),
      password1: new FormControl('', Validators.required),
      password2: new FormControl()
    });

    // this.formulario.setValue(this.usuario);
    this.formulario.controls['password2'].setValidators([Validators.required, this.noIgual.bind(this)]);
  }

  agregarPasatiempo() {
    (<FormArray>this.formulario.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  eliminarPasatiempo(index: number) {
    (<FormArray>this.formulario.controls['pasatiempos']).removeAt(index);
  }

  noHerrera(control: FormControl): {[s: string]: boolean} {
    if (control.value === 'herrera') {
      return {noherrera: true};
    } else {
      return null;
    }
  }

  noIgual(control: FormControl): {[s: string]: boolean} {
    if (control.value !== this.formulario.controls['password1'].value) {
      return {noiguales: true};
    } else {
      return null;
    }
  }

  existeUsuario(control: FormControl): Promise<any>|Observable<any>{
    const promesa = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'abel') {
            resolve ({existe: true});
          } else {
            resolve(null);
          }
        }, 3000);
      }
    );
    return promesa;
  }

  guardarCambios() {
    console.log(this.formulario.value);
    // this.formulario.reset(this.formulario);
    this.formulario.reset({
      nombreCompleto: {
        nombre: '',
        apellido: ''
      },
      email: ''
    });
  }

}
