import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query me{
        me{
            _id
            username
            email
            bookCount
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`;

export const QUERY_ME_BASIC = gql`
    {
        me{
            _id
            username
            email
            bookCount
        }
    }
`