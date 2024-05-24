import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SeleccionCategoriaService } from '../seleccion-categoria.service';

@Component({
  selector: 'app-pagina-principal',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css',

})
export class PaginaPrincipalComponent {
    constructor(private seleccionCategoria: SeleccionCategoriaService){
      
    }

    guardarSeleccion(dato : any){
      this.seleccionCategoria.disparadorSeleccion.emit(dato)
    }
}
