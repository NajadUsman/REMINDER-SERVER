// import express
const express = require("express");

const dataService = require("./services/data.service");

// import jsonwebtoken

const jwt = require("jsonwebtoken");

// import cors
const cors=require("cors")

// craete an app using express

const app = express();

// use cors to specify origin

app.use(cors({
  origin:'http://localhost:4200'
}))

// to parse json

app.use(express.json());

app.listen(3000, () => {
    console.log("server started at port no:3000");
  });

  // bank app-API

// register-API

app.post(`/register`, (req, res) => {
    dataService
      .register(req.body.uid, req.body.password, req.body.uname)
      .then((result) => {
        res.status(result.statusCode).json(result);
      });
  });

  //login API
  app.post('/login',(req,res)=>{
      dataService.login(req.body.uid,req.body.password)
      .then((result)=>{
          res.status(result.statusCode).json(result)
      })
  })


  // add event API
  app.post('/dashboard',(req,res)=>{
    dataService.addEvent(req.body.uid,req.body.date,req.body.desc)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

  // add event API
  app.post('/history',(req,res)=>{
    dataService.history(req.body.uid)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

