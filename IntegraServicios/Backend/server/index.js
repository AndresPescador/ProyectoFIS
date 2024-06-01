const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('DB.db',(err) => {
  if (err) {
    return console.error(`Error opening database file: ${err.message}`);
  }else{
    console.log('Connected to the database.');
  }
});


// Pruebas de integración
function pruebaCrearRegistro(id,name, phone, email, password) {
  const sql1 = `INSERT INTO Persona(id,nombre, telefono, correoElectronico, contrasena) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql1, [id,name, phone, email, password], (err) => {
    if (err) {
      console.error(`Error creating test record: ${err.message}`);
    } else {
      console.log(`Test record created successfully!`);
    }
  });
}

//pruebaCrearRegistro(1234,'John Doe', '123-456-7890', 'johndoe@example.com', 'secure_password');

//Endpoints
app.post("/Login", (req, res) => {
  let row = "";
  sql = "SELECT * FROM Persona WHERE id = ?";
  db.get(sql, [req.body.id], (err, row) => {
    if (err) {
      return res.json({ message: "Error interno del servidor" });
    }

    if (!row) {
      return res.json({ message: "Usuario no encontrado" });
    }

    if (row.contrasena === req.body.contrasena) {
      return res.json({ message: "Autenticado" });
    } else {
      return res.json({ message: "Contraseña incorrecta" });
    }
  });
});

app.post("/Registrar", (req,res) =>{
  const sql ='INSERT INTO Persona(id, nombre, telefono, correoElectronico, contrasena) VALUES (?, ?, ?, ?, ?)';
  db.run(sql,[req.body.id, req.body.nombre, req.body.telefono, req.body.correoElectronico, req.body.contrasena], (err) =>{
    if (err){
      return res.json({message: "Ya se encuentra registrado"});
    }
      return res.json({message: "Registrado"});
    ;
    })
})

app.get("/ConsultarUnidadesServicios", (req, res) => {
  const sql = 'SELECT * FROM UnidadServicio';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.json({ message: "Error interno del servidor" });
    }
    const unidades = rows.map(row => ({
      id: row.id,
      horarioDisponible: row.horarioDisponible,
      nombre :row.nombre,
    }));
    res.json(unidades);
  });
});

app.post("/ConsultarUnidadServicio", (req, res) => {
  const sql = 'SELECT * FROM UnidadServicio WHERE id = ?';
  db.get(sql, [req.body.id], (err, row) => {
    if (err) {
      return res.json({ message: "Error interno del servidor" });
    }
    if (!row) {
      return res.json({ message: "No se encontró la unidad" });
    }
    const unidad = {
      id: row.id,
      horarioDisponible: row.horarioDisponible,
      nombre: row.nombre,
    };
    res.json(unidad);
  });
});

app.get("/ConsultarRecursos", (req, res) => {
  const sql = 'SELECT * FROM Recurso';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.json({ message: "Error interno del servidor" });
    }
    const recursos = rows.map(row => ({
      id: row.id,
      disponibilidad: row.disponibilidad,
      nombre :row.nombre,
      descripcion: row.descripcion,
      estado: row.estado,
    }));
    res.json(recursos);
  });
});

app.post("/ConsultarRecursosPorUnidad", (req, res) => {
  const sql = 'SELECT * FROM Recurso WHERE idUnidadServicio = ?';
  db.all(sql, [req.body.idUnidadServicio], (err, rows) => {
    if (err) {
      return res.json({ message: "Error interno del servidor" });
    }
    const recursos = rows.map(row => ({
      id: row.id,
      disponibilidad: row.disponibilidad,
      nombre :row.nombre,
      descripcion: row.descripcion,
      estado: row.estado,
    }));
    res.json(recursos);
  });
});

app.post("/CrearReserva", (req,res) =>{
  const sql ='INSERT INTO Reserva(idRecurso, idUsuario, idUnidadServicio, horarioReservado, estado, detalles) VALUES (?,?,?,?,?,?)';
  db.run(sql,[req.body.idRecurso, req.body.idUsuario, req.body.idUnidadServicio, req.body.horarioReservado, req.body.estado, req.body.detalles], (err) =>{
    if (err){
      return res.json({message: "Error:No se ha creado la reserva"});
    }
      return res.json({message: "Reservación Exitosa"});
    })
})

app.post("/ConsultarReservas", (req, res) => {
  const sql = 'SELECT * FROM Reserva WHERE idUsuario = ?';
  db.all(sql, [req.body.id], (err, rows) => {
    if (err) {
      return res.json({ message: "Error interno del servidor" });
    }
    const sqlRecurso = 'SELECT nombre FROM Recurso WHERE id = ?';
    for (const row of rows) {
      db.get(sqlRecurso, [row.idRecurso], (err, recurso) => {
        if (err) {
          return res.json({ message: "Error interno del servidor" });
        }
        row.nombre = recurso.nombre;
      });
    }
    const reservas = rows.map(row => ({
      id: row.id,
      nombre: row.nombre, 
      horarioReservado: row.horarioReservado,
      estado: row.estado,
    }));
    res.json(reservas);
  });
});

app.post("/ActualizarReserva", (req, res) => {
    const sql = 'UPDATE Reserva SET estado = ? WHERE id = ?';
    db.all(sql, [req.body.estado,req.body.id], (err, rows) => {
      if (err) {
        return res.json({message: "Error interno del servidor" });
      }
      else{
        res.json({message: "Reserva Actualizada"})
      }
    });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
