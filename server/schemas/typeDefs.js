// import the graphQL method from apollo server express module
const { gql } = require('apollo-server-express');
const { typeDefs } = require('.');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Books]
    }

    type Book {
        _id: ID
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Query {
        users: [Users]
        user(username: String!): User
        books: [Book]
    }
`

module.exports = typeDefs;