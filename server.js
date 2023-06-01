const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer"); 
const pool = require("./db");
const path = require("path");

//middleWare
    app.post(cors());
    app.post(express.json())// this is the json parse
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
      });
    app.set("view engine","ejs")

   
    const storage = multer.diskStorage(
        {
            destination:(req,file,cb)=>{
                cb(null,"images/")
            },
            filename:(req,file,cb)=>{
                cb(null,Date.now() + path.extname(file.originalname) )
            }
        }
    );

    const upload = multer({storage:storage});

    //app post 
        app.post("/main",upload.single("image"), async(req,res)=>{
         try {
                 const {image} = req.file // this is the file name part of the req.file object
                 const {name} = req.body

            const nuke = await pool.query(
                "INSERT INTO main(name,photo) VALUES ($1,$2) RETURNING *",
                [name,image]
            );

            res.json(nuke.rows[0])

            console.log("wing")

         } catch (error) {
                console.log(error)
            }
        });

    app.listen(5000,()=>{
        console.log("work")
    })


