// Variáveis
// var config = require('./config.json');
// $json = json_decode($str, true);
var mongodb_conn = "mongodb://admin:admin@qualeaboa-shard-00-00-bkuzc.mongodb.net:27017,qualeaboa-shard-00-01-bkuzc.mongodb.net:27017,qualeaboa-shard-00-02-bkuzc.mongodb.net:27017/todos?ssl=true&replicaSet=qualeaboa-shard-0&authSource=admin";
var express = require('express');
var cors = require('cors')
var app = express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// console.log(req['headers']);

  next();
});

// var schedule = require('node-schedule');


MongoClient.connect(mongodb_conn, function(err, database) {
  if(err) throw err;
  dbqual = database;
  app.listen(3000);
  console.log(dbqual);
});


app.get("/inserirteste", function(req, res) {
  console.log('Bateu dolar');
  dbqual.collection("teste").insert({'nome': 'teste', 'idade': 11}, function(err, insert) {
      if(err) throw err;
      // res.status(200).send(docs);
      res.json({bateu: 1});
  });
});

app.get("/todos", function(req, res) {
  console.log('teste');
  dbqual.collection("teste").find({}).toArray(function(err, docs){
  // console.log('docs');
    res.json({docs});
  });
});

app.post("/newestabelecimento",function(req, res, next){
  console.log('Chegou cadastro ==> ESTABELECIMENTO');
  console.log(req.body.estabelecimento);
    let estabelecimento = req.body.estabelecimento;
    dbqual.collection("estabelecimento").find({'email': estabelecimento['email']}).toArray(function(err, docs){
    // console.log('docs');
      if (docs.length > 0){
        res.status(409).send({message: "E-mail já cadastrado!"});
        console.log("Email ja existente =====> Estabelecimento")
      }else {
        dbqual.collection('estabelecimento').insertOne(estabelecimento, function(err, insert) {
            if(err) throw err;
            console.log("inserido com sucess =====> Estabelecimento");
            res.status(200).send({message: "Estabelecimento inserido com sucesso!"});
        });
      }
  });
});

app.post("/newpessoa",function(req, res, next){
  console.log('Chegou cadastro ==> PESSOA');
  console.log(req.body.pessoa);
    let pessoa = req.body.pessoa;
    dbqual.collection("pessoa").find({'email': pessoa['email']}).toArray(function(err, docs){
    // console.log('docs');
      if (docs.length > 0){
        res.status(409).send({message: "E-mail já cadastrado!"});
        console.log("Email ja existente =====> Pessoa")
      }else {
        dbqual.collection('pessoa').insertOne(pessoa, function(err, insert) {
            if(err) throw err;
            console.log("inserido com sucess =====> Pessoa");
            res.status(200).send({message: "Estabelecimento inserido com sucesso!"});
        });
      }
    });
    // dbqual.collection('pessoa').insertOne(pessoa, function(err, insert) {
    //     if(err) throw err;
    //     console.log("inserido com sucess =====> Estabelecimento");
    //     res.status(200).send({message: "Estabelecimento inserido com sucesso!"});
    // });
  });
