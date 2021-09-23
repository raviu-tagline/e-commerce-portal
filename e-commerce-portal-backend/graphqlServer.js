const express = require("express")
const graphqlHTTP = require("express-graphql").graphqlHTTP
const schema = require("./schema/schema")
const mongoose = require('mongoose')

const app = express()

const port = 4002

mongoose.connect("mongodb+srv://Ravi_Undaviya:Ravi1999@cluster0.92uzh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

mongoose.connection.once('open', () => {
    console.log(`Connected to database`);
})

app.listen(port, () => {
    console.log(`GraphQL server started...`, port);
});

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))