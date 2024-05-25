import { Component, OnInit} from '@angular/core';
import { SeleccionCategoriaService } from '../seleccion-categoria.service';

@Component({
  selector: 'app-recursos-categoria',
  standalone: true,
  imports: [],
  templateUrl: './recursos-categoria.component.html',
  styleUrl: './recursos-categoria.component.css'
})
export class RecursosCategoriaComponent implements OnInit{

  message: string = '';

  constructor(private seleccionCategoria: SeleccionCategoriaService){

  }
  
  ngOnInit(): void {
    this.seleccionCategoria.currentMessage.subscribe(message => this.message = message);
  }
  
  scrollTo(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }
}
