import express from 'express';
import axios from 'axios';
import compression from 'compression';

const userURL = "https://mockend.com/juunegreiros/BE-test-api/users";
const productsURL = "https://mockend.com/juunegreiros/BE-test-api/products";

const app = express();
app.use(express.json());
app.use(compression());

app.get("/users", async (req, res) => {
    try {
        //TODO: Ajustar a forma como os dados sao mostrados.
        const response = await axios.get(userURL);
        const users = response.data;
        res.send(users);
    } catch (e) {
        console.log(e);
        return 0;
    }
});

app.get("/products", async (req, res) => {
    try {
        //TODO: Ajustar como os dados sao mostrados.
        const response = await axios.get(productsURL);
        const products = response.data;
        res.send(products);
    } catch (e) {
        console.log(e);
        return 0;
    }
});

app.post("/calculate", async (req, res) => {
    const { userId, productList } = req.body;

    try {
        const responseUsers = await axios.get(userURL);
        const users = responseUsers.data;
        const userTaxRaw = users[userId]["tax"];
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
    -> O valor a ser pago é: ${total.toFixed(2)}`);
    } catch (e) {
        res.status(500).send("Internal server error.");
    }
});

export default app