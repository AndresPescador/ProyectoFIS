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


app.get("/api", (req, res) => {
    res.json({ message: "Servidor Funcinando!" });
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



app.post("/Registrar", (req,res) =>{

  sql ='INSERT INTO Persona(id, nombre, telefono, correoElectronico, contrasena) VALUES (?, ?, ?, ?, ?)';

  db.run(sql,[req.body.id, req.body.nombre, req.body.telefono, req.body.correoElectronico, req.body.contrasena], (err) =>{
    if (err){
      return res.json({message: "Ya se encuentra registrado"})
    }
      return res.json({message: "Registrado"})
    ;
    })
})

app.post("/CrearReserva", (req,res) =>{

  sql ='INSERT INTO Reserva(idRecurso, idUsuario, idUnidadServicio, horarioReservado, estado, detalles) VALUES (?,?,?,?,?,?)';

  db.run(sql,[req.body.idRecurso, req.body.idUsuario, req.body.idUnidadServicio, req.body.horarioReservado, req.body.estado, req.body.detalles], (err) =>{
    if (err){
      return res.json({message: "No se ha creado la reserva"})
    }
      return res.json({message: "Reservación Exitosa"})
    ;
    })
})



app.post("/Login",(req,res) =>{
  let row = "";
  sql = 'SELECT * FROM Empleado WHERE idPersona = ?'
  db.get(sql, [req.body.ID], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    return row
      ? res.json({message: "Empleado"})
      : comp()})
});

function comp (){
  sql = 'SELECT * FROM Usuario WHERE idPersona = ?';
  db.get(sql, [req.body.ID], (err, row) => {
  if (err) {
    return console.error(err.message);
  }
  return row
    ? res.json({message: "Usuario"})
    : res.json({message : "No está registrado ese documento en el sistema"})
});
}



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});