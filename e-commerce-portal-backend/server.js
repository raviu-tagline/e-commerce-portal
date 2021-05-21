const jsonServer = require("json-server");
const server = jsonServer.create();
// const path = require('path')
// const express = require("express");
const bodyParser = require("body-parser");
// const app = express();
const router = jsonServer.router("db.json");
const fs = require("fs");
const cors = require("cors");
const middlewares = jsonServer.defaults();
const port = 3009;
server.use(jsonServer.bodyParser);
// server.use(bodyParser.urlencoded({ extended: false }));
// server.use(bodyParser.json());
// server.use(bodyParser.json({ type: "application/*+json" }));

server.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

server.post("/", (req, res) => {
  console.log("Hello World");
});
server.post("/deleteCart", (req, res) => {
  const cartData = req.body.cartId;
  const cartInfo = fs.readFileSync("db.json", { encoding: "utf8" });
  const cartJson = JSON.parse(cartInfo);
  const cart = cartJson.Cart;
  const cartDataInJson = cartData.filter((val, i) => {
    const data = cart.find(({ id }) => id === parseInt(val));
    // console.log(`data`, data);
    cart.splice(i, 1);

    console.log(`cart`, cart);
    return cart;
  });
  cartJson.Cart = cart;
  fs.writeFileSync("db.json", JSON.stringify(cartJson));

  return res.json({ data: cartJson });
});
server.options("*", cors());

server.use(middlewares);

// server.use(router);
// server.use('', express.static(path.join(__dirname, 'images/')))

// Avoid CORS issue
// server.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
// });

// server.use(jsonServer.rewriter(routes))

server.use(router);

server.listen(port);
