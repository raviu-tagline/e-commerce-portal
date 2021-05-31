const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL =
  "mongodb+srv://Ravi_Undaviya:sXIzSQndhlDB1ccK@cluster0.92uzh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const DATABASE_NAME = "eCommerceDb";

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

app.listen(5000, () => {
  MongoClient.connect(
    CONNECTION_URL,
    { useNewUrlParser: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      database = client.db(DATABASE_NAME);
      // collection = database.collection("tbl_users");
      console.log("Connected to `" + DATABASE_NAME + "` database!");
    }
  );
});

app.get("/users", (req, res) => {
  database
    .collection("tbl_users")
    .find({})
    .toArray((error, result) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.send(result);
    });
});

app.get("/category", (req, res) => {
  database
    .collection("tbl_categories")
    .find({})
    .toArray((error, result) => {
      if (error) return res.status(500).send(error);
      res.send(result);
    });
});

app.get("/subCategory", (req, res) => {
  database
    .collection("tbl_sub_categories")
    .find({})
    .toArray((error, result) => {
      if (error) return res.status(500).send(error);
      res.send(result);
    });
});

app.get("/products", (req, res) => {
  database
    .collection("tbl_products")
    .find({})
    .toArray((error, result) => {
      if (error) return res.status(500).send(error);
      res.send(result);
    });
});

app.get("/cart", (req, res) => {
  database
    .collection("tbl_cart")
    .find({})
    .toArray((error, result) => {
      if (error) return res.status(500).send(error);
      res.send(result);
    });
});

app.post("/users", (req, res) => {
  const data = req.body;
  database.collection("tbl_users").insertOne(data, function (err, resp) {
    if (err) return res.status(500).send(err);
    res.send(resp.ops);
  });
});

app.post("/cart", (req, res) => {
  const data = req.body;
  database.collection("tbl_cart").insertOne(data, function (err, resp) {
    if (err) return res.status(500).send(err);
    res.send(resp.ops);
  });
});

app.post("/category", (req, res) => {
  const data = req.body;
  database.collection("tbl_categories").insertOne(data, function (err, resp) {
    if (err) return res.status(500).send(err);
    res.send(resp.ops);
  });
});

app.post("/subCategory", (req, res) => {
  const data = req.body;
  database
    .collection("tbl_sub_categories")
    .insertOne(data, function (err, resp) {
      if (err) return res.status(500).send(err);
      res.send(resp.ops);
    });
});

app.delete("/deleteAll/cart", (req, res) => {
  database.collection("tbl_cart").deleteMany({}, function (err, resp) {
    if (err) return res.status(500).send(err);
    res.send(resp.deletedCount + " Records deleted");
  });
});

app.delete("/cart", (req, res) => {
  database.collection("tbl_cart").deleteOne;
});
