const express = require("express")
const graphqlHTTP = require("express-graphql").graphqlHTTP
const schema = require("./schema/schema")

const app = express()

const port = 4002

app.listen(port, () => {
    console.log(`GraphQL server started...`, port);
});

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))
