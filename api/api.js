// Variáveis
// var config = require('./config.json');
// $json = json_decode($str, true);
var mongodb_conn = "mongodb://admin:admin@qualeaboa-shard-00-00-bkuzc.mongodb.net:27017,qualeaboa-shard-00-01-bkuzc.mongodb.net:27017,qualeaboa-shard-00-02-bkuzc.mongodb.net:27017/todos?ssl=true&replicaSet=qualeaboa-shard-0&authSource=admin";
// var mongodb_conn= '0.0.0.0:27017';
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
var request = require('request');
var infoCEP;

var cep = '17502270';

var configsCEP = {
    url: 'http://www.cepaberto.com/api/v2/ceps.json?cep='+cep,
    headers: {
        'Authorization': 'Token token=809c1c14363dc97da5d0b2ba8bbb4156'
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        infoCEP = JSON.parse(body);
        console.log(infoCEP);
    }
}



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// console.log(req['headers']);

  next();
});
// var schedule = require('node-schedule');

var port = process.env.PORT || 8080;

MongoClient.connect(mongodb_conn, function(err, database) {
  if(err) throw err;
  dbqual = database;
  app.listen(port);
  request(configsCEP, callback);

  console.log('Database connected');
});


app.get("/inserirteste", function(req, res) {
  console.log('Bateu dolar');
  dbqual.collection("teste").insert({'nome': 'teste', 'idade': 11}, function(err, insert) {
      if(err) throw err;
      // res.status(200).send(docs);
      res.json({bateu: 1});
  });
});

app.get("/estabelecimentos", function(req, res) {
  console.log('estabelecimentos');
  dbqual.collection("estabelecimento").find({'completo': 1}).toArray(function(err, docs){
    res.json({docs});
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
      if (docs.length > 0){
        res.status(409).send({message: "E-mail já cadastrado!"});
        console.log("Email ja existente =====> Pessoa")
      }else {
        dbqual.collection('pessoa').insertOne(pessoa, function(err, insert) {
            if(err) throw err;
            console.log("inserido com sucess =====> Pessoa");
            res.status(200).send({message: "Pessoa inserido com sucesso!"});
        });
      }
    });
    // dbqual.collection('pessoa').insertOne(pessoa, function(err, insert) {
    //     if(err) throw err;
    //     console.log("inserido com sucess =====> Estabelecimento");
    //     res.status(200).send({message: "Estabelecimento inserido com sucesso!"});
    // });
});
app.post("/validateuser",function(req, res, next){
    console.log(req.body.docs);
    console.log('Chegou Login ==> PESSOA');
    dbqual.collection(req.body.docs['type']).find({'email': req.body.docs['email']}).toArray(function(err, docs){
      if (docs.length > 0){
        console.log(docs[0]);
        if (docs[0]['password'] == req.body.docs['password']){
          console.log("E-mail e senha correta");
          res.status(200).send({message: "Senha correta!", info: docs[0]});
        } else{
          res.status(200).send({message: "Senha incorreta!"});
          console.log("Senha incorreta");
        }

      }else {
        res.status(200).send({message: "Conta inexistente!"});
        console.log('Conta inexistente!');
      }
    });
});

app.post("/updateuser",function(req, res, next){
    console.log(req.body.docs);
    let conteudo = req.body.docs;
    console.log('Chegou Atualização');
    if(conteudo['tipo'] == 'estabelecimento'){
      cep = conteudo['cep'];
      request(configsCEP, callback);
      console.log(infoCEP);
        setTimeout(function(){
          dbqual.collection(conteudo['tipo']).updateOne({
                  "_id": ObjectID(conteudo['_id'])
              }, {
                  $set:{
                    'name': conteudo['name'],
                    'nameresp': conteudo['nameresp'],
                    'phone': conteudo['phone'],
                    'address': conteudo['address'],
                    'descricao': conteudo['descricao'],
                    'open': conteudo['open'],
                    'close': conteudo['close'],
                    'completo': 1,
                    'cep': conteudo['cep'],
                    'latitude' : infoCEP['latitude'],
                    'longitude': infoCEP['longitude']
                    }

              }, function(err, results) {
                  console.log(results.result);
              });
        }, 4000);
      }else{
        dbqual.collection(conteudo['tipo']).updateOne({
                "_id": ObjectID(conteudo['_id'])
            }, {
                $set:{
                  'name': conteudo['nome'],
                  'nickname': conteudo['nickname'],
                  'birth': conteudo['birth'],
                  'completo': 1
                  }

            }, function(err, results) {
                console.log(results.result);
            });
      }
    // dbqual.collection(conteudo['tipo']).updateOne({_id:ObjectID(conteudo['_id'])}, conteudo)
    res.status(200).send({message: "Atualizado corretamente!"});

});

app.post('/getusercardapio',function(req, res, next){
    console.log(req.body);
    dbqual.collection('cardapio').find({'idEstabelecimento': req.body.idEstabelecimento}).toArray(function(err, docs){
          res.status(200).send({message: "Retornado!", docs: docs});
          console.log(docs);
    });

app.post('/additem', function(req, res, next){
  console.log(req.body.item);
  dbqual.collection('cardapio').insertOne(req.body.item, function(err, insert) {
      if(err) throw err;
      console.log("inserido com sucess =====> CARDAPIO");
      res.status(200).send({message: "Item cardapio inserido com sucesso!"});
  });
});


});
