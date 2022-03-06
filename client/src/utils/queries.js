import { gql } from '@apollo/client';

// queries logged in user by the user information contained in the token and returns all fields
export const GET_ME = gql`
    {
        me {
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

// basic form of above function for a lighter use query
export const GET_ME_BASIC = gql`
    {
        me{
            _id
            username
            email
            bookCount
        }
    }
`