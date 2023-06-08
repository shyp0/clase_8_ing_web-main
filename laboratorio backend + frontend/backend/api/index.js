const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors")

const app = express();
const PORT = 9000;

app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
    port: 3306
})

app.get('/clientes', (req,res) => {
    pool.query("select * from clientes", (error,results) => {
        if(error){
            console.error(error);
            res.status(500).send("error consultando al server")
        } else{
            const response = {
                status: "success",
                message: "clientes retornados exitosamente",
                data: results
            };
            res.status(200).send(response);
        }
    })
})

app.post('/crear', (req,res) => {
    const saltRounds = 15;
    
    const {nombre,celular,email,password} = req.body;
    bcrypt.hash(password, saltRounds, (error,hash) => {
        if(error) {
            console.error(error);
            hash.status(500).send("error hasheando password")
        } else {
            pool.query(
                "insert into clientes (nombre,celular,email,password) values (?,?,?,?)",
                [nombre, celular, email, hash],
                (error, results) => {
                    if(error){
                        console.error(error);
                        res.status(500).send("error insertando al server")
                    } else{
                        const response = {
                            status: "success",
                            message: "cliente creado exitosamente",
                            data: results
                        };
                        res.status(200).send(response);
                    }
                }
            );
        }
    });
})

app.listen(
    PORT,
    () => console.log(`me conecte al puerto ${PORT}`)
)
