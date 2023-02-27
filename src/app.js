const express = require("express");
const axios = require("axios");
const compression = require("compression");

const userURL = "https://mockend.com/juunegreiros/BE-test-api/users";
const productsURL = "https://mockend.com/juunegreiros/BE-test-api/products";

const app = express();
app.use(express.json());
app.use(compression());

app.get("/", (req, res) => {
  res.send(`
    <p>/users - para receber a lista de usuários.</p>
    <p>/products - para receber a lista de produtos.</p>
    <p>/calculate - passando o id(number) do usuário e uma lista([n, n, n, ...]) com os id's dos produtos para receber o resultado.</p>
  `);
});

app.get("/users", async (req, res) => {
  try {
    const response = await axios.get(userURL);
    const users = response.data;
    res.send(users);
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }
});

app.get("/products", async (req, res) => {
  try {
    const response = await axios.get(productsURL);
    const products = response.data;
    res.send(products);
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }
});

app.post("/calculate", async (req, res) => {
  const { userId, productList } = req.body;

  if(!userId || !productList) {
    res.status(400).send("userId and productList are required!");
    return;
  }

  try {
    const responseUsers = await axios.get(userURL);
    const users = responseUsers.data;

    if(userId < users.length || userId > users.length) {
      res.status(400).send(`O id de usuário deve estar entre 1 e ${users.length}.`)
      return;
    }

    const userTaxRaw = users[userId - 1]["tax"];
    let tax = (100 - userTaxRaw / 100) / 100;

    const responseProducts = await axios.get(productsURL);
    const products = responseProducts.data;

    let totalPrice = 0;
    for (const idProduct of productList) {
      totalPrice += products[idProduct]["price"];
    }
    let total = tax * totalPrice;

    res.send(`
      -> A taxa de desconto do usuário é de ${userTaxRaw / 100}.
      -> O total do valor dos produtos é: ${totalPrice}.
      -> O valor a ser pago é: ${total.toFixed(2)}
    `);
  } catch (err) {
    res.status(500).send("Internal server error.")
  }
});
      
module.exports = { app };
