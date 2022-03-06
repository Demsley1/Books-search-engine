import { gql } from '@apollo/client';

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