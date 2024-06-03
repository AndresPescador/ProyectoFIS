import { Component  } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {

  id: string = '';
  nombre: string = '';
  telefono: string = '';
  correo: string = '';
  contrasena: string = '';
  confirmPassword: string = '';
  mensaje: string = '';

  constructor(private http: HttpClient) { }

  registrarse() {
    if (this.contrasena !== this.confirmPassword) {
      this.mensaje = "Las contraseñas no coinciden";
      return;
    }

    const datos = {
      id: this.id,
      nombre: this.nombre,
      telefono: this.telefono,
      correoElectronico: this.correo,
      contrasena: this.contrasena
    };

    console.log('Enviando datos al servidor:',datos);
    
    this.http.post('http://localhost:3001/Registrar', datos)
      .subscribe(
        (respuesta) => {
          console.log('Registro exitoso:', respuesta);
          this.mensaje = 'Registro exitoso';
          // Redireccionar a la página de inicio de sesión o realizar otra acción
        },
        (error) => {
          console.error('Error al registrarse:', error);
          this.mensaje = 'Error al registrarse';
          // Mostrar un mensaje de error al usuario
        }
      );
  }
}