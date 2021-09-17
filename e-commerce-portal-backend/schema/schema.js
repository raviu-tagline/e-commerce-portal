const graphql = require("graphql")
const _ = require("lodash")
const fs = require("fs")

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList
} = graphql

const data = JSON.parse(fs.readFileSync("./db.json", { encoding: "utf8" }))
const register = data.register
const currency = data.currency
const subCategory = data.subCategory
const category = data.category
const product = data.product

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        number: { type: GraphQLInt },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString },
    })
})

const SubCategoryType = new GraphQLObjectType({
    name: 'SubCategory',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        categoryId: { type: GraphQLInt },
        category: {
            type: CategoryType,
            resolve(parent, args) {
                return _.find(category, { id: parent.categoryId })
            }
        }
    })
})

const CategoryType = new GraphQLObjectType({
    name: "Category",
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        productCount: { type: GraphQLInt },
        imageName: { type: GraphQLString },
        subcategory: {
            type: new GraphQLList(SubCategoryType),
            resolve(parent, args) {
                return _.filter(subCategory, { categoryId: parent.id })
            }
        }
    })
})

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        price: { type: GraphQLInt },
        subCategoryId: { type: GraphQLInt },
        categoryId: { type: GraphQLInt },
        rate: { type: GraphQLInt },
        content: { type: GraphQLString },
        review: { type: GraphQLInt },
        typeVariant: { type: GraphQLString },
        colorVariant: { type: GraphQLString },
        imageName: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return _.find(register, { id: args.id })
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return register
            }
        },
        subcategory: {
            type: SubCategoryType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return _.find(subCategory, { id: args.id })
            }
        },
        subcategories: {
            type: new GraphQLList(SubCategoryType),
            resolve(parent, args) {
                return subCategory
            }
        },
        category: {
            type: CategoryType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return _.find(category, { id: args.id })
            }
        },
        categories: {
            type: new GraphQLList(CategoryType),
            resolve(parent, args) {
                return category
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return _.find(product, { id: args.id })
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return product
            }
        },
        /* currency: {
            type: UserType,
            args: { symbol: { type: GraphQLString } },
            resolve(parent, args) {
                Object.keys(currency).find(val => {
                    if (val === args.symbol)
                        return currency[val]
                })
            }
        } */
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});