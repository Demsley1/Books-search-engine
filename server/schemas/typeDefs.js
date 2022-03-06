// import the graphQL method from apollo server express module
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Query {
        users: [User]
        user(id: ID, username: String): User
        me: User
    }

    type Auth {
        token: ID!
        user: User
    }

    input bookInput {
        authors: [String]
        description: String
        bookId: String
        image: String
        title: String
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(books: bookInput!): User
        deleteBook(bookId: String!): User
    }

`

module.exports = typeDefs;