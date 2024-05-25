import { Component } from '@angular/core';

@Component({
  selector: 'app-administrar-reservas',
  standalone: true,
  imports: [],
  templateUrl: './administrar-reservas.component.html',
  styleUrl: './administrar-reservas.component.css'
})
export class AdministrarReservasComponent {
  scrollTo(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }
}
