import { gql } from '@apollo/client'

// mutation that logs the user in with email and password fields and returns the token and user email and object id.
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user {
                _id
                username     
            }
        }
    }
`;

// mutation that creates a new user with username, email, and password and returns new token and new username and object id.
export const ADD_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!){
        createUser(username: $username, email: $email, password: $password){
            token
            user{
                _id
                username
            }
        }
    }
`;

// mutation that creates a saveBook document, and add it to the logged in users savedBooks array, returns all user document fields.
export const SAVE_BOOK = gql`
    mutation saveBook($books: bookInput!){
        saveBook(books: $books){
            _id
            username
            email
            bookCount
            savedBooks {
                authors
                description
                bookId
                image
                title
            }
        }
    }
`;

// mutation that removes a book from the users saveBook array, and returns all fields except users email.
export const REMOVE_BOOK = gql`
    mutation deleteBook($bookId: String!){
        deleteBook(bookId: $bookId) {
            _id
            username
            bookCount
            savedBooks {
                authors
                description
                bookId
                image
                title
            }
        }
    }
`