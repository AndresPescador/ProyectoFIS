import { Component  } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


interface LoginResponse {
  message: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
  
  //Datos para registrarse
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
    
    this.http.post<LoginResponse>('http://localhost:3001/Registrar', datos)
      .subscribe(
        (respuesta) => {
          this.mensaje = 'Registro exitoso';
          alert(this.mensaje);
          //Agregar redireccionamiento a página inicio sesión
        },
        (error) => {
          this.mensaje = 'Error al registrarse';
          alert(this.mensaje);
        }
      );
  }


  //Datos para login
  idL: String ="";
  contrasenaL: string = '';

  Logueo() {
    const datos = {
      id: this.idL,
      contrasena: this.contrasenaL
    };
    
    this.http.post<LoginResponse>('http://localhost:3001/Login', datos)
      .subscribe(
        (respuesta) => {
          this.mensaje = 'Autenticación Exitosa';
          if (respuesta.message === 'Autenticado') {
            this.mensaje = 'Autenticación Exitosa';
            alert(this.mensaje);
            //Agregar redireccionamiento a página principal
          } else if (respuesta.message === 'Contraseña incorrecta') {
            this.mensaje = 'Contraseña incorrecta';
            alert(this.mensaje);
          } else if (respuesta.message === 'Usuario no encontrado') {
            this.mensaje = 'Usuario no encontrado';
            alert(this.mensaje);
          } else {
            this.mensaje = 'Error interno del servidor';
            alert(this.mensaje);
          }
        },
        (error) => {
          console.error('Datos Incorrectos', error);
          this.mensaje = 'Datos Incorrectos';
          alert(this.mensaje);
        }
      );
  }
}
