import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeleccionCategoriaService {
  @Output() disparadorSeleccion: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
