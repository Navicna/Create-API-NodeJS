"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Conecta ao banco
mongoose.connect('mongodb+srv://VictorCorassa:manobrown69@cluster0-jkhxs.mongodb.net/test?retryWrites=true&w=majority');

//Carrega os Models
const Product = require('./models/product');

const app = express();
const router = express.Router();

//Carregar rotas:
const indexRoute = require('./routes/index')
const productRoute = require('./routes/product')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", indexRoute);
app.use("/products", productRoute);

module.exports = app;