import { Component } from '@angular/core';
import { SeleccionCategoriaService } from '../seleccion-categoria.service';

@Component({
  selector: 'app-recursos-categoria',
  standalone: true,
  imports: [],
  templateUrl: './recursos-categoria.component.html',
  styleUrl: './recursos-categoria.component.css'
})
export class RecursosCategoriaComponent {

  constructor(private seleccionCategoria: SeleccionCategoriaService){

  }

  seleccion = new String;
  ngOnInit(): void {
    this.seleccionCategoria.disparadorSeleccion.subscribe(data =>{
      this.seleccion = data;
      console.log(this.seleccion);
      console.log('Recibiendo categoria seleccionada: ',data);
    })
  }
}
