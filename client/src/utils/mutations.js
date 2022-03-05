import { gql } from '@apollo/client'

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
                link
                image
                title
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation deleteBook($bookId: String!){
        deleteBook(bookId: $bookId) {
            username
            bookCount
        }
    }
`